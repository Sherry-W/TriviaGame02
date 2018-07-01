// https://opentdb.com/api_config.php
// https://opentdb.com/api.php?amount=10&category=27

// alert('hi');

// vars
	var timer = 30;
	var countdown;
	var countdownMsg;
	var ques;

	var choice;
	var multChoice;
	var quesIndex = 0;

	var correct = 0;
	var wrong = 0;
	var unanswered = 0;

// questions
	var questions = [
		{
		  question: "What is the collective noun for a group of crows?",
		  answers: ["Pack", "Gaggle", "Murder", "Herd"],
		  correct_answers: "Murder",
		  image:"assets/images/q_one.png"
		}, 
		{
		  question: "What color/colour is a polar bear's skin?",
		  answers: ["White", "Black", "Pink", "Green"],
		  correct_answers: "Black",
		  image:"assets/images/q_two.jpg"
		}, 
		{
		  question: "What are rhino's horn made of?",
		  answers: ["Bone", "Ivory", "Keratin", "Skin"],
		  correct_answers: "Keratin",
		  image:"assets/images/q_three.jpg"
		}, 
		{
		  question: "What is the scientific name of the Budgerigar?",
		  answers: ["Melopsittacus undulatus", "Nymphicus hollandicus", "Pyrrhura molinae", "Ara macao"],
		  correct_answers: "Melopsittacus undulatus",
		  image:"assets/images/q_four.jpg"
		}, 
		{
		  question: "Which of these species is not extinct?",
		  answers: ["Japanese sea lion", "Komodo dragon", "Tasmanian tiger", "Saudi gazelle"],
		  correct_answers: "Komodo dragon",
		  image:"assets/images/q_five.jpg"
		}];

// displays
	countdownMsg = $('#timer').text("Time Remaining: " + timer + " Seconds");

// when start button clicked
	$('#start').on('click', function startcount() {
		countdownMsg.show();
		quesIndex = 0;
		correct = 0;
		wrong = 0;
		unanswered = 0;
		$('#msg1').hide();
		$('#msg2').hide();
		$('#msg3').hide();

		$('#timer').show();
		countdown = setInterval(start, 1000);

		$('#questions').show();
		$('#startMsg').hide();

		showing();
	});

// timer starts to count down
	function start() {
		timer--;
		$('#timer').text("Time Remaining: " + timer + " Seconds");

		if (timer == 0) {
			clearInterval(countdown);
			timer = 0;
			$('#timer').text("Time Remaining: " + timer + " Seconds");

			timesUp();
		}
	}

	function stop() {
		clearInterval(countdown);
	}

	function resetTimer() {
		clearInterval(countdown);
		timer = 30;
	}

//loop through to generate the questions and answer
	quesIndex = 0;

	function showing() {
		if (quesIndex == questions.length) {
			score();
		}

		ques = $("<h3>").text(questions[quesIndex].question);
		$('#questions').append(ques);

		choice = questions[quesIndex].answers;
		choice = choice.sort(function(a, b){return 0.5 - Math.random()});

		for (var j = 0; j < choice.length; j++) { 

				multChoice = $('<p>').attr({'data-value': questions[quesIndex].correct_answers, 'data-src': questions[quesIndex].image}).html(choice[j]);
				// console.log(choice[j]);
				$('#questions').append(multChoice);
			}
	}

	function next() {
		quesIndex++;
		$('#questions').text("");

		showing();
		timer = 30;
		countdown = setInterval(start, 1000);
	}

	$(document).on('click', 'p', function() {
		stop();
		$('#timer').text("Time Remaining: " + timer + " Seconds");

		if ($(this).text() == $(this).attr('data-value')) {
			correct++;
			$('#questions').html("<h3>Correct!</h3>");
			
		}else if ($(this).text() !== $(this).attr('data-value') && $(this).text() !== "") {
			wrong++;
			$('#questions').html("<h3>Nope!</h3><h4>The Correct Answer was: " + $(this).attr('data-value') + "</h4>");
		}
		$('#questions').append('<img src="' + $(this).attr('data-src') + '" />');

		setTimeout(next, 3 * 1000);
	});

// times up
	function timesUp() {
		stop();

		clearInterval(countdown);
		timer = 0;
		$('#timer').text("Time Remaining: " + timer + " Seconds");

		unanswered++;
		$('#questions').html("<h3>Times Up!</h3><h4>The Correct Answer was: " + questions[quesIndex].correct_answers + "</h4>");

		$('#questions').append('<img src="' + questions[quesIndex].image + '" />');
		setTimeout(next, 3 * 1000);
	}
	

//	count the scores
	function score() {
		// debugger;
		stop();
		clearInterval(countdown);
		timer = 0;
		
		
		console.log ("correct: " + correct, "wrong: " + wrong, "unanswered: " + unanswered);

		// $('#timer').hide();
		// $('#questions').hide();
		var msg = $('<h4>').text('All done, heres how you did!');
		$('#timer').append(msg);

		$('#msg1').text('Correct Answers: ' + correct).show();
		$('#msg2').text('Incorrect Answers: ' + wrong).show();
		$('#msg3').text('Unanswers: ' + unanswered).show();

	setTimeout(playAgain, 5 * 1000);
	}

// play again
	function playAgain() {

		$('#startMsg h3').text("Want to try again? Click the 'Play Again' Button Below!");
		$('#start').text("Play Again!");

		$('#startMsg').show();

		$('#msg1').hide();
		$('#msg2').hide();
		$('#msg3').hide();
		$('#timer h4').hide();

		timer = 30;
		countdownMsg.hide();
	}