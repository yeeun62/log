import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./App.css";
import { getDatabase, ref, onValue } from "firebase/database";
import config from "./config";

function App() {
	const [data, setData] = useState(null);

	const scroll = useRef(null);

	const db = getDatabase();

	useEffect(() => {
		const starCountRef = ref(db, "apiCall");
		onValue(starCountRef, (snapshot) => {
			let logData = snapshot.val();
			let a = [];
			for (let el in logData) {
				a.push(logData[el]);
			}
			setData(a);
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
			<div className="log_box" ref={scroll}>
				{data
					? data.map((data) => {
							return (
								<div className="data_box">
									<p className="bold">
										handleSystemId: <span>{data.handleSystemId}</span>
									</p>
									<p className="bold">
										logContent: <span>{data.logContent}</span>
									</p>
									<p className="bold">
										logRegistTime: <span>{data.logRegistTime}</span>
									</p>
									<p className="bold">
										returnLogID: <span>{data.returnLogID}</span>
									</p>
								</div>
							);
					  })
					: null}
			</div>
		</div>
	);
}

export default App;
