function approve(el) {
	//console.log($(el).val());
	$.ajax({
		url: "approve/"+$(el).val(),
		success: function (result) {
			console.log(result + " approved");
			window.location.replace('vetWords');
		}
	});
}


function reject(word) {
	console.log($("#theForm"));
	$( "#theForm" ).submit();
}

