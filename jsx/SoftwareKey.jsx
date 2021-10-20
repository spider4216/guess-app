import React from "react";

class SoftwareKey extends React.Component
{
	render()
	{
		return (
			<div id="software-key" style={ {width: "100%", height: "30px", padding: "5px", backgroundColor: "#cccccc", fontSize: "12px", boxSizing: "border-box"} }>
				<div className="left-key" style={ {display: "inline-block", verticalAlign: "top", width: "89px"} }>
					<span>Restart</span>
				</div>

				<div className="enter-key" style={ {display: "inline-block", verticalAlign: "top", textAlign: "center"} }>
					<span><b>ENTER</b></span>
				</div>

				<div className="right-key" style={ {display: "inline-block", verticalAlign: "top", width: "89px", textAlign: "right"} }>
					<span></span>
				</div>
			</div>
		);
	}
}

export default SoftwareKey;