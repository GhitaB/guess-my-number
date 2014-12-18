$(document).ready(function(){
	function get_random_int_number(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function choose_number() {
		a_number = get_random_int_number(1234, 9876);
		return a_number;
	}

	function show_status(text_bold, text_normal) {
		$("#status").html("<b>" + text_bold + "</b> " + text_normal);
	}

	function start_game() {
		var number = choose_number();
		$("#choose_number").hide();
		show_status("Status:", "Game started.");
		console.log(number);
	}

	$("#choose_number").on("click", start_game);
});
