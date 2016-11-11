/*will have function that iterates over an array of objects. each object has a q and a property.
starting game puts the q of the first array item on the screen with a time countdown from 30
and a form(?) with 4 possible answers. if the player gets the wrong answer, pause timer and replace
the content with some kinda image and text saying wrong answer, and give them the right answer. if 
player runs out of time, text saying out of time and the right answer. if the player gets the right answer,
pause timer and text saying correct.

iterate question and do it all again.

when there are no questions left, show results page. 'heres how you did', list answers right, wrong, and
unanswered.

start over button that DOESNT REFRESh PAGE. it just starts game again by setting question index to 
0 and running. */

var questions = [
	{	"q": "What color is the sky?",
		"a": "Blue",
	 	"possibles": ["Red", "Blue", "Green", "Yellow"],
	 	"imgRef": "assets/images/blueSky.jpg"},

	{	"q": "What color is the sky at night?",
		"a": "Black",
	 	"possibles": ["Red", "Blue", "Black", "Green"],
	 	"imgRef": "assets/images/blackSky.jpg"},

	{	"q": "What shape has 4 sides?",
		"a": "Square",
		"possibles": ["Circle", "Triangle", "Pentagon", "Square"],
		"imgRef": "assets/images/square.png"},

	{	"q": "Where do fish live?",
		"a": "Ocean",
		"possibles": ["Mountains", "Clouds", "Ocean", "Rocks"],
		"imgRef": "assets/images/fish.jpg"},

	{	"q": "What sound does a dog make?",
		"a": "Woof",
		"possibles": ["Woof", "Meow", "Moo", "Bzzz"],
		"imgRef": "assets/images/dog.jpg"}
];

var questionIndex = 0;
var correctAnswer; //will hold questions[questionIndex].a
var answerSelection;
var answersWrong = 0;
var answersCorrect = 0;
var answersTimedOut = 0;
var secondsRemaining = 30;
var counter;

function initGame() {
	$(".timer").hide();
	$(".question").hide();
	$(".answers").hide();
	$("#playAgainButton").hide();
	$(".possibleAnswers").html("");
}
function resetGame() {
	questionIndex = 0;
	answersCorrect = 0;
	answersWrong = 0;
	answersTimedOut = 0;
	secondsRemaining = 30;
	showQuestion();
}
function decrementTimer() {
	secondsRemaining--;
	$("#countdownNumber").html(secondsRemaining);
	if (secondsRemaining === 0) {
		questionTimeout();
	}
}
function userCorrect() {
	clearInterval(counter);
	$("#questionText").html("<h3>Correct!</h3>");
	$("#possibleAnswers").html("<img src="+questions[questionIndex].imgRef+">");
	questionIndex++;
	answersCorrect++;
	secondsRemaining = 30;
	setTimeout(showQuestion, 4000);
}
function userWrong() {
	clearInterval(counter);
	$("#questionText").html("<h3>Wrong! The correct answer was '" + correctAnswer + "'</h3>");
	$("#possibleAnswers").html("<img src="+questions[questionIndex].imgRef+">");
	questionIndex++;
	answersWrong++;
	secondsRemaining = 30;
	setTimeout(showQuestion, 4000);
}
//
function questionTimeout() {
	clearInterval(counter);
	$("#questionText").html("<h3>Time's up! The correct answer was '" + correctAnswer + "'</h3>");
	$("#possibleAnswers").html("<img src="+questions[questionIndex].imgRef+">");
	questionIndex++;
	answersTimedOut++;
	secondsRemaining = 30;
	setTimeout(showQuestion, 4000);
}
function endGame() {
	console.log("endGame was called");
	$(".timer").hide();
	$("#possibleAnswers").html("");
	$("#questionText").html("<h2>All done!</h2>");
	$("#possibleAnswers").append("<p>Correct Answers: " + answersCorrect + "</p>");
	$("#possibleAnswers").append("<p>Wrong Answers: " + answersWrong + "</p>");
	$("#possibleAnswers").append("<p>Questions Timed Out: " + answersTimedOut + "</p>");
	$("#playAgainButton").show();
}

function showQuestion() {
	if (questions[questionIndex] === undefined) {
		endGame();
	} else {
		$(".timer").show();
		$(".question").show();
		$(".answers").show();
		$("#countdownNumber").html(secondsRemaining);
		$("#possibleAnswers").html("");
		correctAnswer = questions[questionIndex].a;
		console.log("correct answer: " + correctAnswer);
		counter = setInterval(decrementTimer, 1000);
		$("#questionText").html(questions[questionIndex].q);
		for (var i = 0; i < questions[questionIndex].possibles.length; i++) {
			var newLi = document.createElement("li");
			$(newLi).attr("value", questions[questionIndex].possibles[i]);
			$(newLi).text(questions[questionIndex].possibles[i]);
			$("#possibleAnswers").append(newLi);
		}
		//add click event for li's
		$("li").on("click", function() {
			var userChoice = this.getAttribute("value");
			console.log(userChoice);

			if (userChoice === correctAnswer) {
				userCorrect();
			} else {
				userWrong();
			}
		})
	}
}

$("document").ready(function () {
	initGame();
	$("#startButton").on("click", function () {
		$("#startButton").hide();
		showQuestion();
	});
	$("#playAgainButton").on("click", function() {
		resetGame();
	});

})