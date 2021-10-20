import React from "react";
import {connect} from "react-redux";


class Header extends React.Component
{
	render()
	{
		return (
			<div style={ {width: "100%", height: "28px", backgroundColor: "#320374", color: "white", textAlign: "center", padding: "5px 10px", boxSizing: "border-box", fontSize: "12px"} }>
				<span>{this.props.timeReducer.time} sec</span>
			</div>
		);
	}
}

export default connect(state => state)(Header);