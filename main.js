$(document).ready(function(){
	var choose_number = function() {
		a_number = 4321;
		return a_number;
	}

	var show_status = function(text_bold, text_normal) {
		$("#status").html("<b>" + text_bold + "</b> " + text_normal);
	}

	var start_game = function() {
		var number = choose_number();
		$("#choose_number").hide();
		show_status("Status:", "Game started.");
		console.log(number);
	}

	$("#choose_number").on("click", start_game);
});