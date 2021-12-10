const express = require("express");
const app = express();
const cors = require("cors");
const { getDatabase, set, ref, onValue, push } = require("firebase/database");
const { swaggerUi, specs } = require("./modules/swagger");
const admin = require("firebase-admin");
// const serviceAccount = require("/home/ubuntu/handle-id-firebase-adminsdk-4o2u4-25c9c98276.json");
const serviceAccount = require("/Users/bang-yeeun/Downloads/handleLogKey/handle-id-firebase-adminsdk-4o2u4-25c9c98276.json");
const requestIp = require("request-ip");

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs));

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://handle-log.firebaseio.com",
});

const config = require("./config");
const db = getDatabase();
app.use(express.json());
app.use(
	cors({
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
	})
);

app.get("/", (req, res) => {
	res.send("로그서버");
});

app.get("/doc", (req, res) => {
	res.redirect("https://documenter.getpostman.com/view/16380618/UVJbJyBj");
});

app.post("/id", async (req, res) => {
	let logId = req.body.id;
	const starCountRef = ref(db, "apiCall/" + logId);
	onValue(starCountRef, (snapshot) => {
		const logData = snapshot.val();
		if (logData) {
			// body로 받은 Id 값이 존재할 경우
			res.status(200).json({
				statusCode: 200,
				message: `짝짝짝 성공입니다! 요청하신 아이디(${req.body.id})에 대한 데이터 정보가 도착했습니다🥳`,
				data: logData,
			});
		} else if (!logData) {
			// body로 받은 Id 값이 존재하지 않을 경우
			res.status(200).json({
				statusCode: 404,
				message: `삐빅 요청하신 아이디(${req.body.id})에 대한 데이터가 없습니다😅 handleTip을 확인해주세요`,
				handleTip: "아이디를 잘 입력하셨는지 확인 부탁드립니다👍",
			});
		}
	});
});

/**
 * @swagger
 *  paths:
 *    /add:
 *      post:
 *        tags:
 *        - "log"
 *        summary: "로그생성 API입니다."
 *        description: ""
 *        consumes:
 *        - "application/json"
 *        produces:
 *        - "application/json"
 *        parameters:
 *        - in: "body"
 *          name: "handleSystemId"
 *          description: "시스템 고유 아이디"
 *          required: true
 *          schema:
 *            $ref: "#/swagger/log"
 *        - in: "body"
 *          name: "logContent"
 *          description: "로그 내용"
 *          required: true
 *          schema:
 *            $ref: "#/swagger/log"
 */

function getRandomColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

app.post("/err", async (req, res) => {
	const {
		handleSystemId,
		logID,
		logContent,
		returnLogID,
		logRequestIp,
		logRegistTime,
	} = req.body;

	console.log(req.body);

	const db = getDatabase();
	const dbRef = ref(db, "apiCall");
	const newdbRef = push(dbRef);

	let color;
	const starCountRef = ref(db, "apiCall");
	onValue(
		starCountRef,
		async (snapshot) => {
			let logData = snapshot.val();

			if (returnLogID === "-") {
				color = getRandomColor();
				console.log("!?", color);
			} else if (returnLogID.length > 2) {
				for (let el in logData) {
					if (logData[el].color === "#006495") {
						continue;
					}
					if (logData[el].logID === returnLogID) {
						console.log("ddddddd", logData[el]);
						console.log("color", logData[el].color);
						//color = logData[el].color;
						break;
					}
				}
			}
			let data = {
				color: color,
				handleSystemId,
				logID,
				logContent,
				addon: "-",
				logRegistTime,
				logRequestIp,
				returnLogID,
			};
			console.log("색상", color);
			set(newdbRef, data);
		},
		{
			onlyOnce: true,
		}
	);
});

app.post("/add", async (req, res) => {
	let { handleSystemId, logContent, returnLogID, addon } = req.body;

	const db = getDatabase();
	const dbRef = ref(db, "apiCall");
	const newdbRef = push(dbRef);
	const handleId = newdbRef._path;

	let color;
	const starCountRef = ref(db, "apiCall");
	onValue(
		starCountRef,
		async (snapshot) => {
			let logData = snapshot.val();
			for (let el in logData) {
				if (logData[el].logID === returnLogID) {
					color = logData[el].color;
					break;
				}
			}
			if (!color) {
				color = getRandomColor();
			}

			let nullValue = [];
			let date = new Date().toLocaleString();
			let time = Date.parse(date) / 1000;
			if (!handleSystemId) {
				nullValue.push("handleSystemId");
			} else if (!logContent) {
				nullValue.push("logContent");
			} else if (!returnLogID) {
				nullValue.push("returnLogID");
			}
			// body로 필수 키와 값을 전달받지 못한 경우
			if (nullValue.length) {
				if (nullValue[0] === "returnLogID") {
					// returnLogID가 없을 경우 ""로 대체했을시 returnLogID 철자가 틀렸다면 값을 입력했더라고 ""로 대체되어 returnLogID 키값이 없다면 '-'를 값으로 받기
					res.status(200).json({
						statusCode: 400,
						message: `삐빅 ${nullValue}의 값을 받지 못하였습니다😅 handleTip을 확인해주세요`,
						handleTip: `키가 ${nullValue}이고, ${nullValue}의 값이 입력되어 있는지 확인후 다시 요청부탁드립니다. 아직 returnLogID가 존재하지 않는다면 값으로 '-'를 넣어주세요👍`,
					});
				} else {
					res.status(200).json({
						statusCode: 400,
						message: `삐빅 ${nullValue}의 값을 받지 못하였습니다😅 handleTip을 확인해주세요`,
						handleTip: `키가 ${nullValue}이고, ${nullValue}의 값이 입력되어 있는지 확인후 다시 요청부탁드립니다👍`,
					});
				}
			} else {
				let addObj = {};
				let data;
				if (addon && Object.keys(addon).length) {
					for (let add in addon) {
						addObj[add] = addon[add];
					}
				} else {
					data = {
						color: color,
						addon: "-",
						logID: handleId.pieces_[1],
						logRegistTime: time,
						logRequestIp: requestIp.getClientIp(req),
					};
				}
				for (let key in req.body) {
					data[key] = req.body[key];
				}
				set(newdbRef, data);
				res.status(200).json({
					statusCode: 200,
					message:
						"짝짝짝 성공입니다! 요청하신 정보를 apiCall 데이터베이스 저장에 성공하였습니다🥳",
					data: `요청하신 정보로 생성된 데이터베이스 id는 '${String(
						handleId
					).slice(9)}'입니다.`,
					id: String(handleId).slice(9),
				});
			}
		},
		{
			onlyOnce: true,
		}
	);
});

app.listen(80, "0.0.0.0");
