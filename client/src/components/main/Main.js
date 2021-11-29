import React, { useState, useRef, useEffect } from "react";
import Data from "../data/Data";
import Nav from "../nav/Nav";
import Header from "../logoHeader/Header";
import "./Main.css";

function Main({
	data,
	originData,
	changeData,
	changeBackground,
	setBackgroundColor,
	backgroudColor,
}) {
	const scroll = useRef(null);

	const scrollDown = () => {
		const { scrollHeight, clientHeight } = scroll.current;
		scroll.current.scrollTop = scrollHeight - clientHeight;
	};

	useEffect(() => {
		if (data) {
			scrollDown();
		}
	}, [data]);

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

export default Main;
