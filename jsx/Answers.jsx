import React from "react";
import {connect} from "react-redux";

import Answer from "./Answer.jsx";

class Answers extends React.Component
{
	render()
	{
		return (
			<div style={ {fontSize: "11px"} }>
				<Answer number="1" value={this.props.answersReducer.all[0].value} answerSelected={this.props.answerSelected == 1 ? "true" : "false"}/>
				<Answer number="2" value={this.props.answersReducer.all[1].value} answerSelected={this.props.answerSelected == 2 ? "true" : "false"}/>
				<Answer number="3" value={this.props.answersReducer.all[2].value} answerSelected={this.props.answerSelected == 3 ? "true" : "false"}/>
				<Answer number="4" value={this.props.answersReducer.all[3].value} answerSelected={this.props.answerSelected == 4 ? "true" : "false"}/>
			</div>
		);
	}
}

export default connect(state => state)(Answers);