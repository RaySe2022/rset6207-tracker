var sessions = [];

// Function to toggle the display of the add session form
function addSession() {
  var session = document.getElementById("add_info");
  if (session.style.display === "none") {
    session.style.display = "flex";
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
  var sessionPerf = document.getElementById("session_perf").value;

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
    exercises: exercises,
    performance: sessionPerf,
  };

  sessionData.emoji = getEmoji(sessionPerf);

  sessions.push(sessionData);
  localStorage.setItem("sessions", JSON.stringify(sessions));


  displaySessions();
  updateSessionCount();
  updatePrePerformance();
  displaySessionPerformance();

  clearFields();

  var session = document.getElementById("add_info");
  session.style.display = "none";

  console.log(sessionData); // Log all saved sessions
}

function retrieveSessions() {
  var storedSessions = localStorage.getItem("sessions");
  if (storedSessions) {
    sessions = JSON.parse(storedSessions);
    displaySessions();
    updateSessionCount();
    updatePrePerformance();
    displaySessionPerformance();
  }
}

window.addEventListener("load", retrieveSessions);

function getEmoji(performance) {
  if (performance === 'Average') {
    return '&#128515;'; // Smiley face emoji
  } else if (performance === 'Poor') {
    return '&#128517;'; // Frowning face emoji
  } else if (performance === 'Good') {
    return '&#128513;'; // Grinning face emoji
  } else {
    return ''; // Default empty string if performance is not recognized
  }
}

// Function to display the sessions
function displaySessions() {
  var sessionsList = document.getElementById("sessions_list");
  sessionsList.innerHTML = "";

  for (var i = 0; i < sessions.length; i++) {
    var session = sessions[i];

    var sessionDiv = document.createElement("div");
    sessionDiv.classList.add("session-item", "session-div-hover");

    var sessionInfoDiv = document.createElement("div"); // Div to hold sessionNum, sessionName, sessionDate, and sessionPerf
    sessionInfoDiv.classList.add("session-info");

    var sessionNum = document.createElement("p");
    sessionNum.classList.add("session-num");
    sessionNum.innerHTML = "Session " + (i + 1);

    var sessionName = document.createElement("h3");
    sessionName.innerHTML = session.name;

    var sessionDate = document.createElement("p");
    sessionDate.innerHTML = session.date;

    var sessionPerf = document.createElement("span");
    sessionPerf.innerHTML = session.performance + "" + session.emoji;

    sessionInfoDiv.appendChild(sessionNum);
    sessionInfoDiv.appendChild(sessionName);
    sessionInfoDiv.appendChild(sessionDate);
    sessionInfoDiv.appendChild(sessionPerf);

    var sessionDelete = document.createElement("div"); // Div to hold sessionDelete button
    sessionDelete.classList.add("session-delete");

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", createDeleteHandler(i));

    sessionDelete.appendChild(deleteButton);

    var exerciseList = document.createElement("div"); // Div to hold exerciseList
    exerciseList.classList.add("exercise-list");

    for (var j = 0; j < session.exercises.length; j++) {
      var exerciseData = session.exercises[j];

      var exerciseItem = document.createElement("li");
      var exerciseName = document.createElement("p");
      exerciseName.innerHTML = exerciseData.name;
      var exerciseWeight = document.createElement("p");
      exerciseWeight.innerHTML = exerciseData.weight + "kgs";
      var exerciseNum = document.createElement("p");
      exerciseNum.innerHTML = "Sets/Reps:" + " " + exerciseData.num;

      exerciseItem.appendChild(exerciseName);
      exerciseItem.appendChild(exerciseWeight);
      exerciseItem.appendChild(exerciseNum);
      exerciseList.appendChild(exerciseItem);
    }

    sessionDiv.appendChild(sessionInfoDiv);
    sessionDiv.appendChild(sessionDelete);
    sessionDiv.appendChild(exerciseList);

    sessionDiv.addEventListener("click", createExpandHandler(sessionDiv));

    sessionsList.appendChild(sessionDiv);
  }
}

// Function to create a delete handler for a session
function createDeleteHandler(index) {
  return function () {
    sessions.splice(index, 1);
    displaySessions();
    updateSessionCount();
    updatePrePerformance();
    displaySessionPerformance();
  };
}

// Function to create an expand handler for a session
function createExpandHandler(sessionDiv) {
  return function () {
    var exerciseList = sessionDiv.querySelector("div.exercise-list");
    if (exerciseList.style.display ==="none") {
      exerciseList.style.display="flex";
    } else {
      exerciseList.style.display="none";
    }
  };
}

// To display Num of sessions 
function updateSessionCount() {
  var sessionsList = document.getElementById("sessions_list");
  var numSessions = sessionsList.children.length;

  var numSessionsElement = document.getElementById("num_of_sess");
  numSessionsElement.innerHTML = numSessions;
}

// To update the previous performance
function updatePrePerformance() {
  var latestSessionIndex = sessions.length - 1;
  if (latestSessionIndex >= 0) {
    var latestSessionPerf = sessions[latestSessionIndex].performance;
    var latestSessionEmoji = sessions[latestSessionIndex].emoji;

    var prePerfElement = document.getElementById("pre_perf");
    prePerfElement.innerHTML = ""; // Clear the previous content

    var perfSpan = document.createElement("span");
    perfSpan.innerHTML = latestSessionPerf;

    var emojiSpan = document.createElement("span");
    emojiSpan.innerHTML = latestSessionEmoji;

    prePerfElement.appendChild(perfSpan);
    prePerfElement.appendChild(emojiSpan);
  }
}

// To display session performance
function displaySessionPerformance() {
  var performanceContainer = document.querySelector(".performance_container");
  performanceContainer.innerHTML = ""; // Clear the container before populating it again

  for (var i = 0; i < sessions.length; i++) {
    var session = sessions[i];

    var sessionDiv = document.createElement("div");
    sessionDiv.classList.add("session-performance");

    var sessionDate = document.createElement("p");
    sessionDate.innerHTML = session.date;

    var sessionPerf = document.createElement("p");
    sessionPerf.innerHTML = session.performance;

    var sessionEmoji = document.createElement("span");
    sessionEmoji.innerHTML = session.emoji;

    sessionDiv.appendChild(sessionDate);
    sessionDiv.appendChild(sessionPerf);
    sessionDiv.appendChild(sessionEmoji);
    performanceContainer.appendChild(sessionDiv);
  }
}
function updateDate() {
  let today = new Date();

  // return number
  let dayName = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // value -> ID of the html element
  const IDCollection = ["day", "daynum", "month", "year"];
  // return value array with number as a index
  const val = [dayWeek[dayName], dayNum, months[month], year];
  for (let i = 0; i < IDCollection.length; i++) {
    document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
  }
}
// Update the date when the page loads
updateDate();

// Add an event listener to the "Add Session" button

