function refreshImage() {
	imgs = $(".imgRotator");
	//console.log(imgs);
	num_imgs = imgs.length;
	count = (count + 1) % num_imgs;
	img = imgs[count];
	imgs.hide();
	$(img).show();
	$.ajax({
                url: "setImageRotator/"+ $(img).attr("src").split("/").pop(),
                success: function (result) {
                        console.log(result);
        		setTimeout(refreshImage, 3000);
                }
        })


};
var count = 0;
$(document).ready(function () {
        setTimeout(refreshImage, 1);
})

