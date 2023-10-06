// Get references to HTML elements
const form = document.querySelector('form');
const dayInput = document.getElementById("day-input");
const monthInput = document.getElementById("month-input");
const yearInput = document.getElementById("year-input");
const submitButton = document.querySelector(".submit-btn");
const yearId = document.getElementById("year-id");
const monthId = document.getElementById("month-id");
const dayId = document.getElementById("day-id");
const formDateDivs = document.querySelectorAll(".form-date");

// Add an event listener to the submit button
submitButton.addEventListener("click", function () {
  // Remove any existing error messages and "error" classes
  formDateDivs.forEach(formDate => {
    const errorSmall = formDate.querySelector("small");
    if (errorSmall) {
      formDate.removeChild(errorSmall);
    }
    formDate.classList.remove("error");
    form.classList.remove('expand')
  });

  // Get the current date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-based
  const currentDay = currentDate.getDate();

  // Get user input values
  const userDay = parseInt(dayInput.value);
  const userMonth = parseInt(monthInput.value);
  const userYear = parseInt(yearInput.value);

  // Validate user input
  if (isNaN(userDay) || isNaN(userMonth) || isNaN(userYear)) {
    // Display error message for empty fields
    formDateDivs.forEach(formDate => {
      if (isNaN(userDay) && formDate === formDateDivs[0]) {
        displayError(formDate, "This field is required");
        form.classList.add('expand');
      }
      if (isNaN(userMonth) && formDate === formDateDivs[1]) {
        displayError(formDate, "This field is required");
        form.classList.add('expand');
      }
      if (isNaN(userYear) && formDate === formDateDivs[2]) {
        displayError(formDate, "This field is required");
        form.classList.add('expand');
      }
    });
    return;
  }

  if (userDay < 1 || userDay > 31) {
    // Display error message for day input
    displayError(formDateDivs[0], "Must be a valid day");
    return;
  }

  if (userMonth < 1 || userMonth > 12) {
    // Display error message for month input
    displayError(formDateDivs[1], "Must be a valid month");
    form.classList.add('expand');
    return;
  }

  if (userYear > currentYear) {
    // Display error message for year input
    displayError(formDateDivs[2], "Must be in the past");
    form.classList.add('expand');
    return;
  }

  // Check for invalid date (e.g., 31/04/1991)
  if (userDay > daysInMonth(userYear, userMonth)) {
    displayError(formDateDivs[0], "Invalid date for the month");
    form.classList.add('expand');
    return;
  }

  // Calculate differences
  const yearDiff = currentYear - userYear;
  const monthDiff = currentMonth - userMonth;
  const dayDiff = currentDay - userDay;

  // Update the result section
  yearId.textContent = yearDiff;
  monthId.textContent = monthDiff
  dayId.textContent = dayDiff;
});

// Helper function to display error messages and apply "error" class
function displayError(formDate, errorMessage) {
  const errorSmall = document.createElement("small");
  errorSmall.textContent = errorMessage;
  formDate.appendChild(errorSmall);
  formDate.classList.add("error");
}

// Helper function to get the number of days in a month
function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

