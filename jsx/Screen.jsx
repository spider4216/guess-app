import React from "react";
import {connect} from "react-redux";
import Header from "./Header.jsx";
import Display from "./Display.jsx";
import SoftwareKey from "./SoftwareKey.jsx";

class Screen extends React.Component
{
	render()
	{
		return (
			<div id="screen" style={ {width: this.props.width, height: this.props.height, overflow: "hidden",} }>
				<Header />
				<Display />
				<SoftwareKey />
			</div>
		);
	}
}

export default connect(state => state)(Screen);