import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./App.css";
import { getDatabase, ref, onValue } from "firebase/database";
import config from "./config";
import Data from "./components/Data";

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

	return (
		<div>
			<h1 className="logo">handle</h1>
			<div className="log_wrap">
				<div className="log_box_header bold">
					<p>addon</p>
					<p>handleSystemId</p>
					<p>logContent</p>
					<p>logID</p>
					<p>logRegistTime</p>
					<p>logRequestIp</p>
					<p>returnLogID</p>
				</div>
				<div className="log_box" ref={scroll}>
					{data
						? data.map((data) => {
								return <Data data={data} />;
						  })
						: null}
				</div>
			</div>
		</div>
	);
}

export default App;
