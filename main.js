$(document).ready(function(){
	function get_random_int_number(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function number_has_distinct_digits(a_number) {
		if(a_number.length != 4) return false;
		
		d4 = parseInt(a_number[3]);
		d3 = parseInt(a_number[2]);
		d2 = parseInt(a_number[1]);
		d1 = parseInt(a_number[0]);

		if(d1 != d2 && d1 != d3 && d1 != d4 && d2 != d3 && d2 != d4 && d3 != d4) {
			if(d1!= 0) {
				return true;
			} else {
				return false;
			}
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

	var $tbody = $("#history_table tbody")
	function add_record_to_history(your_number, nr_good_digits, nr_good_positions) {
		var $tr = $("<tr>");
		$tr.append($("<td>", {text: $("tr", $tbody).length + 1} ));
		$tr.append($("<td>", {text: your_number} ));
		$tr.append($("<td>", {text: nr_good_digits} ));
		$tr.append($("<td>", {text: nr_good_positions} ));
		$tbody.append($tr);
	}

	function game_victory() {
		show_status("Victory!", "You finished the game.");
		$("#title_work").text("Victory!");
		$("#form_number_submit").hide();
	}

	function verify_numbers(your_number, computer_number) {
		if (your_number == computer_number) {
			add_record_to_history(your_number, 4, 4);
			game_victory();
		} else {
			y = your_number.toString();
			c = computer_number.toString();

			var nr_good_digits = 0;
			var nr_good_positions = 0;

			for (var i = 0; i < 4; i++) {
				if(y[i] == c[i]) {
					nr_good_digits ++;
					nr_good_positions ++;	
				} else {
					for (var j = 0; j < 4; j++) {
						if(i != j) {
							if(y[i] == c[j]) {
								nr_good_digits ++;
							}
						}
					}
				}
			}

			show_status("Status:", "You guessed " + nr_good_digits + " and " + nr_good_positions + " in the right place.");
			var index = 0;
			add_record_to_history(your_number, nr_good_digits, nr_good_positions);
			$("#your_number").val("");
		}
	}

	function start_game() {
		// Computer chooses the number.
		var computer_number = choose_number();
		var your_number = 0;
		$("#choose_number").hide();
		show_status("Status:", "Game started.");

		// Game board is made visible.
		$("#game_board").show();

		// You start trying numbers.
		$("#try_it").on("click", function(evt){
			evt.preventDefault(); // prevent Submit
			your_number = $("#your_number").val();
			if(isNaN(your_number)) {
				show_status("Error:", "Enter only numbers.");
			} else {
				if(number_has_distinct_digits(your_number)){
					show_status("Status:", "Try to find the good number.");
					verify_numbers(your_number, computer_number);
				} else {
					show_status("Error:", "Try numbers with 4 distinct digits, please.");
				}
			}
		});
	}

	// Preparing...
	$("#game_board").hide();
	show_status("Status:", "Are you ready? Press the button to start.");
	// Start on click
	$("#choose_number").on("click", start_game);
});
