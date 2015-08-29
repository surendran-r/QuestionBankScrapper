var request = require("request"),
	cheerio = require("cheerio"),
	url = "http://www.indiabix.com/general-knowledge/basic-general-knowledge/";
	
request(url, function (error, response, body) {
	if (!error) {
		var $ = cheerio.load(body);
		//Get the question & answer
		$(".bix-tbl-container").each(function (i, elem) {
			//Get the question
			console.log("Q:" + $(elem).find('.bix-td-qtxt').text());
			//Get the options
			$(elem).find('.bix-td-option').each(function  (i, elem) {
				var optionText = $(elem).text();
				if(optionText === 'A.' || optionText === 'B.' || optionText === 'C.' || optionText === 'D.') {
					return;
				}
				console.log("O: " + optionText);
			});
			//Get the answer
			console.log("A: " + $(elem).find('.jq-hdnakqb').text());
		});
			
	} else {
		console.log("We’ve encountered an error: " + error);
	}
});
