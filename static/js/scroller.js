lastWords = "";
selectedFont = "Arial";

function getWords() {
	//console.log("Calling getWords")
	$.ajax({
		url: "/getWords",
		success: function (result) {
			mute = result.split("||")[0];
			font = result.split("||")[1];
			words = result.split("||")[2].replace(/\n/g, " ");
			//console.log(mute);
			//console.log(result);
			
			// Mute display, or not
			if (mute == 'true') {
				//console.log("Muting display");
				$(".marquee").fadeOut(1000);
			} else if (mute == 'false') {
				//console.log("Unmuting display");
				$(".marquee").fadeIn(1000);
			}
				
			// Check if text changed, update if so
			if (lastWords != words) {
				//console.log("Text changed");
				add_marquee(font, words);
			}
			lastWords = words;
			$(".marquee").css("font-family", font);
			setTimeout(getWords, 3*1000);
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
