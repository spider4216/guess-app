import React from "react";
import {connect} from "react-redux";

class Pic extends React.Component
{
	render()
	{
		return (
			<div id="pic" style={ {height: "115px", textAlign: "center"} }>
				<img src={this.props.answersReducer.one.img} />
			</div>
		);
	}
}

export default connect(state => state)(Pic);