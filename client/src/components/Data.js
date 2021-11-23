import React from "react";
import "../App.css";

function Data({ data, serchData }) {
	console.log("!!", [serchData]);
	return (
		<div className="data_box">
			{serchData
				? [serchData].map((el) => {
						console.log("el", el.handleSystemId);
						return el === "addon" && typeof serchData[el] === "object" ? (
							Object.keys(serchData[el]).map((addel) => {
								return (
									<>
										<span>
											{addel}: {serchData[el][addel]}
										</span>
									</>
								);
							})
						) : (
							<>
								<p className="data">{el.handleSystemId}</p>
								<p className="data">{el.logContent}</p>
								<p className="data">{el.logRegistTime}</p>
								<p className="data">{el.logID}</p>
								<p className="data">{el.logRequestIp}</p>
								<p className="data">{el.returnLogID}</p>
								<p className="data">{el.addon}</p>
							</>
						);
				  })
				: [data].map((el) => {
						return el === "addon" && typeof data[el] === "object" ? (
							Object.keys(data[el]).map((addel) => {
								return (
									<>
										<span>
											{addel}: {data[el][addel]}
										</span>
									</>
								);
							})
						) : (
							<>
								<p className="data">{el.handleSystemId}</p>
								<p className="data">{el.logContent}</p>
								<p className="data">{el.logRegistTime}</p>
								<p className="data">{el.logID}</p>
								<p className="data">{el.logRequestIp}</p>
								<p className="data">{el.returnLogID}</p>
								<p className="data">{el.addon}</p>
							</>
						);
				  })}
		</div>
	);
}

export default Data;
