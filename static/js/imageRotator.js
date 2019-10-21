function refreshImage() {
	imgs = $(".imgRotator");
	//console.log(imgs);
	num_imgs = imgs.length;
	count = (count + 1) % num_imgs;
	img = imgs[count];
	imgs.hide();
	$(img).show();
        setTimeout(refreshImage, 10000);

};
var count = 0;
$(document).ready(function () {
        setTimeout(refreshImage, 1);
})

