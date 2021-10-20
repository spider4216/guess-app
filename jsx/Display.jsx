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
				<Status correct={this.props.correct} incorrect={this.props.incorrect} />
				<Pic img={this.props.answersReducer.one.img} />
				<Answers data={this.props.answers} />
			</div>
		);
	}
}

export default connect(state => state)(Display);