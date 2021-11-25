import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./App.css";
import { getDatabase, ref, onValue, set } from "firebase/database";
import config from "./config";
import Data from "./components/data/Data";
import Nav from "./components/nav/Nav";
import Header from "./components/logoHeader/Header";

function App() {
	const [data, setData] = useState(null);
	const [originData, setOriginData] = useState(null);
	const [backgroudColor, setBackgroundColor] = useState("");
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
			let background = logArr.pop();
			setBackgroundColor(background.color);
			// setBackgroundColor(logArr.pop());
			setData(logArr);
			setOriginData(logArr);
		});
	}, []);

	const scrollDown = () => {
		const { scrollHeight, clientHeight } = scroll.current;
		scroll.current.scrollTop = scrollHeight - clientHeight;
	};

	useEffect(() => {
		scrollDown();
	}, [data]);

	const changeData = (data) => {
		setData(data);
	};

	const changeBackground = (color) => {
		set(ref(db, "apiCall/background"), {
			color,
		});
	};

	return (
		<div>
			<h1
				className="logo"
				onClick={() => {
					window.location.replace("/");
				}}
			>
				handle
			</h1>
			<div className="log_wrap">
				<Nav
					originData={originData}
					changeData={changeData}
					changeBackground={changeBackground}
					setBackgroundColor={setBackgroundColor}
					backgroudColor={backgroudColor}
				/>
				<Header backgroudColor={backgroudColor} />
				<div className="log_box" ref={scroll}>
					{data ? (
						data.length ? (
							data.map((data) => {
								return <Data key={data.logID} data={data} />;
							})
						) : (
							<p>검색 결과가 없습니다.</p>
						)
					) : (
						<p>로딩중...</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
