var urlPrefix = "http://www.indiabix.com/general-knowledge/basic-general-knowledge/";
var system = require('system'),
	webpage = require('webpage');

function gotoNextPage(i) {
	if( i > 13) {
		phantom.exit();
	} else {
		i = i + 1;
		var url = urlPrefix + "00" + (5000 + i); 
		getQandAFromURL(url, i);
	}
}

function injectDebugFunctions(page) {
	page.onConsoleMessage = function(msg, lineNum, sourceId) {
	  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
	};

	page.onResourceRequested = function (req) {
	    console.log('requested: ' + req.url);
	};

	page.onResourceReceived = function (res) {
	    console.log('received: ' + req.url);
};
}

function getQandAFromURL(url, i) {
	var page = webpage.create();

	function handler(status) {
		console.log('Loaded Page ... ');
	    if (status !== 'success') {
	        console.log('Unable to load the address! ' + status);
	        phantom.exit(1);
	    } else {
	    	function extractor() {
				console.log('Loaded JQuery ... ');
				var data = page.evaluate( function() {
					var results = new Array();
		            //Get the question & answer
					$(".bix-tbl-container").each(function (i, elem) {
						var result = { question: "", option:[], answer:""};
						//Get the question
						console.log("Q:" + $(elem).find('.bix-td-qtxt').text());
						result.question = $(elem).find('.bix-td-qtxt').text();
						//Get the options
						$(elem).find('.bix-td-option').each(function  (i, elem) {
							var optionText = $(elem).text();
							if(optionText === 'A.' || optionText === 'B.' || optionText === 'C.' || optionText === 'D.') {
								return;
							}
							result.option.push(optionText);
							console.log("O: " + optionText);
						});
						//Get the answer
						console.log("A: " + $(elem).find('.jq-hdnakqb').html());
						result.answer = $(elem).find('.jq-hdnakqb').html();
						results.push(result);
					});
					return results;
				});
				console.log(JSON.stringify(data));
	            gotoNextPage(i);
	    	}
	    	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", extractor);
		}
	}

	injectDebugFunctions(page);
	page.open(url, handler);
}

getQandAFromURL(urlPrefix, 1);