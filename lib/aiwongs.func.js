//2019.06.14 wangs this code.
$(document).ready(function () {

	hashids = new Hashids("iDj*~u%W->=H+-L2OCJh4~m%$440HFc0&_GxFGFv}*re*/W=z4f:cA/@VGR;;|^P");

	//生成随机数
	function get_random_int_number(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	//有多少正确的数字
	function number_has_distinct_digits(a_number) {
		d4 = a_number % 10;
		d3 = parseInt(a_number / 10) % 10;
		d2 = parseInt(a_number / 100) % 10;
		d1 = parseInt(a_number / 1000) % 10;

		//alert(d1);
		//alert(d2);
		//alert(d3);
		//alert(d4);

		if (d1 != d2 && d1 != d3 && d1 != d4 && d2 != d3 && d2 != d4 && d3 != d4) {
			if (d1 != 0 && d2 != 0 && d3 != 0 && d4 != 0) { //排除0
				return true;
			} else {
				show_status("错误:", "请输入4个完全独立的数字（数字不可以为0）！");
				return false;
				//return true;
			}
		} else {
			return false;
		}
	}
	//选择一个数字
	function choose_number() {
		do {
			a_number = get_random_int_number(1234, 9876); //seed
			//alert(a_number);
		} while (!number_has_distinct_digits(a_number));

		return hashids.encode(a_number);
	}
	//提示状态
	function show_status(text_bold, text_normal) {
		$("#status").html("<b>" + text_bold + "</b> " + text_normal);
	}
	//添加过程记录
	function add_record_to_history(your_number, nr_good_digits, nr_good_positions) {
		var $tr = $("<tr>"),
		$tbody = $("#history_table tbody");
		$tr.append($("<td>", {
				text: $("tr", $tbody).length + 1
			}));
		$tr.append($("<td>", {
				text: your_number
			}));
		$tr.append($("<td>", {
				text: nr_good_digits
			}));
		$tr.append($("<td>", {
				text: nr_good_positions
			}));
		$tbody.append($tr);
	}
	//游戏结束
	function game_victory() {
		show_status("终于胜利了！", "你通关了！");
		$("#title_work").text("通关了！");
		$("#form_number_submit").hide();
	}
	//验证数字
	function verify_numbers(your_number, computer_number_hashed) {
		//alert(your_number);
		if (your_number == hashids.decode(computer_number_hashed)) {
			add_record_to_history(your_number, 4, 4);
			game_victory();
		} else {
			y = your_number.toString();
			c = hashids.decode(computer_number_hashed).toString();

			var nr_good_digits = 0;
			var nr_good_positions = 0;

			for (var i = 0; i < y.length; i++) {
				if (new RegExp(y[i]).test(c))
					nr_good_digits++;

				if (y[i] == c[i])
					nr_good_positions++;
			}

			show_status("状态:", "你猜中了" + nr_good_digits + "个数，并且有" + nr_good_positions + "个数字在正确的位置。");
			add_record_to_history(your_number, nr_good_digits, nr_good_positions);
			$("#your_number").val("");
		}
	}
	//游戏开始
	function start_game() {
		//生成随机数
		var computer_number = choose_number();
		//alert(computer_number); //哈希后
		var your_number = 0;
		$("#choose_number").hide();
		show_status("状态:", "游戏开始！");

		//绘制游戏面板
		$("#game_board").show();

		//开始尝试匹配数字
		$("#try_it").on("click", function (evt) {
			evt.preventDefault(); // prevent Submit
			your_number = parseInt($("#your_number").val());
			//alert(your_number);

			var length = your_number.toString().length;

			if (length == 4) {
				if (isNaN(your_number))
					show_status("错误:", "只能输入数字！");
				else {
					if (number_has_distinct_digits(your_number)) {
						show_status("状态:", "Try to find the good number.");
						verify_numbers(your_number, computer_number);
					} else
						show_status("错误:", "请输入4个完全独立的数字（不重复，不可为0）！");
				}
				//alert(length+1);
			} else {
				show_status("错误:", "请输入4个完全独立的数字（不重复且要4位数字，不可为0）！");
				//alert(length+2);
			}

		});
	}

	//游戏准备...
	$("#game_board").hide();
	show_status("状态:", "你准备好了吗？按上面的按钮开始游戏吧～");
	//按开始键
	$("#choose_number").on("click", start_game);
});
