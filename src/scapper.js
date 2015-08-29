var url = "http://www.indiabix.com/general-knowledge/basic-general-knowledge/";
	

// Print all of the news items on Hacker News
var jsdom = require("jsdom");
var fs = require("fs");
var jquery = fs.readFileSync("./lib/jquery.js", "utf-8");

jsdom.env({
  url: url,
  src: [jquery],
  done: function (err, window) {
    var $ = window.$;
    window.setTimeout(function() {
    	var $ = window.$;
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
			console.log("A: " + $(elem).find('.jq-hdnakqb').html());
		}, 1000);
	});
  }
});