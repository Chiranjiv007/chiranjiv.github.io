var imageDataString
$(document).ready(function(){

	// console.log("test");
	$.getJSON('data/data.json', function(data){
		imageDataString = JSON.stringify(data);
		// console.log(data);
		$.each(data,function(i,f){

			$("#row").append('<div class="column"><img src='+ f.src + ' alt=' + f.Name +' style="width:100%"> </div>');
			
		});
	});
});

function showForm(mybutton, id)
{
	var button = document.getElementById(mybutton);
 	var myDiv = document.getElementById(id);

 	if(myDiv.style.visibility=="hidden"){
 		myDiv.style.visibility = "visible";
 	}	
          function show() {
            myDiv.style.visibility = "visible";
          }

          function hide() {
            myDiv.style.visibility = "hidden";
          }

          function toggle() {
            if (myDiv.style.visibility === "hidden") {
              show();
            } else {
              hide();
            }
          }

          hide();

          button.addEventListener("click", toggle, false);
}

function validateForm(id){


	var name = document.forms[id]["Name"].value;
	// console.log(name);
	var src = document.forms[id]["src"].value;
	var info = document.forms[id]["info"].value;
	var date = document.forms[id]["date"].value;
	var curentDate = new Date();
	var formDate = new Date(date);
	if(name == null || name==""){
		alert("First name must be filled out");
		return false;
	} else if(src == null || src==""){
		alert("Image src must be filled out");
		return false;
	} else if(info == null || info==""){
		alert("Image info must be filled out");
		return false;
	} else if(formDate == null){
		alert("date must be filled out");
		return false;
	} else if(formDate>curentDate){
		window.alert("Stop Playing buddy!! No Future dates")
		return false;
	}

	// console.log("test");
	return true;
}

function validateDelForm(id)
{
	var src = document.forms[id]["src"].value;
	if(src=="" || src==null)
	{
		alert("Dont remember which image to delete?");
		return false;
	}
	return true;
}


	function toJSONString( form ) {
		var obj = {};
		var elements = form.querySelectorAll( "input, select, textarea" );
		for( var i = 0; i < elements.length; ++i ) {
			var element = elements[i];
			var name = element.name;
			var value = element.value;
			if(value==""){continue;}

			if( name ) {
				obj[ name ] = value;
			}
		}

		return JSON.stringify( obj );
	}

		console.log("tests");

function loadDoc(id) {
		var form = document.getElementById( id );
		console.log(form)
		var output = document.getElementById( "output" );
		var json = toJSONString( form );

		if(id == "add")
		{
			addJsonData(json);
		} 

		if(id == "edit")
		{
			editJsonData(json);
		}

		if(id == "delete")
		{
			afterDel(json);
		}
}

function afterDel(json){
	var obj = JSON.parse(json);
	var found =false;
	var imageData = JSON.parse(imageDataString);
	$.each(imageData, function(i,f){
		if(obj.src == f.src){
			found = true;
			//delete object
			imageData.splice(i,1);
		}
	});

	if(!found)
	{
		alert("image not found!! Stop playing dude.");
		return false;
	}
	else{
		return true;
	}


}


function addJsonData(json)
{
	var obj = JSON.parse(json);
	var imageData = JSON.parse(imageDataString);
	var size = imageData.push(obj)
	imageDataString = JSON.stringify(imageData);
	addDataintoFile(imageDataString);
}

function addDataintoFile(imageDataString)
{
	var a = document.createElement('a');
  	a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(imageDataString));
  	a.setAttribute('download', "data1.json");
  	a.click()
	
}


function editJsonData(json)
{
	var obj = JSON.parse(json);
	var imageData = JSON.parse(imageDataString);
	$.each(imageData,function(i,f){
		if(obj.src==f.src)
		{
			f.Name = obj.Name;
			f.info = obj.info;
			f.date = obj.date;
		}
	});
	console.log(imageData);
	addDataintoFile(JSON.stringify(imageData));

}