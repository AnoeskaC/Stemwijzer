function eens() {
	antwoord[questions] = "pro";
	volgendeQuestion();
	showQuestions();
}

function geenVanBeide() {
	volgendeQuestion();
	showQuestions();
}

function oneens() {
	antwoord[questions] = "contra";
	volgendeQuestion();
	showQuestions();
}

function showQuestions() {
	document.getElementById("h1").innerHTML = subjects[questions].title;
	document.getElementById("p1").innerHTML = subjects[questions].statement;
}

function volgendeQuestion() {
	if (questions < alleVragen) {
		questions++;
	}
}

function start() {
	questions = 0;
	document.getElementById("eensButton").innerHTML = "Eens";
	document.getElementById("eensButton").style.display="inline";
	document.getElementById("geenVanBeideButton").innerHTML = "Geen van beide";
	document.getElementById("geenVanBeideButton").style.display="inline";
	document.getElementById("oneensButton").innerHTML = "Oneens";
	document.getElementById("oneensButton").style.display="inline";
	document.getElementById("startButton").style.display="none";
	document.getElementById("stemwijzer").style.display= "none";
	document.getElementById("p2").style.display= "none";
	document.getElementById("partijen").style.display= "inline";
	document.getElementById("backButton").style.display= "inline";
	showQuestions()
}

function back() {

	questions--;

	if (questions >= 0) {
		showQuestions();
	}

	if (questions < 0) {
		document.getElementById("eensButton").style.display="none";
		document.getElementById("geenVanBeideButton").style.display="none";
		document.getElementById("oneensButton").style.display="none";
		document.getElementById("backButton").style.display="none";
		document.getElementById("startButton").style.display="inherit";
		document.getElementById("h1").innerHTML="Test uw politieke voorkeur aan de hand van 30 stellingen";
		document.getElementById("p1").innerHTML="";
	}

}
