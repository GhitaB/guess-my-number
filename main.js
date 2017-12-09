$(document).ready(function() {

  hashids = new Hashids("iDj*~u%W->=H+-L2OCJh4~m%$440HFc0&_GxFGFv}*re*/W=z4f:cA/@VGR;;|^P");

  function get_random_int_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function number_has_distinct_digits(a_number) {
    d4 = a_number % 10;
    d3 = parseInt(a_number / 10) % 10;
    d2 = parseInt(a_number / 100) % 10;
    d1 = parseInt(a_number / 1000) % 10;

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
    do {
      a_number = get_random_int_number(1234, 9876);
    } while (!number_has_distinct_digits(a_number));

    return hashids.encode(a_number);
  }

  function show_status(text_bold, text_normal) {
    $("#status").html("<b>" + text_bold + "</b> " + text_normal);
  }

  function add_record_to_history(your_number, nr_good_digits, nr_good_positions) {
    var $tr = $("<tr>"),
    $tbody =$("#history_table tbody");
    $tr.append($("<td>", {text: $("tr", $tbody).length + 1}));
    $tr.append($("<td>", {text: your_number}));
    $tr.append($("<td>", {text: nr_good_digits}));
    $tr.append($("<td>", {text: nr_good_positions}));
    $tbody.append($tr);
  }

  function game_victory() {
    show_status("Victory!", "You finished the game.");
    $("#title_work").text("Victory!");
    $("#form_number_submit").hide();
  }

  function verify_numbers(your_number, computer_number_hashed) {
    if (your_number == hashids.decode(computer_number_hashed)) {
      add_record_to_history(your_number, 4, 4);
      game_victory();
    }
    else {
      y = your_number.toString();
      c = hashids.decode(computer_number_hashed).toString();

      var nr_good_digits = 0;
      var nr_good_positions = 0;

      for (var i = 0; i < y.length; i++)
      {
        if (new RegExp(y[i]).test(c))
          nr_good_digits++;

        if (y[i] == c[i])
          nr_good_positions++;
      }

      show_status("Status:", "You guessed " + nr_good_digits + " and " + nr_good_positions + " in the right place.");
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
      your_number = parseInt($("#your_number").val());
      if (isNaN(your_number))
        show_status("Error:", "Enter only numbers.");
      else {
        if (number_has_distinct_digits(your_number)) {
          show_status("Status:", "Try to find the good number.");
          verify_numbers(your_number, computer_number);
        }
        else
          show_status("Error:", "Try numbers with 4 distinct digits, please.");
      }
    });
  }

  // Preparing...
  $("#game_board").hide();
  show_status("Status:", "Are you ready? Press the button to start.");
  // Start on click
  $("#choose_number").on("click", start_game);
});
