import { useState } from "react";
import "./Search.css";

function Serch({ changeData, originData }) {
	const [serch, setSerch] = useState("");

	const onChange = (e) => {
		setSerch(e.target.value);
	};

	const filter = (originData) => {
		let result = [];
		if (serch) {
			originData.map((el) => {
				for (let key in el) {
					if (typeof el[key] === "object") {
						let boolean = false;
						Object.keys(el[key]).map((addel) => {
							console.log(addel);
							if (addel.includes(serch) || el[key][addel].includes(serch)) {
								result.push(el);
								boolean = true;
							}
						});
						if (boolean) {
							break;
						}
					}
					if (String(el[key]).includes(serch) && key !== "color") {
						result.push(el);
						break;
					}
				}
			});
			changeData(result);
		}
	};

	const dataReset = () => {
		changeData(originData);
		setSerch("");
	};

	return (
		<div className="serch_wrap">
			<button type="button" onClick={dataReset} className="serch_btn">
				초기화
			</button>
			<button
				type="button"
				onClick={() => filter(originData)}
				className="serch_btn"
			>
				검색
			</button>
			<input type="text" value={serch} onChange={(e) => onChange(e)} />
		</div>
	);
}
export default Serch;
