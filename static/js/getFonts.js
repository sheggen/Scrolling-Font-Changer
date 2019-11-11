function refreshFont() {
  $.ajax({
		url: "/getFont",
		success: function(result) {
			// change selected font
			if (result != "null") {
				$("body").css("font-family", result);
			}
			setTimeout(refreshFont, 1000);
		}
	});
}

function returnFromFee() {
	if ($("body").css("font-family") == "fee_40regular") {
		console.log("Back to Andika");
		$("body").css("font-family", "andika_new_basicregular");
        	$.ajax({
                	url: "/sendFont/andika_new_basicregular",
	                success: function(result) {
                           console.log("We did it!" + result);
                	}
        	})
	}
	setTimeout(returnFromFee, 60000);
}

setTimeout(returnFromFee, 1);

