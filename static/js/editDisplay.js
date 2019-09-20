function sendYoungWord() {
        word = $("#youngFeeling").val();
        $.ajax({
                url: "sendWord/young/"+ word,
                success: function (result) {
                        console.log(result);
                        $("#youngFeeling").val('');
                }
        })
};

function sendOldWord() {
        word = $("#oldFeeling").val();
        $.ajax({
                url: "sendWord/old/"+ word,
                success: function (result) {
                        //console.log(result);
                        $("#oldFeeling").val('');
                }
        })
};

function sendFont(el) {        
	font = $(el).val();
        $("body").css("font-family", font);
	console.log(font);
	$.ajax({
		url: "sendFont/"+font,
		success: function(result) {
			console.log("We did it!");
		}
	})
}
