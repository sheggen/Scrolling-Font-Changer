function refreshImageText() {
	$.ajax({
                url: "/getImageRotatorText",
                success: function (result) {
                        //console.log(result);
			$(".allText").hide();
			//console.log($("#"+result.split(".")[0]));
			$("#"+result.split(".")[0]).show();
        		setTimeout(refreshImageText, 1000);
                }
        });
}



$(document).ready(function () {
  setTimeout(refreshImageText, 1);
	setTimeout(refreshFont, 1);
})

