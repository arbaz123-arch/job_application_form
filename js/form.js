document.addEventListener("DOMContentLoaded", () => {

  // ---------- ELEMENTS ----------
  const form = document.getElementById("multiStepForm");
  const steps = document.querySelectorAll(".form-step");
  const progressBar = document.querySelector(".progress");

  let currentStep = 0;

  // ---------- INITIAL SETUP ----------
  steps.forEach(step => step.classList.remove("active"));
  steps[currentStep].classList.add("active");
  updateProgress();


  // ---------- BUTTON EVENTS ----------
  // Next Buttons
  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.setAttribute("type", "button"); // IMPORTANT FIX
    btn.addEventListener("click", nextStep);
  });

  // Previous Buttons
  document.querySelectorAll(".prev-btn").forEach(btn => {
    btn.setAttribute("type", "button"); // IMPORTANT FIX
    btn.addEventListener("click", prevStep);
  });


  // ---------- STEP FUNCTIONS ----------
  function nextStep() {

    if (!validateStep(currentStep)) return;   // Validation check

    steps[currentStep].classList.remove("active");
    currentStep++;

    if (currentStep >= steps.length) {
      currentStep = steps.length - 1;
    }

    steps[currentStep].classList.add("active");
    updateProgress();

    if (currentStep === steps.length - 1) {
      fillReview();
    }
  }

  function prevStep() {
    steps[currentStep].classList.remove("active");
    currentStep--;

    if (currentStep < 0) currentStep = 0;

    steps[currentStep].classList.add("active");
    updateProgress();
  }


  // ---------- PROGRESS BAR ----------
  function updateProgress() {
    let percentage = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = percentage + "%";
  }


  // ---------- VALIDATION ----------
  function validateStep(stepIndex) {

    // STEP 1 VALIDATION
    if (stepIndex === 0) {
      let name = document.getElementById("fullName");
      let email = document.getElementById("email");
      let phone = document.getElementById("phone");

      if (isEmpty(name.value)) {
        alert("Full Name is required");
        return false;
      }

      if (!isValidEmail(email.value)) {
        alert("Invalid Email");
        return false;
      }

      if (isEmpty(phone.value)) {
        alert("Phone is required");
        return false;
      }
    }

    // STEP 2 VALIDATION
    if (stepIndex === 1) {
      let q = document.getElementById("qualification");
      let y = document.getElementById("passingYear");

      if (isEmpty(q.value) || isEmpty(y.value)) {
        alert("All fields required in Education step");
        return false;
      }
    }

    // STEP 3 VALIDATION
    if (stepIndex === 2) {
      let exp = document.getElementById("experience");
      let comp = document.getElementById("company");

      if (isEmpty(exp.value) || isEmpty(comp.value)) {
        alert("Experience details are required");
        return false;
      }
    }

    return true;
  }


  // ---------- AUTO SAVE TO LOCALSTORAGE ----------
  const fields = document.querySelectorAll("input");

  fields.forEach(field => {
    // Save on input
    field.addEventListener("input", () => {
      saveToLocal(field.id, field.value);
    });

    // Load saved value
    let saved = getFromLocal(field.id);
    if (saved) field.value = saved;
  });


  // ---------- FILL REVIEW STEP ----------
  function fillReview() {
    const review = document.getElementById("reviewSection");

    review.innerHTML = `
      <p><strong>Name:</strong> ${document.getElementById("fullName").value}</p>
      <p><strong>Email:</strong> ${document.getElementById("email").value}</p>
      <p><strong>Phone:</strong> ${document.getElementById("phone").value}</p>

      <p><strong>Qualification:</strong> ${document.getElementById("qualification").value}</p>
      <p><strong>Passing Year:</strong> ${document.getElementById("passingYear").value}</p>

      <p><strong>Experience:</strong> ${document.getElementById("experience").value}</p>
      <p><strong>Last Company:</strong> ${document.getElementById("company").value}</p>
    `;
  }


  // ---------- FINAL SUBMIT ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Form submitted successfully!");

    // clear saved values
    localStorage.clear();

    // Redirect
    window.location.href = "thankyou.html";
  });

});
