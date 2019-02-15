function agree(){
	questions++;
	showQuestions();
}

function neither() {
	questions++;
	showQuestions();
}

function disagree(){
	questions++;
	showQuestions();
}

function showquestions(){
	document.getElementById("h1").innerHTML = subjects[questions].title;
	document.getElementById("p1").innerHTML = subjects[questions].statement;
}

function start(){
	document.getElementById("agreeButton").innerHTML = "Eens";
	document.getElementById("agreeButton").style.display="inline";
	document.getElementById("neitherButton").innerHTML = "Geen van beide";
	document.getElementById("neitherButton").style.display="inline";
	document.getElementById("disagreeButton").innerHTML = "Oneens";
	document.getElementById("disagreeButton").style.display="inline";
	document.getElementById("startButton").style.display="none";
	document.getElementById("h1").innerHTML = subjects[questions].title;
	document.getElementById("p1").innerHTML = subjects[questions].statement;
	questions = 0;
	document.getElementById("stemwijzer").style.display= "none";
	document.getElementById("p2").style.display= "none";
	document.getElementById("partijen").style.display= "inline";
	document.getElementById("backButton").style.display= "inline";
}

function back(){

	questions--;

	if (questions >= 0) {
		showquestions();
	}

	if (questions < 0) {
		document.getElementById("agreeButton").style.display="none";
		document.getElementById("neitherButton").style.display="none";
		document.getElementById("disagreeButton").style.display="none";
		document.getElementById("backButton").style.display="none";
		document.getElementById("startButton").style.display="inherit";
		document.getElementById("h1").innerHTML="Test uw politieke voorkeur aan de hand van 30 stellingen";
		document.getElementById("p1").innerHTML="";
	}

}