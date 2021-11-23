import React from "react";
import "./Data.css";

function Data({ data }) {
	return (
		<div className="data_box">
			<p className="data one">
				<span className="sign" style={{ background: data.color }}></span>
				{data.handleSystemId}
			</p>
			<p className="data two">{data.logContent}</p>
			<p className="data three">{data.logRegistTime}</p>
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
