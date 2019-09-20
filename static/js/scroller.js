lastResult = "";
selectedFont = "Arial";

function getWords() {
	console.log("Calling getWords")
	$.ajax({
		url: "getWords",
		success: function (result) {			
			font = result.split("||")[0];
			words = result.split("||")[1].replace(/\n/g, " ");
			console.log(font);
			//console.log(result);
			if (lastResult == result) {
				console.log("Text is the same");
			} else {
				console.log("Text changed");
				add_marquee(font, words);
			}
			lastResult = result;
			$(".marquee").css("font-family", font);
			setTimeout(getWords, 10*1000);
		}
	});
};

function add_marquee(selectedFont, words) {
	fontsize = 20 + Math.random()*8;
	marginleft = 100;
	speed = 3;//Math.random()*5+1;	
	words = words.split(":|:");
	young_words = "";
	old_words = "";
	words.forEach(function(word) {
		age = $.trim(word.split(": ")[0]);
		word = $.trim(word.split(": ")[1]);		
		if (word) {
			//console.log(age, word);
			if(age == "young") {
				young_words += " " + word;
				//console.log("Young changed: " + young_words)
			} else {				
				old_words += " " + word;
				//console.log("Old changed: "+ old_words)
			}
		}
	
	})
	if (young_words) {		
		add_text(young_words, $("#marquee_area_young"));	
	}
	if (old_words) {		
		add_text(old_words, $("#marquee_area_old"));	
	}
}
		
function add_text(words, area) {
	area.find(".marquee").fadeOut(1000, function () {			
			area.find(".marquee").text(words);
			area.find(".marquee").fadeIn(1000);
			
		});
		//console.log(area.find(".marquee"));
	}	


var first = true;
$( document ).ready(function() { 
	getWords();
});
