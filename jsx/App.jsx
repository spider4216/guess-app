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
		this.timer = null;
	}



	render()
	{
		return (
			<Screen width="240px" height="320px" />
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

			if (this.props.timeReducer.time <= 0 && this.props.controlReducer.incorrect > 0) {
				this.props.dispatch({ type: 'control/incorrect_minus' });
				this.props.dispatch({ type: 'answer/all' });
				this.props.dispatch({ type: 'time/reset' });
				this.props.dispatch({ type: 'control/select', selected: {value: 0} });
				this.soundLoose.play();
			}

			if (this.props.controlReducer.incorrect <= 0) {
				alert('Your correct answers: ' + this.props.controlReducer.correct + '. Try again');
				this.restart();
				return;
			}

		}, 1000);
		this.timer = timer;
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
			this.props.dispatch({ type: 'control/correct_plus' });

		} else {
			this.soundLoose.play();
			this.props.dispatch({ type: 'control/incorrect_minus' });

			if (this.props.controlReducer.incorrect <= 0) {
				alert('Your correct answers: ' + this.props.controlReducer.correct + '. Try again');
				this.restart();
			}
		}
		
		this.props.dispatch({ type: 'answer/all' });
		this.props.dispatch({ type: 'time/reset' });

		this.props.dispatch({ type: 'control/select', selected: {value: 0} })
	}

	restart()
	{
		this.props.dispatch({ type: 'answer/all' })
		this.props.dispatch({ type: 'time/reset' });
		this.props.dispatch({ type: 'control/reset' });
		this.props.dispatch({ type: 'control/select', selected: {value: 0} })
	}
}

export default connect(state => state)(App);