function refreshImageText() {
	$.ajax({
                url: "getImageRotatorText",
                success: function (result) {
                        //console.log(result);
			$(".allText").hide();
			//console.log($("#"+result.split(".")[0]));
			$("#"+result.split(".")[0]).show();
        		setTimeout(refreshImageText, 1000);
                }
        })
};

function refreshFont() {
        $.ajax({
		url: "getFont",
		success: function(result) {
			// console.log("We did it dude!", result);
                        // change selected font
                        if (result != "null") {
                        	$("body").css("font-family", result);
                        } else {
                        	$("body").css("font-family", "Arial");
                        }
                        setTimeout(refreshFont, 3000);
		}
	})
}

var count = 0;
$(document).ready(function () {
        setTimeout(refreshImageText, 1);
	setTimeout(refreshFont, 1);
})

