function refreshImageText() {
	$.ajax({
                url: "getImageRotatorText",
                success: function (result) {
                        console.log(result);
			$(".allText").hide();
			console.log($("#"+result.split(".")[0]));
			$("#"+result.split(".")[0]).show();
        		setTimeout(refreshImageText, 1000);
                }
        })


};
var count = 0;
$(document).ready(function () {
        setTimeout(refreshImageText, 1);
})

