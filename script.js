function agree(){
	document.getElementById("firstChoice").innerHTML = "Eens";
}

function neither() {
	
}

function disagree(){

}

function start(){
	document.getElementById("agreeButton").innerHTML = "Eens";
	document.getElementById("agreeButton").style.display="inline";
	document.getElementById("neitherButton").innerHTML = "Geen van beide";
	document.getElementById("neitherButton").style.display="inline";
	document.getElementById("disagreeButton").innerHTML = "Oneens";
	document.getElementById("disagreeButton").style.display="inline";
	document.getElementById("startButton").style.display="none";
}