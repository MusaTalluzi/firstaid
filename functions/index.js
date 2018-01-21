'use strict';

process.env.DEBUG = 'actions-on-google:*';
const DialogflowApp = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const rp = require('request-promise');
const TEST_API_ACTION = 'test_api';

/*
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDxWwjS_aPPG4t9Visk1LR4nEkiqLOvmaA'
});
*/
	
exports.firstaid = functions.https.onRequest((request, response) => {
	const app = new DialogflowApp({request, response});
	console.log('Request headers:' + JSON.stringify(request.headers));
	console.log('Request body:' + JSON.stringify(request.body));
	
	function test_api(app) {
			app.ask('Handling your test_api action');
			let query = {
				method: 'GET',
				uri: 'https://reqres.in/api/users/2'
			};
			rp(query).then((error, response, body) => {
				if(error) {
					console.log('Error');
				} else {
					console.log("this is a string");
					console.log(JSON.parse(body).data.id);
					app.tell(JSON.parse(body).data.first_name);
				}
		});
		
	}

	let actionMap = new Map();
	actionMap.set(TEST_API_ACTION, test_api);
	
	app.handleRequest(actionMap);
});


/*
const NAME_ACTION = 'make_name';
const COLOR_ARGUMENT = 'color';
const NUMBER_ARGUMENT = 'number';

exports.sillyNameMaker = functions.https.onRequest((request, response) => {
	const app = new App({request, response});
	console.log('Request headers:' + JSON.stringify(request.headers));
	console.log('Request body:' + JSON.stringify(request.body));
	
	function makeName(app) {
		let number = app.getArgument(NUMBER_ARGUMENT);
		let color = app.getArgument(COLOR_ARGUMENT);
		app.tell('Alright, your silly name is ' +
			color + ' ' + number +
			'! I hope you like it. See you next time.');
	}
	
	let actionMap = new Map();
	actionMap.set(NAME_ACTION, makeName);
	
	app.handleRequest(actionMap);
});
*/