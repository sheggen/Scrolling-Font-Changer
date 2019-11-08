function refreshFont() {
  $.ajax({
		url: "/getFont",
		success: function(result) {
			console.log("We did it dude!", result);
			// change selected font
			if (result != "null") {
				$("body").css("font-family", result);
			} else {
				$("body").css("font-family", "Andika");
			}
			setTimeout(refreshFont, 500);
			setTimeout(returnFromFee, 6000);
		}
	});
}

function returnFromFee() {
	console.log("Back from Fee")
	if ($("body").css("font-family") == "fee_40regular" {
		console.log("Back to Andika");
		$("body").css("font-family", "Andika");
	}
}
