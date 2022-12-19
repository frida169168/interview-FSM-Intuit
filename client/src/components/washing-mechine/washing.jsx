import React, { useState, useEffect } from "react";
import Fsm from "../myFsm";
import "./washing.scss";
import { getOptions } from "../../api/Api.js";

const Washing = () => {
	const [screen, setScreen] = useState("Ready");
	const [isOpen, setIsOpen] = useState(true);
	const [isFill, setIsFil] = useState(true);
	const [options, setOptions] = useState(null);

	useEffect(() => {
		console.log(getOptions());
		getOptions().then((data) => {
			setOptions(data);
		});
	}, []);

	useEffect(() => {
		if (options?.states) {
			Object.keys(options.states).forEach((key) => {
				options.states[key]["callback"] = () => {
					setScreen(key);
				};
			});

			setOptions(options);
		}
	}, [options]);

	const run = (options) => {
		const myFsm = new Fsm(options);
		myFsm.start(options);
	};

	return (
		<div className="wrapper">
			<div
				className={`washingMachine ${isOpen ? "isOpen" : ""} ${
					isFill ? "isFilled" : ""
				} ${screen === "Washing" ? "isStarting isWashing" : ""} ${
					screen === "Wringing" ? "isWashing" : ""
				}`}
			>
				<div className="controls" id="myScreen">
					{screen}
				</div>
				<div className="door"></div>
				<div className="tub">
					<span className="clothes"></span>
					<span className="clothes"></span>
					<span className="clothes"></span>
				</div>
			</div>

			<div className="playground">
				<button
					className={`content `}
					onClick={() => setIsFil(!isFill)}
					disabled={screen != "Ready" && screen != "End"}
				>
					{isFill ? "EMPTY" : "FILL"}
				</button>
				<button
					className="opening"
					onClick={() => setIsOpen(!isOpen)}
					disabled={screen != "Ready" && screen != "End"}
				>
					{isOpen ? "CLOSE" : "OPEN"}
				</button>
				<button
					className="power"
					disabled={isOpen}
					onClick={() => run(options)}
				>
					START
				</button>
			</div>
		</div>
	);
};
export default Washing;
