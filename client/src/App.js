import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./App.css";
import {
	getDatabase,
	ref,
	onValue,
	query,
	limitToLast,
} from "firebase/database";
import config from "./config";
import Data from "./components/data/Data";
import Search from "./components/search/Search";
import Header from "./components/logoHeader/Header";

function App() {
	const [data, setData] = useState(null);
	const [originData, setOriginData] = useState(null);

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

	return (
		<div>
			<h1 className="logo">handle</h1>
			<div className="log_wrap">
				<Search originData={originData} changeData={changeData} />
				<Header />
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
