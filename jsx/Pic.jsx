import React from "react";

class Pic extends React.Component
{
	render()
	{
		return (
			<div id="pic" style={ {height: "115px", textAlign: "center"} }>
				<img src={this.props.img} />
			</div>
		);
	}
}

export default Pic;