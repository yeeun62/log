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
	apis: ["../*.js", "../swagger/*"],
};

const specs = swaggereJsdoc(options);

/**
 * @swagger
 *  /add:
 *    post:
 *      tags:
 *      - product
 *      description: 모든 제품 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: body
 *          name: category
 *          required: false
 *          schema:
 *            type: integer
 *            description: 카테고리
 *      responses:
 *       200:
 *        description: 제품 조회 성공
 */

module.exports = { swaggerUi, specs };
