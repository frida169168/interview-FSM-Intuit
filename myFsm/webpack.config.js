const path = require("path");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	output: {
		path: path.resolve(__dirname, "public/static/js"),
		filename: "webpack-fms.js",
		library: "fms",
		umdNamedDefine: true,
	},
};
