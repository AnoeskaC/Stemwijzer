var parties = {};



function collectData()
{
		function reqListener () 
		{
			parties = JSON.parse(this.response);
			console.dir(parties);
	}

	var oReq = new XMLHttpRequest();
	oReq.addEventListener("load", reqListener);
	oReq.open("GET", "http://localhost/Stemwijzer/data.php");
	oReq.send();
}

collectData();


function agree()
{
	chosenAnswer[currentQuestion] = "pro";
	newCurrentQuestion();
}


function neither()
{
	chosenAnswer[currentQuestion] = "neither";
	newCurrentQuestion();
}


function disagree()
{
	chosenAnswer[currentQuestion] = "contra";
	newCurrentQuestion();
}


function newCurrentQuestion()
{
	if (currentQuestion < totalAmountOfQuestions) 
	{
		currentQuestion++;
		showQuestion();
	}
	else if (currentQuestion = totalAmountOfQuestions) 
	{
		currentQuestion++;
		showResults();
	}
}


function showQuestion()
{
	document.getElementById("h1").innerHTML = subjects[currentQuestion].title;
	document.getElementById("p1").innerHTML = subjects[currentQuestion].statement;
	showOpinions();
}


function showOpinions()
{

}


function previousQuestion()
{
	currentQuestion--;
	chosenAnswer[currentQuestion] = 0;

	if (currentQuestion <= totalAmountOfQuestions) 
	{
		if (currentQuestion < 0) 
		{
			document.getElementById("agreeButton").style.display="none";
			document.getElementById("neitherButton").style.display="none";
			document.getElementById("disagreeButton").style.display="none";
			document.getElementById("backButton").style.display="none";
			document.getElementById("partijenMeening").style.display="none";
			document.getElementById("startButton").style.display="inherit";
			document.getElementById("h1").innerHTML="Test uw politieke voorkeur aan de hand van 30 stellingen";
			document.getElementById("p1").innerHTML="";
		}
		else 
		{
			document.getElementById("agreeButton").style.display="inline";
			document.getElementById("neitherButton").style.display="inline";
			document.getElementById("disagreeButton").style.display="inline";
			document.getElementById("partijenMeening").style.display="inline";
			showQuestion();
		}
	}
}


function start()
{
	currentQuestion = 0;
	document.getElementById("agreeButton").style.display="inline";
	document.getElementById("neitherButton").style.display="inline";
	document.getElementById("disagreeButton").style.display="inline";
	document.getElementById("partijenMeening").style.display="inline";
	document.getElementById("backButton").style.display="inherit";
	document.getElementById("startButton").style.display="none";
	showQuestion()
}


function openPartyList()
{

}


function addPartyVotes()
{
	for (var subject = 0; subject < subjects.length; subject++) 
	{
		parties.push(subject) 
		parties[subject].howMuchAgreed = 0;
	}

	for (var subject = 0; subject < subjects.length; subject++) 
	{
		for (var subjectParty = 0; subjectParty < subjects[subject].parties.length; subjectParty++) 
		{
			if (subjects[subject].parties[subjectParty].position === chosenAnswer[subject]) 
				{	
					parties[subject].howMuchAgreed++;
				}
		}
	}
	parties.sort(function (a, b) 
	{
		return a.howMuchAgreed - b.howMuchAgreed;
	});
	parties.reverse();
}



var partiesOrdered = [];

var pushedPartyName;



function showResults(){
	addPartyVotes();
	
	document.getElementById("agreeButton").style.display="none";
	document.getElementById("neitherButton").style.display="none";
	document.getElementById("disagreeButton").style.display="none";
	document.getElementById("partijenMeening").style.display="none";
	document.getElementById("h1").innerHTML = "Hier zijn de resultaten van uw keuzes:";

	for (var partie = 0; partie < parties.length; partie++) 
	{
		var createTableSlide = document.createElement("tr");
		var createTableData = document.createElement("td");
		var createTableNumbers = document.createElement("td");

		createTableData.innerHTML = parties[partie].name;
		createTableNumbers.innerHTML = parties[partie].howMuchAgreed;
		document.getElementById("partyResults").appendChild(createTableSlide);
		createTableSlide.appendChild(createTableData);
		createTableSlide.appendChild(createTableNumbers);
		
	};
}
