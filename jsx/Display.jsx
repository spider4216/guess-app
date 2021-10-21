import React from "react";
import {connect} from "react-redux";
import Status from "./Status.jsx";
import Answers from "./Answers.jsx";
import Pic from "./Pic.jsx";

class Display extends React.Component
{
	render()
	{
		return (
			<div style={ {width: "100%", height: "252px", overflow: "hidden", padding: "5px",} }>
				<Status />
				<Pic />
				<Answers />
			</div>
		);
	}
}

export default connect(state => state)(Display);