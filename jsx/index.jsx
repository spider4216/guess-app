import React from "react";
import { combineReducers } from 'redux';
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import {Provider} from "react-redux";
import App from "./App.jsx";


let json = '[{"img":"/images/1/img.png", "title": "Russia"}, {"img":"/images/2/img.png", "title": "Kazakhstan"},{"img":"/images/3/img.png", "title": "Belarus"},{"img":"/images/4/img.png", "title": "China"},{"img":"/images/5/img.png", "title": "India"}]';
let data = JSON.parse(json);


function timeReducer(state = {time: 15}, action)
{
	switch (action.type) {
		case 'time/decrement':
			return {time: state.time - 1};
		case 'time/reset':
			return {time: 15};
		default:
			return state;
	}
}

function answersReducer(state = {}, action) {
	let one = data[random(data.length)];
	
	switch (action.type) {
		case 'answer/raw' :
			return {
				...state,
				raw: data
			};
		case 'answer/all' :
			let one = data[random(data.length)];
			return {
				...state,
				one: one,
				all: getAnswers(one.title, data),
			};
		default:
			return state;
	}
}

function shuffle(array)
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

function random(length)
{
    return Math.floor((Math.random() * length) + 0);
}

function getAnswers(rightAnswer, data)
{
	var arr = [];
	
	arr.push({
		state: 'correct',
		value: rightAnswer,
	});

	for (var i = 0; i <= 2; i++) {
		var value = data[random(data.length)].title;

		while (arr.some(item => item.value == value)) {
			value = data[random(data.length)].title;
		}

		arr.push({
			state: 'incorrect',
			value: value,
		});
    }

    return shuffle(arr);
}

const rootReducer = combineReducers({
	timeReducer: timeReducer,
	answersReducer: answersReducer
})

ReactDOM.render((
	<Provider store={createStore(rootReducer)}>
		<App />
	</Provider>
), document.getElementById('content'));
