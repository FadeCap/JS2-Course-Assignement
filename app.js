const API_BASE_URL = "https://api.noroff.dev/api/v1";

document.addEventListener("submit", async (event) => {
  event.preventDefault();
  const buttonPressed = event.submitter.id;
  const data = new FormData(event.target);
  const formData = {};
  data.forEach((value, key) => {
    formData[key] = value;
  });
  const [prefix, emailSuffix] = formData.username.split("@");
  const body = {
    email: formData.username,
    password: formData.password,
  };
  if (emailSuffix !== "noroff.no" && emailSuffix !== "stud.noroff.no") {
    return;
  }
  const options = {
    method: "POST", 
    headers: { "Content-Type": "application/json" }
  }
  if (buttonPressed === "register") {
      options.body = JSON.stringify({ ...body, name: prefix.replaceAll(/\W+/g, "_").trim() })
  } else { 
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(`${API_BASE_URL}/social/auth/${buttonPressed}`, options);
    if (!response.ok) {
      const responseData = await response.json();
      const errorMessage = `Request failed with status ${response.status}: ${responseData.errors[0].message}`;
      throw new Error(errorMessage);
    }
    alert("Account created");
  } catch (error) {
    console.error(error);
  }
});


// New post click event and display none when clicked outside or on the cross | Feed page
document
  .getElementById("new-post-button")
  .addEventListener("click", function () {
    document.getElementById("post-modal").style.display = "block";
  });

document.getElementById("close-button").addEventListener("click", function () {
  document.getElementById("post-modal").style.display = "none";
});

window.addEventListener("click", function (event) {
  var modal = document.getElementById("post-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

document
  .getElementById("post-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });
