var request = 0;
var answers = [];

function start() {
	document.getElementById("intro").style.display = "none";
	document.getElementById("questions").style.display = "initial";
	updateStatement();
};

function goToBackStatement() {
	if (request > 0) {
		request--;
		updateStatement();
	} else {
		document.getElementById("intro").style.display = "none";
		document.getElementById("questions").style.display = "none";
	}
}

function goToNextStatement(answer) {
	if (answers.length > request) {
		// If we're in here, you went back and we're going to replace the answer
		answers[request] = answer;
	} else {
		answers.push(answer);
	}

	request++;
	if (request < subjects.length) {
		updateStatement();
	} else {
		goToMultiplierSelection();
	}
};

function goToMultiSelection() {
	document.getElementById("questions").style.display = "none";
	document.getElementById("goToAfter").style.display = "initial";
	
	var multiplier = document.getElementById("goToSubjects");
	for (var i = 0; i < subjects.length; i++) {
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.name = "subject";
		checkbox.value = i;
		checkbox.id = "subject" + i;

		var createTextNode = document.createTextNode(subjects[i].title);

		var label = document.createElement('label')
		label.htmlFor = checkbox.id;
		label.appendChild(createTextNode);

		multiplier.appendChild(checkbox);
		multiplier.appendChild(label);
	}
}

function goToSettingSelection() {
	document.getElementById("goToAfter").style.display = "none";
	document.getElementById("complete").style.display = "initial";

	var multiplier = document.getElementById("completeSubjects");
	for (var i = 0; i < parties.length; i++) {
		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.checked = true;
		checkbox.name = "party";
		checkbox.value = parties[i].name;
		checkbox.id = "party" + i;

		var createTextNode = document.createTextNode(parties[i].name);

		var label = document.createElement('label')
		label.htmlFor = checkbox.id;
		label.appendChild(createTextNode);

		multiplier.appendChild(checkbox);
		multiplier.appendChild(label);
	}
}

var partySelectionType = {
	DeselectAll: 0,
	SelectAll: 1,
	SelectSeatedOnly: 2,
	SelectSecularOnly: 3
};

function getAllParties(selectionType) {
	var partyCheckboxes = document.getElementsByName("party");
	for (var i = 0; i < partyCheckboxes.length; i++) {
		if (selectionType == partySelectionType.DeselectAll) {
			partyCheckboxes[i].checked = false;
		} else if (selectionType == partySelectionType.SelectAll) {
			partyCheckboxes[i].checked = true;
		} else if (selectionType == partySelectionType.SelectSeatedOnly) {
			partyCheckboxes[i].checked = parties[i].size > 0;
		} else if (selectionType == partySelectionType.SelectSecularOnly) {
			partyCheckboxes[i].checked = parties[i].secular;
		}
	}
}

function finish() {
	document.getElementById("complete").style.display = "none";
	document.getElementById("result").style.display = "initial";

	var multiplierSubjects = document.getElementsByName("subject");

	for (var i = 0; i < answers.length; i++) {
		var answer = answers[i];
		var subject = subjects[i];

		for (var y = 0; y < subject.parties.length; y++) {
			var party = subject.parties[y];

			if (party.position == answer) {

				var scoredParty = parties.find(function(element) {
					return element.name == party.name;
				});

				scoredParty.score++;

				//if multiplier checkbox is checked, give extra point to all corresponding parties.
				if (multiplierSubjects[i].checked) {
					scoredParty.score++;
				}
			}
		}
	}


	parties.sort(function(a, b) {
		return b.score - a.score;
	});

	var partyCheckboxes = document.getElementsByName("party");
	for (var i = 0; i < parties.length; i++) {
		var partyCheckbox;
		// For loop om partycheckbox te zoeken obv partij naam
		for (var p = 0; p < partyCheckboxes.length; p++) {
			if (partyCheckboxes[p].value == parties[i].name) {
				partyCheckbox = partyCheckboxes[p];
				break;
			}
		}
		if (!partyCheckbox.checked) {
			continue;
		}

		var resultsList = document.createElement("li");
		var percentage = Math.round(parties[i].score * 100 / subjects.length);
		var resultsListNode = document.createTextNode(parties[i].name + ": " +
			percentage + "%");
		resultsList.appendChild(resultsListNode);

		document.getElementById("result-content").appendChild(resultsList);
	}
};

//Change title, statement and party positions for new subject.

function updateStatement() {

	//background colour for last answer

	document.getElementById("proButton").classList.remove("selected");
	document.getElementById("ambivalentButton").classList.remove("selected");
	document.getElementById("contraButton").classList.remove("selected");

	if (answers.length > currentSubjectNr) {

		// Als we hier zijn zitten we in een vraag die we al eerder hebben beantwoord
		// Toon dus de keuze van die vraag

		var currentAnswer = answers[currentSubjectNr];
		if (currentAnswer == "pro") {
			document.getElementById("proButton").classList.add("selected");
		}
		if (currentAnswer == "ambivalent") {
			document.getElementById("ambivalentButton").classList.add("selected");
		}
		if (currentAnswer == "contra") {
			document.getElementById("contraButton").classList.add("selected");
		}
	}

	//party position variables
	var subject = subjects[currentSubjectNr];
	var pro = document.getElementById("adviceAgreeList");
	var ambivalent = document.getElementById("adviceNeitherList");
	var contra = document.getElementById("adviceDisagreeList");

	//Overwrite statements.
	var title = document.getElementById("question-title");
	title.innerHTML = (currentSubjectNr + 1) + ". " + subject.title;

	var statement = document.getElementById("question-description");
	statement.innerHTML = subject.statement;

	pro.innerHTML = "";
	ambivalent.innerHTML = "";
	contra.innerHTML = "";

	//Get parties' opinions on current subject and place them in corresponding div.
	for (var i = 0; i < subject.parties.length; i++) {
		var party = subject.parties[i];

		var summary = document.createElement("summary");
		var summaryNode = document.createTextNode(party.name);
		summary.appendChild(summaryNode);

		var explanation = document.createElement("p");
		var explanationNode = document.createTextNode(party.explanation);
		explanation.appendChild(explanationNode);

		var details = document.createElement("details");
		details.appendChild(summary);
		details.appendChild(explanation);

		if (party.position === "pro") {
			pro.appendChild(details);
		} else if (party.position === "ambivalent") {
			ambivalent.appendChild(details);
		} else if (party.position === "contra") {
			contra.appendChild(details);
		}
	}
};
