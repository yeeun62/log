import { useEffect } from "react";
import parse from "html-react-parser";
import axios from "axios";

function Doc() {
	useEffect(() => {
		window.location.href =
			//"https://app.swaggerhub.com/apis-docs/yeeun62/Handle_Log_API/1.0.0#/";
			"https://souljam.postman.co/workspace/Team-Workspace~89b398b6-0e3b-4e6f-858a-e5c9cfe424c6/documentation/16380618-c93350dc-5a9b-479a-a9dd-4e86b3b059c4";
	}, []);

	return <div>api 문서</div>;
}
export default Doc;
