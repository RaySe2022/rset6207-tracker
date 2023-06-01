var sessions = [];

// Function to toggle the display of the add session form
function addSession() {
  var session = document.getElementById("add_info");
  if (session.style.display === "none") {
    session.style.display = "block";
  } else {
    session.style.display = "none";
  }
}

// Function to add an exercise to the session
function addExercise() {
  var exercise = document.getElementById("exercise_info");

  // Create input fields for exercise name, weight, and number of sets/reps
  var exercise_name = document.createElement("input");
  exercise_name.type = "text";
  exercise_name.placeholder = "Exercise Name";

  var exercise_weight = document.createElement("input");
  exercise_weight.type = "number";
  exercise_weight.placeholder = "Weight(kgs)";

  var exercise_num = document.createElement("input");
  exercise_num.type = "number";
  exercise_num.placeholder = "Number of Sets/Reps";

  // Create a list item to hold the exercise inputs
  var exercise_item = document.createElement("li");
  exercise_item.appendChild(exercise_name);
  exercise_item.appendChild(exercise_weight);
  exercise_item.appendChild(exercise_num);

  // Append the exercise item to the exercise list
  exercise.appendChild(exercise_item);

  exercise.style.display = "block";
}

// Function to clear the input fields
function clearFields() {
  document.getElementById("session_name").value = "";
  document.getElementById("session_date").value = "";

  var exerciseInfo = document.getElementById("exercise_info");
  exerciseInfo.innerHTML = "";
}

// Function to save the session data
function saveSession() {
  var sessionName = document.getElementById("session_name").value;
  var sessionDate = document.getElementById("session_date").value;

  var exercises = [];

  var exerciseElements = document.getElementById("exercise_info").getElementsByTagName("li");

  for (var i = 0; i < exerciseElements.length; i++) {
    var exerciseInputs = exerciseElements[i].getElementsByTagName("input");

    var exerciseName = exerciseInputs[0].value;
    var exerciseWeight = exerciseInputs[1].value;
    var exerciseNum = exerciseInputs[2].value;

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

  displaySessions();

  clearFields();

  var session = document.getElementById("add_info");
  session.style.display = "none";

  console.log(sessionData); // Log all saved sessions
}

// Function to display the sessions
function displaySessions() {
  var sessionsList = document.getElementById("sessions_list");
  sessionsList.innerHTML = "";

  for (var i = 0; i < sessions.length; i++) {
    var session = sessions[i];

    var sessionDiv = document.createElement("div");
    sessionDiv.classList.add("session-item");

    var sessionNum = document.createElement("p");
    sessionNum.classList.add("session-num");
    sessionNum.innerHTML = "Session " + (i + 1);

    var sessionName = document.createElement("h3");
    sessionName.innerHTML = session.name;

    var sessionDelete = document.createElement("button");
    sessionDelete.innerHTML = "Delete";
    sessionDelete.addEventListener("click", createDeleteHandler(i));

    var sessionDate = document.createElement("p");
    sessionDate.innerHTML = session.date;

    var exerciseList = document.createElement("ul");
    exerciseList.classList.add("hidden");


    for (var j = 0; j < session.exercises.length; j++) {
      var exerciseData = session.exercises[j];

      var exerciseItem = document.createElement("li");
      var exerciseName = document.createElement("p");
      exerciseName.innerHTML = exerciseData.name;
      var exerciseWeight = document.createElement("p");
      exerciseWeight.innerHTML = exerciseData.weight;
      var exerciseNum = document.createElement("p");
      exerciseNum.innerHTML = exerciseData.num;

    
      exerciseItem.appendChild(exerciseName);
      exerciseItem.appendChild(exerciseWeight);
      exerciseItem.appendChild(exerciseNum);
      exerciseList.appendChild(exerciseItem);
    }

    sessionDiv.appendChild(sessionNum);
    sessionDiv.appendChild(sessionName);
    sessionDiv.appendChild(sessionDate);
    sessionDiv.appendChild(exerciseList);
    sessionDiv.appendChild(sessionDelete);

    sessionDiv.addEventListener("click", createExpandHandler(sessionDiv));

    sessionsList.appendChild(sessionDiv);
  }
}

// Function to create a delete handler for a session
function createDeleteHandler(index) {
  return function () {
    sessions.splice(index, 1);
    displaySessions();
  };
}

// Function to create an expand handler for a session
function createExpandHandler(sessionDiv) {
  return function () {
    var exerciseList = sessionDiv.querySelector("ul");
    exerciseList.classList.toggle("hidden");
  };
}
