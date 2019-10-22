function refreshFont() {
  $.ajax({
		url: "/getFont",
		success: function(result) {
			console.log("We did it dude!", result);
			// change selected font
			if (result != "null") {
				$("body").css("font-family", result);
			} else {
				$("body").css("font-family", "Arial");
			}
			setTimeout(refreshFont, 3000);
		}
	});
}