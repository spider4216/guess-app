class Header extends React.Component
{
	render()
	{
		return (
			<div style={ {width: "100%"} }>
				<span>{this.props.title}</span>
			</div>
		);
	}
}

class Screen extends React.Component
{
	render()
	{
		return (
			<div id="screen" style={ {width: this.props.width, height: this.props.height} }>
				<Header title={this.props.header} />
			</div>
		);
	}
}

class App extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			header : "Loading..."
		};
	}

	render()
	{
		return (
			<Screen width="240px" height="320px" header={this.state.header} />
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('content'));
