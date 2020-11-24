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

class Answer extends React.Component
{
	render()
	{
		let style = this.props.answerSelected == "true" ? {
			color: "green", paddingBottom: "5px"
		} : {paddingBottom: "5px"};

		return (
			<div style={style}>
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
			<div style={ {fontSize: "11px"} }>
				<Answer number="1" value={this.props.data[0].value} answerSelected={this.props.answerSelected == 1 ? "true" : "false"}/>
				<Answer number="2" value={this.props.data[1].value} answerSelected={this.props.answerSelected == 2 ? "true" : "false"}/>
				<Answer number="3" value={this.props.data[2].value} answerSelected={this.props.answerSelected == 3 ? "true" : "false"}/>
				<Answer number="4" value={this.props.data[3].value} answerSelected={this.props.answerSelected == 4 ? "true" : "false"}/>
			</div>
		);
	}
}

class Pic extends React.Component
{
	render()
	{
		return (
			<div id="pic" style={ {height: "115px"} }>
				<img src={this.props.img} />
			</div>
		);
	}
}

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

class Display extends React.Component
{
	render()
	{
		return (
			<div style={ {width: "100%", height: "261px"} }>
				<Status correct={this.props.correct} incorrect={this.props.incorrect} />
				<Pic img={this.props.img} />
				<Answers data={this.props.answers} answerSelected={this.props.answerSelected} />
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
				<span>{this.props.title} sec</span>
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
				<Header title={this.props.time} />
				<Display correct={this.props.correct} incorrect={this.props.incorrect} data={this.props.data} img={this.props.img} answers={this.props.answers} answerSelected={this.props.answerSelected} />
				<SoftwareKey />
			</div>
		);
	}
}

class App extends React.Component
{
	constructor(props)
	{
		super(props);

		let json = '[{"img":"/images/1/img.png", "title": "Russia"}, {"img":"/images/2/img.png", "title": "Kazakhstan"},{"img":"/images/3/img.png", "title": "Belarus"},{"img":"/images/4/img.png", "title": "China"},{"img":"/images/5/img.png", "title": "India"}]';

		this.data = JSON.parse(json);
		let initialGuessData = this.data[this.random(this.data.length)];
		// get initial state for img and answers
		this.state = {
			header : "Loading...",
			img: initialGuessData.img,
			answers: this.getAnswers(initialGuessData.title),
			selected: 0,
			correct: 0,
			incorrect: 3,
			time: 15,
			timer: null,
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
			<Screen width="240px" height="320px" header={this.state.header} img={this.state.img} answers={this.state.answers} answerSelected={this.state.selected} correct={this.state.correct} incorrect={this.state.incorrect} time={this.state.time} />
		);
	}

	componentDidMount()
	{
		let timer = setInterval(() => {
			this.setState({time: this.state.time - 1});

			if (this.state.time <= 0 && this.state.incorrect > 0) {
				this.restart(this.state.incorrect - 1, this.state.correct);
			}

			if (this.state.incorrect <= 0) {
				alert('Your correct answers: ' + this.state.correct + '. Try again');
				this.restart();
				return;
			}

		}, 1000);
		this.setState({timer: timer});
		window.addEventListener('keydown', (e) => {this.keyPress(e)})
	}

	keyPress(e)
	{
		switch(e.key) {
			case 'SoftLeft':
				this.restart();
				break;
			case 'Enter':
				this.enter();
				break;
			case '1':
				this.setState({selected: 1});
				break;
			case '2':
				this.setState({selected: 2});
				break;
			case '3':
				this.setState({selected: 3});
				break;
			case '4':
				this.setState({selected: 4});
				break;
		}
	}

	enter()
	{
		if (this.state.answers[this.state.selected - 1].state == 'correct') {
			this.setState({correct: this.state.correct + 1});	

		} else {
			this.setState({incorrect: this.state.incorrect - 1});

			if (this.state.incorrect <= 0) {
				alert('Your correct answers: ' + this.state.correct + '. Try again');
				this.restart();
			}
		}
		
		let guessData = this.data[this.random(this.data.length)];

		this.setState({
			img: guessData.img,
			answers: this.getAnswers(guessData.title),
			selected: 0,
			time: 15,
		});
	}

	restart(incorrect = 3, correct = 0)
	{
		let guessData = this.data[this.random(this.data.length)];

		this.setState({
			incorrect: incorrect,
			correct: correct,
			img: guessData.img,
			answers: this.getAnswers(guessData.title),
			selected: 0,
			time: 15,
		});
	}
}

ReactDOM.render(<App/>, document.getElementById('content'));
