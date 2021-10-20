import React from "react";
import {connect} from "react-redux";
import Screen from "./Screen.jsx";

class App extends React.Component
{
	constructor(props)
	{
		super(props);
		
		this.props.dispatch({ type: 'answer/all' })

		this.soundLoose = new Audio('sounds/loose.wav');
		this.soundWin = new Audio('sounds/win.wav');
		this.soundClock = new Audio('sounds/tick.wav');

		// get initial state for img and answers
		this.state = {
			correct: 0,
			incorrect: 3,
			timer: null,
		};
	}



	render()
	{
		return (
			<Screen width="240px" height="320px" correct={this.state.correct} incorrect={this.state.incorrect} />
		);
	}

	componentDidMount()
	{
		let timer = setInterval(() => {
			if (document.visibilityState !== 'visible') return

			this.props.dispatch({ type: 'time/decrement' })

			if (this.props.timeReducer.time <= 5 && this.props.timeReducer.time  > 0) {
				this.soundClock.play();
			}

			if (this.props.timeReducer.time <= 0 && this.state.incorrect > 0) {
				this.soundLoose.play();
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
				this.props.dispatch({ type: 'control/select', selected: {value: 1} })
				break;
			case '2':
				this.props.dispatch({ type: 'control/select', selected: {value: 2} })
				break;
			case '3':
				this.props.dispatch({ type: 'control/select', selected: {value: 3} })
				break;
			case '4':
				this.props.dispatch({ type: 'control/select', selected: {value: 4} })
				break;
		}
	}

	enter()
	{
		if (this.props.controlReducer.selected == 0) {
			return;
		}

		if (this.props.answersReducer.all[this.props.controlReducer.selected - 1].state == 'correct') {
			this.soundWin.play();
			this.setState({correct: this.state.correct + 1});	

		} else {
			this.soundLoose.play();
			this.setState({incorrect: this.state.incorrect - 1});

			if (this.state.incorrect <= 0) {
				alert('Your correct answers: ' + this.state.correct + '. Try again');
				this.restart();
			}
		}
		
		this.props.dispatch({ type: 'answer/all' })
		this.props.dispatch({ type: 'time/reset' });

		this.props.dispatch({ type: 'control/select', selected: {value: 0} })
	}

	restart(incorrect = 3, correct = 0)
	{
		this.props.dispatch({ type: 'answer/all' })
		this.props.dispatch({ type: 'time/reset' });
		this.props.dispatch({ type: 'control/select', selected: {value: 0} })
	
		this.setState({
			incorrect: incorrect,
			correct: correct,
		});
	}
}

export default connect(state => state)(App);