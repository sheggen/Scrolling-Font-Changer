function sendYoungWord() {
        word = $("#youngFeeling").val();
        $.ajax({
                url: "/sendWord/young/"+ word,
                success: function (result) {
                        console.log(result);
                        $("#youngFeeling").val('');
                }
        })
};

function sendOldWord() {
        word = $("#oldFeeling").val();
        $.ajax({
                url: "/sendWord/old/"+ word,
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
		url: "/sendFont/"+font,
		success: function(result) {
			// console.log("We did it!");
		}
	})
}

function muteDisplay() {
        $.ajax({
		url: "/muteDisplay",
		success: function(result) {
			console.log("We "+result+"ed it!");
		}
	})
}

function refreshFontFS() {
        $.ajax({
		url: "/getFont",
		success: function(result) {
			// console.log("We did it dude!", result);
                        // change selected font
                        if (result != "null") {
                                $("#fs").val(result).change();
                        } else {
                                result = "Arial";
                        }
                        setTimeout(refreshFontFS, 1000);
		}
	})
}
// on document load, set the selected font to what's in the txt
// on regular intervals, check the font and set it in this ui.
$(document).ready(function () {
        setTimeout(refreshFontFS, 1);
})
