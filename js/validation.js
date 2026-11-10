// Get the registration form
const registrationForm = document.getElementById("registration-form");

// Get the form input fields
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const github = document.getElementById("github");
const avatar = document.getElementById("avatar");

// Display an error message beside a field
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Clear previous error messages
function clearErrors() {
    showError("name-error", "");
    showError("email-error", "");
    showError("github-error", "");
    showError("avatar-error", "");
}

// Intercept form submission
registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();

    clearErrors();

    let isValid = true;

    // Check full name
    const nameValue = fullName.value.trim();

    if (nameValue === "") {
        showError("name-error", "Please enter your full name.");
        isValid = false;
    }

    // Check email address
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        showError("email-error", "Please enter a valid email address.");
        isValid = false;
    }

    // Check GitHub username
    const githubValue = github.value.trim();
    const githubPattern = /^@[A-Za-z0-9-]+$/;

    if (!githubPattern.test(githubValue)) {
        showError("github-error", "Enter a GitHub username beginning with @.");
        isValid = false;
    }

    // Check avatar upload
    const avatarFile = avatar.files[0];

    if (!avatarFile) {
        showError("avatar-error", "Please upload an avatar image.");
        isValid = false;
    } else if (
        avatarFile.type !== "image/jpeg" &&
        avatarFile.type !== "image/png"
    ) {
        showError("avatar-error", "Only JPG and PNG images are accepted.");
        isValid = false;
    } else if (avatarFile.size >= 500 * 1024) {
        showError("avatar-error", "Your image must be smaller than 500KB.");
        isValid = false;
    }

    // Stop if any field is invalid
    if (!isValid) {
        return;
    }

    // Read the selected avatar image
    const reader = new FileReader();

    reader.onload = function() {

        // Store registration details
        const registrationData = {
            fullName: nameValue,
            email: emailValue,
            github: githubValue,
            avatar: reader.result
        };

        localStorage.setItem(
            "codingConfRegistration",
            JSON.stringify(registrationData)
        );

        // Move to the ticket page
        window.location.href = "ticket.html";
    };

    reader.readAsDataURL(avatarFile);

});
