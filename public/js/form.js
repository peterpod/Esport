var counter = 0;
var limit = 1;
// this function is being used to add my redirect button so that after
// creating an account users can 
function addButton(){
	if (counter == limit)  {
          alert("You have reached the limit of adding users");
     }
     else {
	  $('#signup').append("<a class='btn btn-lg btn-primary btn-block' href='home'>Lets Go To Esport</a>").hide().fadeIn();
	  counter++;
	 }
};

$(function() {    // do once original document loaded and ready
    //call getJSON when myform is submitted
    $('#edit').on('submit',function(event) {
        var displayText = "";
        event.preventDefault();
        $.ajax({
		url: "../../../../../userInfo/"+ $("#username").val()+ "/"+ $("#password").val()+ "/"+ $("#firstname").val()+ "/"+ $("#lastname").val(),
		type: "POST",
		data: {
			username: $("#username").val(),
		    password: $("#password").val(),
			firstname: $("#firstname").val(),
		    lastname: $("#lastname").val()
		}
	});
		return false;	
	});
}); // onReady

$(function() {    // do once original document loaded and ready
    //call getJSON when myform is submitted
    $('#signup').on('submit',function(event) {
    	console.log('Im in form.js');
    	event.preventDefault();
    	var aj = $.ajax({
		url: "userInfo/"+ $("#username").val()+ "/"+ $("#password").val()+ "/"+ $("#firstname").val()+ "/"+ $("#lastname").val(),
		type: "PUT",
		data: {
			username: $("#username").val(),
		    password: $("#password").val(),
		    firstname: $("#firstname").val(),
		    lastname: $("#lastname").val()
		}
	});
		return false;	
	});
});



$(function() {    // do once original document loaded and ready
    //call getJSON when myform is submitted
    $('#delete').on('submit',function(event) {
    	console.log('im getting into form delete');
    	event.preventDefault();
    	var aj = $.ajax({
		url: "userInfo/"+ $("#firstname").val()+ "/"+ $("#lastname").val(),
		type: "DELETE",
		data: {
			firstname: $("#firstname").val(),
		    lastname: $("#lastname").val(),
		}
	});
		return false;	
	});
});

			