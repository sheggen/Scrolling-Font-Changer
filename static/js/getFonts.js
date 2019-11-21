function refreshFont() {
  $.ajax({
		url: "/getFont",
		success: function(result) {
			// change selected font
			if (result != "null") {
				$("body").css("font-family", result);
			}
			setTimeout(refreshFont, 10000);
		},
	  	error: function(xhr, status, error) {
                        console.log(xhr.responseText);
                        location.reload(true);
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
                           console.log("Fee changed to: " + result);
                	}, 
			error: function(xhr, status, error) {
                        	console.log(xhr.responseText);
                 	       location.reload(true);
                	}
        	})
	}
}

function checkForFee() {
        if ($("body").css("font-family") == "fee_40regular") {
		console.log("It was Fee!");
		setTimeout(returnFromFee, 60000);
	} else {
		console.log("Not fee");
	}
	setTimeout(checkForFee, 10000);

}

setTimeout(checkForFee, 1);
setTimeout(refreshFont, 1);
