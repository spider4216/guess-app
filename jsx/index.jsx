class Answer extends React.Component
{
	render()
	{
		return (
			<div>
				<span>{this.props.number}. </span>
				<span>{this.props.value}</span>
			</div>
		);
	}
}

class Answers extends React.Component
{
	render()
	{
		
		return (
			<div>
				<Answer number="1" value={this.props.data[0].value} />
				<Answer number="2" value={this.props.data[1].value} />
				<Answer number="3" value={this.props.data[2].value} />
				<Answer number="4" value={this.props.data[3].value} />
			</div>
		);
	}
}

class Pic extends React.Component
{
	render()
	{
		return (
			<div id="pic">
				<img src={this.props.img} />
			</div>
		);
	}
}

class Display extends React.Component
{
	render()
	{
		return (
			<div style={ {width: "100%", height: "200px"} }>
				<Pic img={this.props.img} />
				<Answers data={this.props.answers} />
			</div>
		);
	}
}

class Header extends React.Component
{
	render()
	{
		return (
			<div style={ {width: "100%", height: "28px", backgroundColor: "#320374", color: "white", textAlign: "center", padding: "5px 10px", boxSizing: "border-box", fontSize: "12px"} }>
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
				<Display data={this.props.data} img={this.props.img} answers={this.props.answers} />
			</div>
		);
	}
}

class App extends React.Component
{
	constructor(props)
	{
		super(props);

		let json = '[{"img":"/images/1/img.png", "title": "answer a"}, {"img":"/images/2/img.png", "title": "answer b"},{"img":"/images/3/img.png", "title": "answer c"},{"img":"/images/4/img.png", "title": "answer d"},{"img":"/images/5/img.png", "title": "answer e"}]';

		this.data = JSON.parse(json);
		let initialGuessData = this.data[this.random(this.data.length)];
		// get initial state for img and answers
		this.state = {
			header : "Loading...",
			img: initialGuessData.img,
			answers: this.getAnswers(initialGuessData.title)
		};
		
	}

	random(length)
        {
                return Math.floor((Math.random() * length) + 0);
        }

        getAnswers(rightAnswer)
        {
                var arr = [];
                arr.push({
                        'state': 'correct',
                        'value': rightAnswer,
                });
		
                for (var i = 0; i <= 2; i++) {
			var value = this.data[this.random(this.data.length)].title;
			
                        while (arr.some(item => item.value == value)) {
                        	value = this.data[this.random(this.data.length)].title;
			}

                        arr.push({
                                'state': 'incorrect',
                                'value': value,
                        });
                }

                return this.shuffle(arr);
        }

	shuffle(array)
        {
                var currentIndex = array.length, temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
                }

                return array;
        }

	render()
	{
		return (
			<Screen width="240px" height="320px" header={this.state.header} img={this.state.img} answers={this.state.answers} />
		);
	}

	componentDidMount()
	{
		this.setState({header: "Guess App"});
	}
}

ReactDOM.render(<App/>, document.getElementById('content'));
