import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: "https://handle-log.firebaseio.com", // process.env.DATABASE_URL
	projectId: "handle-log", //process.env.PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

const config = initializeApp(firebaseConfig);
const database = getDatabase(config);

export default config;
