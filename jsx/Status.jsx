import React from "react";

class Status extends React.Component
{
	render()
	{
		return (
			<div id="statusbar" style={ {fontSize: "14px", paddingBottom: "10px", paddingTop: "5px"} }>
				<div id="correct" style={ {display: "inline-block", verticalAlign: "top", width: "115px"} }>
					<span>Correct:</span>
					<b style={ {color: "green"} }>{this.props.correct}</b>
				</div>
				<div id="incorrect" style={ {display: "inline-block", verticalAlign: "top", width: "115px", textAlign: "right"} }>
					<span>Incorrect:</span>
					<b style={ {color: "red"} }>{this.props.incorrect}</b>
				</div>

			</div>
		);
	}
}

export default Status;