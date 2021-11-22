import React from "react";
import "../App.css";

function Data({ data }) {
	return (
		<div className="data_box">
			{Object.keys(data).map((el) => {
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
						<p className="data">{data[el]}</p>
					</>
				);
			})}
		</div>
	);
}

export default Data;
