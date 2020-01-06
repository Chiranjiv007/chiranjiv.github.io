$(document).ready(function(){
	console.log("test");
	jQuery.getJSON('data.json', function(data){
		console.log(data);
		$.each(data.images,function(i,f){
			var img = new Image();
			img.src = f.src;
			img.setAttribute("class", "gallery");
			img.setAttribute("alt", img.alt);
			console.log(img)
			document.getElementById("img-container").appendChild(img);
			f.addEventListener("click", myfunction);
		});
	});
});
