import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./App.css";
import { getDatabase, ref, onValue } from "firebase/database";
import config from "./config";
import Data from "./components/Data";
import Serch from "./components/serch/Serch";

function App() {
	const [data, setData] = useState(null);

	const scroll = useRef(null);

	const db = getDatabase();

	useEffect(() => {
		const starCountRef = ref(db, "apiCall");
		onValue(starCountRef, (snapshot) => {
			let logData = snapshot.val();
			let logArr = [];
			for (let el in logData) {
				logArr.push(logData[el]);
			}
			setData(logArr);
		});
	}, []);

	const scrollDown = () => {
		const { scrollHeight, clientHeight } = scroll.current;
		scroll.current.scrollTop = scrollHeight - clientHeight;
	};

	useEffect(() => {
		scrollDown();
	}, [data]);

	const [serch, setSerch] = useState("");
	const [serchData, setSerchData] = useState(null);

	const filter = () => {
		let result = [];
		data.map((el) => {
			for (let key in el) {
				console.log(String(el[key]).includes("나비"));
				if (String(el[key]).includes(serch)) {
					result.push(el);
				}
			}
		});
		setSerchData(result);
	};

	const onChange = (e) => {
		setSerch(e.target.value);
	};

	return (
		<div>
			<h1 className="logo">handle</h1>
			<div className="log_wrap">
				<input type="text" onChange={(e) => onChange(e)} />
				<button type="button" className="handle-button" onClick={filter}>
					검색
				</button>
				{/* <Serch data={data} filter={() => filter} /> */}
				<div className="log_box_header bold">
					<p>handleSystemId</p>
					<p>logContent</p>
					<p>logRegistTime</p>
					<p>logID</p>
					<p>logRequestIp</p>
					<p>returnLogID</p>
					<p>addon</p>
				</div>
				<div className="log_box" ref={scroll}>
					{data
						? serchData
							? serchData.map((serchData) => {
									//console.log("~~", serchData);
									return <Data serchData={serchData} />;
							  })
							: data.map((data) => {
									return <Data data={data} />;
							  })
						: null}
				</div>
			</div>
		</div>
	);
}

export default App;
