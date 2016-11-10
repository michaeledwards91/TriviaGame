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
	 	"possibles": ["red", "blue", "green", "yellow"]},

	{	"q": "What color is the sky at night?",
		"a": "Black",
	 	"possibles": ["red", "blue", "black", "green"]}
]

var questionIndex = 0;
var gotCorrectAnswer;
var answerSelection;
var answersWrong = 0;
var answersCorrect = 0;
var answersTimedOut = 0;
