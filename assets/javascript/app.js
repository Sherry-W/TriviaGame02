
// trivia questions
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
		},
		{
		  question: "Cashmere is the wool from which kind of animal?",
		  answers: ["Sheep", "Camel", "Goat", "Llama"],
		  correct_answers: "Goat",
			image:"assets/images/q_six.jpg"
		},
		{
		  question: "What is Grumpy Cat's real name?",
		  answers: ["Sauce", "Tardar Sauce", "Minnie", "Broccoli"],
		  correct_answers: "Tardar Sauce",
		  image:"assets/images/q_seven.jpg"
		},
		{
		  question: "What is the fastest animal?",
		  answers: ["Peregrine Falcon", "Golden Eagle", "Cheetah", "Horsefly"],
		  correct_answers: "Peregrine Falcon",
		  image:"assets/images/q_eight.jpg"
		},
		{
		  question: "What is the scientific name for the 'Polar Bear'?",
		  answers: ["Polar Bear", "Ursus Maritimus", "Ursus Spelaeus", "Ursus Arctos"],
		  correct_answers: "Ursus Maritimus",
	 	  image:"assets/images/q_nine.jpg"
		},
		{
		  question: "Which animal was part of an Russian domestication experiment in 1959?",
		  answers: ["Pigeons", "Foxes", "Bears", "Alligators"],
		  correct_answers: "Foxes",
	 	  image:"assets/images/q_ten.png"
		},
		{
		  question: "What dog bread is one of the oldest breeds of dog and has flourished since before 400 BCE.",
		  answers: ["Bulldogs", "Boxers", "Pugs", "Chihuahua"],
		  correct_answers: "Pugs",
		  image:"assets/images/q_eleven.jpg"
		},
		{
		  question: "Hippocampus is the Latin name for which marine creature?",
		  answers: ["Dolphin", "Whale", "Octopus", "Seahorse"],
		  correct_answers: "Seahorse",
	 	  image:"assets/images/q_12.jpg"
		},
		{
		  question: "What is the scientific name of the cheetah?",
		  answers: ["Acinonyx jubatus", "Panthera onca", "Lynx rufus", "Felis catus"],
		  correct_answers: "Acinonyx jubatus",
	   	  image:"assets/images/q_13.jpg"
		},
		{
		  question: "What was the name of the Ethiopian Wolf before they knew it was related to wolves?",
		  answers: ["Ethiopian Coyote", "Amharic Fox", "Canis Simiensis", "Simien Jackel"],
		  correct_answers: "Simien Jackel",
	 	  image:"assets/images/q_14.jpg"
		},
		{
		  question: "Which species of Brown Bear is not extinct?",
		  answers: ["California Grizzly Bear", "Syrian Brown Bear", "Atlas Bear", "Mexican Grizzly Bear"],
		  correct_answers: "Syrian Brown Bear",
	 	  image:"assets/images/q_15.jpg"
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

// stop timer when question answered/clicked
	function stop() {
		clearInterval(countdown);
	}

//loop through to generate the questions and answer
	function showing() {	
		if (quesIndex == questions.length) {
			score();
		}

	//append question
		ques = $("<h3>").text(questions[quesIndex].question);
		$('#questions').append(ques);

	//randomize the choices and append them
		choice = questions[quesIndex].answers;
		choice = choice.sort(function(a, b){return 0.5 - Math.random()});

		for (var j = 0; j < choice.length; j++) { 

			multChoice = $('<p>').html(choice[j]);
			// console.log(choice[j]);
			$('#questions').append(multChoice);
		}
	}

//this helps to show the next question
	function next() {
		quesIndex++;
		$('#questions').text("");

		showing();
		timer = 30;
		$('#timer').text("Time Remaining: " + timer + " Seconds");
		countdown = setInterval(start, 1000);
	}

//when user clicks on an answer (the p tag)
	$(document).on('click', 'p', function() {
		stop();
		$('#timer').text("Time Remaining: " + timer + " Seconds");

		if ($(this).text() == questions[quesIndex].correct_answers) {
			correct++;
			$('#questions').html("<h3>Correct!</h3>");
			
		}else if ($(this).text() !== questions[quesIndex].correct_answers && $(this).text() !== "") {
			wrong++;
			$('#questions').html("<h3>Nope!</h3><h4>The Correct Answer was: " + questions[quesIndex].correct_answers + "</h4>");
		}
		$('#questions').append('<img src="' + questions[quesIndex].image + '" />');

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

		var msg = $('<h4>').text('All done, heres how you did!');
		$('#timer').append(msg);

		$('#msg1').text('Correct Answers: ' + correct).show();
		$('#msg2').text('Incorrect Answers: ' + wrong).show();
		$('#msg3').text('Unanswered: ' + unanswered).show();

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