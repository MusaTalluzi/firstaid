'use strict';

process.env.DEBUG = 'actions-on-google:*';
const DialogflowApp = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');
const rp = require('request-promise');
const TEST_API_ACTION = 'test_api';
//var https = require('https');
//var http = require('http');

/*
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDxWwjS_aPPG4t9Visk1LR4nEkiqLOvmaA'
});

function burnHandler(app) {
	var options = {
		host: 'reqres.in/',
		path: '/api/users/2',
	};

	var req = http.get(options, function(res) {
		var bodyChunks = [];
		res.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			console.log('BODY: ' + body);
			app.tell('Your data has been received!');
		})
	});

	req.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});
 
	app.ask("We're handling your request");
}
*/
exports.firstaid = functions.https.onRequest((request, response) => {
	const app = new DialogflowApp({request, response});
	console.log('Request headers:' + JSON.stringify(request.headers));
	console.log('Request body:' + JSON.stringify(request.body));
	
	function burnHandler(app) {
		
		//app.ask('Handling your test_api action');
		let query = {
			uri: 'https://reqres.in/api/users/2',
			json: true
		}
		rp(query).then((body) => {
			console.log(body.data);
			app.tell('Recived a response to your request');
		}).catch((error) => {
			app.tell('An error happened');
			console.log(error);
		});
	}

	let actionMap = new Map();
	actionMap.set(TEST_API_ACTION, burnHandler);
	
	app.handleRequest(actionMap);
});