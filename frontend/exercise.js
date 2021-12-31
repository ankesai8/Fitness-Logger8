const workoutTypeSelect = document.querySelector("#type");

//types of exersise forms---
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const strengthForm = document.querySelector(".strength-form");
const flexabilityForm = document.querySelector(".flexability-form");

//CardioForm
const cardioNameInput = document.querySelector("#cardio-name");
const distanceInput = document.querySelector("#distance");
const durationInput = document.querySelector("#duration");

//ResistanceForm
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const resistanceDurationInput = document.querySelector("#resistance-duration");

//StrengthForm
const strengthNameInput = document.querySelector("#strength-name");
const weightsInput = document.querySelector("#weights");
const countInput = document.querySelector("#count");
const timeInput = document.querySelector("#time");

//FlexabilityForm
const strechInput = document.querySelector("#strech");
const nooftimesInput = document.querySelector("#nooftimes");

//Buttons
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");

const toast = document.querySelector("#toast");

const newWorkout = document.querySelector(".new-workout")

let workoutType = null;
let shouldNavigateAway = false;

async function initExercise() {
  let workout;

  if (location.search.split("=")[1] === undefined) {
    workout = await API.createWorkout()
    console.log(workout)
  }
  if (workout) {
    location.search = "?id=" + workout._id;
  }

}

initExercise();

function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
    strengthForm.classList.add("d-none");
    flexabilityForm.classList.add("d-none");
  } 
  else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
    strengthForm.classList.add("d-none");
    flexabilityForm.classList.add("d-none");
  }
   else if(workoutType === "strength") {
    strengthForm.classList.remove("d-none");
    flexabilityForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
    cardioForm.classList.add("d-none");
    
  }

  else if(workoutType === "flexability"){
    flexabilityForm.classList.remove("d-none");
    strengthForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
    cardioForm.classList.add("d-none");
}
  else{
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
    strengthForm.classList.add("d-none");
    flexabilityForm.classList.add("d-none");
  }

  validateInputs();
}

function validateInputs() {
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  }
  else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }
  else if (workoutType === "strength") {
      if (strengthNameInput.value.trim() === "") {
        isValid = false;
      }
  
      if (weightsInput.value.trim() === "") {
        isValid = false;
      }
  
      if (countInput.value.trim() === "") {
        isValid = false;
      }
      if (timeInput.value.trim() === "") {
        isValid = false;
      }
    }
      else if (workoutType === "flexability") {
        if (strechInput.value.trim() === "") {
          isValid = false;
        }
        if (nooftimesInput.value.trim() === "") {
          isValid = false;
        }
       }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  let workoutData = {};

  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
  } 
  else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }
  else if(workoutType === "strength") {
    workoutData.type = "strength";
    workoutData.name = strengthNameInput.value.trim();
    workoutData.count = Number(countInput.value.trim());
    workoutData.weights = Number(weightsInput.value.trim());
    workoutData.time = Number(timeInput.value.trim());
  } 
  else if(workoutType === "flexability") {
    workoutData.type = "flexability";
    workoutData.name = strechInput.value.trim();
    workoutData.nooftimes = Number(nooftimesInput.value.trim());
  }
 await API.addExercise(workoutData);
  clearInputs();
  toast.classList.add("success");
}

function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
}

if (workoutTypeSelect) {
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  addButton.addEventListener("click", handleFormSubmit);
}
toast.addEventListener("animationend", handleToastAnimationEnd);

document.querySelectorAll("input").forEach(element => element.addEventListener("input", validateInputs));
