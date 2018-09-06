var triviaQuestions = [{
	question: "What color was Napoleon's white horse?",
	answerList: ["striped", "magenta", "white", "brown"],
	answer: 2
},{
	question: "Who is buried in President Grant's tomb?",
	answerList: ["George Washington", "Ulysses S. Grant", "Abraham Lincoln", "Thomas Jefferson"],
	answer: 1
},{
	question: "Which is heavier: a pound of feathers, a pound of diamonds, or a pound of steel?",
	answerList: ["feathers", "steel", "diamonds", "they all weigh the same"],
	answer: 3
},{
	question: "How much wood could a woodchuck chuck if a woodchuck could chuck wood?",
	answerList: ["8lbs", "10lbs", "huh", "need a time frame first"],
	answer: 3
},{
	question: "If your plane crashes on the border between the U.S. and Canada, where will the survivors be buried?",
	answerList: ["The U.S.", "Canada", "On the border", "None of the above"],
  answer: 3
},{
	question: "What is the airspeed velocity of an unladen swallow?",
	answerList: ["3 knots", "5 knots", "What do you mean, African or European?", "88mph"],
	answer: 2
},{
	question: "These questions are getting silly...",
	answerList: ["Maybe it was something you ate", "You went down this path, I have no sympathy", "It was definitely something you ate", "You're tired, get some rest"],
	answer: 1
},{
	question: "Which came first, the chicken or the egg?",
	answerList: ["The egg", "The chicken", "sigh", "88mph"],
	answer: 2
},{
	question: "No seriously, which came first?",
	answerList: ["The egg, because eggs grow up into chickens", "The chicken, because eggs come from chickens", "Sigh, if you keep scraping this barrel for these questions, you'll hit dirt ", "88mph, time travel will allow us to return to the time when the first bird we would still describe as a chicken was born. Looking at the mother of this chicken, we would then be able to ask ourselves if its parent could not also be viewed as a chicken, leading to a reevaluation of our conception of chicken-ness.  Further, if upon reconsideration, we found this mother of chickens was born with fewer chicken characteristics than those which surfaced over time, i.e. she became a chicken over time, then we would know the answer is 'chicken', otherwise, 'egg'. "],
	answer: 2
},{
	question: "Wait, are you hypothesizing that there may have been a humanoid who was born not human, by our standard definitions of human-ness, but became human over time, and then gave birth to humans who were born humans?",
	answerList: ["Ummmm", "The Chicken", "Dude, just stop", "No, that is blasphemy. Humans came from God, didn't you read Genesis"],
  answer: 2
},{
	question: "Ok then, did Eve have a navel?",
	answerList: ["Ummmm", "The Egg?", "Please, Please! stop", "What does that have to do with anything?"],
	answer: 2
},{
	question: "Well, let's say we define human-ness as requiring all of the characteristic body parts humans have today, navel included. If Eve was not in a womb, then she didn't have a navel which would have been connected to the umbilical chord she didn't have.  She and Adam then, were less human than we are, while their children did have navels, and so would have been the actual first human-humans?",
	answerList: ["Ummmm", "You lost me", "Go back to the dumb questions please!", "Heathen, don't mock the good book with your witchcraft."],
	answer: 2
},{
	question: "Ok, ok, back to serious questions. Why do I only see my twin when I go in rooms with shiny metal in them?",
	answerList: ["The radiation", "That is a mirror, you don't have a twin", "Your house is full of holes in the space-time continuum", "I guess this is better"],
	answer: 1
},{
	question: "What do you get when you cross a snow man with a vampire?",
	answerList: ["I was wrong; it's not better. No more!", "Count icecula", "Ice-feratu", "Frost-bite"],
	answer: 0
},{
  question: "So you want me to stop then?",
	answerList: ["Yes", "No", "YES!", "Oh please let it end!"],
	answer: 3
}];

var questionArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var bestAnswer; var notbestAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	best: "Best Answer!",
	notbest: "Ehhh... there was a better answer.",
	endTime: "Too Slow!",
	finished: "So how'd you do?."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#bestAnswers').empty();
	$('#notbestAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	bestAnswer = 0;
	notbestAnswer = 0;
	unanswered = 0;
	newQuestion();
}
function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#eyes').empty();
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	
	time = setInterval(showCountdown, 1000);
}
function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#eyes').html('<img src = "assets/images/crazyeyes.jpg" width = "400px">');
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		bestAnswer++;
		$('#message').html(messages.best);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		notbestAnswer++;
		$('#message').html(messages.notbest);
		$('#correctedAnswer').html('The best answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The best answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}
function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#eyes').empty();

	$('#finalMessage').html(messages.finished);
	$('#bestAnswers').html("Best Answers: " + bestAnswer);
	$('#notbestAnswers').html("Could Have Been Better Answers: " + notbestAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}