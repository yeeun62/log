import { useState } from "react";
import "../../App.css";

function Serch({ data, filter }) {
	console.log("serch!!!", data, filter);
	const [serch, setSerch] = useState("");

	const onChange = (e) => {
		setSerch(e.target.value);
	};

	return (
		<div>
			<input type="text" onChange={(e) => onChange(e)} />
			<button
				type="button"
				className="handle-button"
				onClick={filter(serch, data)}
			>
				검색
			</button>
		</div>
	);
}
export default Serch;
