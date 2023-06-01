var sessions = [];


function addSession () { 
    var session = document.getElementById("add_info");
    if (session.style.display === "none") {
        session.style.display = "block";
            
    }else{
        session.style.display = "none";
    }
}

function addExercise () {
    var exercise = document.getElementById("exercise_info");

    var exercise_name = document.createElement("input");
    exercise_name.type = "text";
    exercise_name.placeholder = "Exercise Name";

    var exercise_weight = document.createElement("input");
    exercise_weight.type = "number";
    exercise_weight.placeholder = "Weight(kgs)";

    var exercise_num = document.createElement("input");
    exercise_num.type = "number";
    exercise_num.placeholder = "Number of Sets/Reps";

    var exercise_item = document.createElement("li");
    exercise_item.appendChild(exercise_name);
    exercise_item.appendChild(exercise_weight);
    exercise_item.appendChild(exercise_num);

    exercise.appendChild(exercise_item);

    exercise.style.display = "block";

}

function clearFields () { 
  document.getElementById("session_name").value = "";
  document.getElementById("session_date").value = "";

  var exerciseInfo = document.getElementById("exercise_info");
  exerciseInfo.innerHTML = "";
}


function saveSession () {
//This fuction will save the session to the database

var sessionName = document.getElementById("session_name").value;
var sessionDate = document.getElementById("session_date").value;
//Stores the session name and date

var exercises = []; // Array to store exercises for the session

var exerciseElements = document.getElementById("exercise_info").getElementsByTagName("li");

for (var i = 0; i < exerciseElements.length; i++) {
    var exerciseInputs = exerciseElements[i].getElementsByTagName("input");

    var exerciseName = exerciseInputs[0].value;
    var exerciseWeight = exerciseInputs[1].value;
    var exerciseNum = exerciseInputs[2].values;

    var exerciseData = {
        name: exerciseName,
        weight: exerciseWeight,
        num: exerciseNum
      };

    exercises.push(exerciseData);
}
var sessionData = {
    name: sessionName,
    date: sessionDate,
    exercises: exercises
  };

sessions.push(sessionData);

clearFields();

var session = document.getElementById("add_info");
session.style.display = "none";

//this makes the add session form disappear after the session is saved



  // Optional: Clear the input fields or perform any other necessary operations

  console.log(sessionData); // Log all saved sessions

    displaySessions();

}

function displaySessions () {
    var sessionsList = document.getElementById("sessions_list");

    for (var i = 0; i < sessions.length; i++) {
        var session = sessions[i];

        var sessionDiv = document.createElement("div");
        sessionDiv.classList.add ("session-item");

        var sessionName = document.createElement("h3");
        sessionName.innerHTML = session.name;

        var sessionDate = document.createElement("p");
        sessionDate.innerHTML = session.date;

        var sessionDelete = document.createElement("button");

        sessionDiv.appendChild(sessionName);
        sessionDiv.appendChild(sessionDate);
        sessionDiv.appendChild(sessionDelete);

        sessionsList.appendChild(sessionDiv);
    }
}