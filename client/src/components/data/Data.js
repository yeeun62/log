import React, { useState } from "react";
import "./Data.css";

function Data({ data }) {
	const [color, setColor] = useState("");
	const [show, setShow] = useState(false);

	let logDate = () => {
		let date = new Date(data.logRegistTime * 1000);
		let year = date.getFullYear().toString().slice(-4);
		let month = ("0" + (date.getMonth() + 1)).slice(-2);
		let day = ("0" + date.getDate()).slice(-2);
		let hour = ("0" + date.getHours()).slice(-2);
		let minute = ("0" + date.getMinutes()).slice(-2);
		let second = ("0" + date.getSeconds()).slice(-2);
		let returnDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
		return returnDate;
	};

	return (
		<div className="data_box">
			<p className="data one">
				<div
					className="sign_color"
					onClick={() => {
						setColor(data.color);
						setShow(!show);
					}}
					style={{ background: data.color }}
				></div>
				{show ? (
					<div className="sign_hex">
						<p>{color}</p>
					</div>
				) : null}
				{data.handleSystemId}
			</p>
			<p className="data two">{data.logContent}</p>
			<p className="data three">{logDate(data.logRegistTime)}</p>
			<p className="data four">{data.logID}</p>
			<p className="data five">{data.logRequestIp}</p>
			<p className="data six">{data.returnLogID}</p>
			<div className="data seven">
				{typeof data.addon === "object" ? (
					Object.keys(data.addon).map((addel) => {
						return (
							<p>
								{addel}: {data.addon[addel]}
							</p>
						);
					})
				) : (
					<p className="data">{data.addon}</p>
				)}
			</div>
		</div>
	);
}

export default Data;
