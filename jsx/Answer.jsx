import React from "react";

class Answer extends React.Component
{
	render()
	{
		let style = this.props.answerSelected == "true" ? {
			color: "green", paddingBottom: "5px"
		} : {paddingBottom: "5px"};

		let color = "#b9b9b9";
		if (this.props.answerSelected == "true") {
			color = "green";
		}

		style = Object.assign(style, {display: "inline-block", verticalAlign: "top", width: "100px", overflow: "hidden", border: "1px solid " + color, borderRadius: "3px", marginRight: "3px", marginBottom: "3px", padding: "5px", height: "30px"});

		return (
			<div style={style}>
				<span>{this.props.number}. </span>
				<span>{this.props.value}</span>
			</div>
		);
	}
}

export default Answer;