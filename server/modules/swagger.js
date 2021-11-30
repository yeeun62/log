const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "log API",
			version: "1.0.0",
			description: "로그 시스템 API",
		},
		//host: "https://monitor.service.fail",
		host: "localhost:80",
		basePath: "/",
	},
	apis: ["app.js", "./swagger/*.js"],
};

const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
