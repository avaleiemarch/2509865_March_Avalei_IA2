// Retrieve the saved registration information
const savedData = localStorage.getItem("codingConfRegistration");

// Check whether registration information exists
if (savedData === null) {

    // Return visitors without registration to the landing page
    window.location.href = "index.html";

} else {

    // Convert the saved information into a JavaScript object
    const attendee = JSON.parse(savedData);

    // Display the attendee's name
    document.getElementById("congratulations").textContent =
        "Congrats, " + attendee.fullName + "! Your ticket is ready.";

    document.getElementById("ticket-name").textContent =
        attendee.fullName;

    // Display the GitHub username
    document.getElementById("ticket-github").textContent =
        attendee.github;

    // Display the uploaded avatar
    document.getElementById("ticket-avatar").src =
        attendee.avatar;

    // Create a GitHub profile link
    const githubLink = document.getElementById("ticket-github");

    githubLink.href = "https://github.com/" +
        attendee.github.substring(1);

    // Display the ticket number
    document.getElementById("ticket-number").textContent =
        "#01609";
}
