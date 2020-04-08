(function () {
	'use strict';
	var backtrace = require('backtrace-js');
	
	backtrace.initialize({
		endpoint: 'https://<your project>.sp.backtrace.io:6098',
		token: '<your token>',
		handlePromises: true
	});
	
	function callbackExample(fail, onSuccess, onError) {
		var statusCode = fail ? 500 : 200;
		$.ajax('https://httpstat.us/' + statusCode + '?sleep=1000', {
			success: function () {
				onSuccess();
			},
			error: function (jqXHR) {
				onError(jqXHR);
			}
			// for short:
			//success: onSuccess,
			//error: onError
		});
	}
	//callbackExample(false,
		//() => console.log('Everything went well!'),
		//jqXHR => backtrace.report(new Error(jqXHR.responseText)));
	
	function promiseExample(fail) {
		var statusCode = fail ? 500 : 200;
		return $.ajax('https://httpstat.us/' + statusCode + '?sleep=1000');
	}
	//promiseExample(false)
		//.then(() => promiseExample(true))
		//.then(() => console.log('Everything went well!'))
		//.catch(jqXHR => backtrace.report(new Error(jqXHR.responseText)));
	
	function myPromiseExample(fail) {
		return new Promise((resolve, reject) => {
			fail ? reject('Failed...') : resolve('Success!');
		});
	}
	
	myPromiseExample(true)
		.then(msg => console.log(msg));
		//.catch(msg => console.log(msg));
		
	async function asyncExample(fail) {
		var statusCode = fail ? 500 : 200;
		//try {			
			await $.ajax('https://httpstat.us/' + statusCode + '?sleep=1000');
			await $.ajax('https://httpstat.us/' + statusCode + '?sleep=1000');
			console.log('Everything went well!');
		/*}
		catch (jqXHR) {
			backtrace.report(new Error(jqXHR.responseText));
		}*/
	}	
	//asyncExample(true);
		//.catch(jqXHR => backtrace.report(new Error(jqXHR.responseText)));
	
	console.log('Request sent.');
})();
