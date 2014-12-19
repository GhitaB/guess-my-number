$(document).ready(function(){
	function get_random_int_number(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function number_has_distinct_digits(a_number) {
		d4 = a_number % 10;
		d3 = parseInt(a_number / 10) % 10;
		d2 = parseInt(a_number / 100) % 10;
		d1 = parseInt(a_number / 1000) % 10;

		if(d1 != d2 && d1 != d3 && d1 != d4 && d2 != d3 && d2 != d4 && d3 != d4) {
			return true;
		} else {
			return false;
		}
	}

	function choose_number() {
		while(true) {
			a_number = get_random_int_number(1234, 9876);
			if(number_has_distinct_digits(a_number)) {
				break;
			}
		}
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
		$("#game_board").show();
	}

	// Preparing...
	$("#game_board").hide();
	show_status("Status:", "Are you ready? Press the button to start.");
	// Start on click
	$("#choose_number").on("click", start_game);
});
