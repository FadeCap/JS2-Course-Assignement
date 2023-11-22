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
    headers: { "Content-Type": "application/json" },
  };
  if (buttonPressed === "register") {
    options.body = JSON.stringify({
      ...body,
      name: prefix.replaceAll(/\W+/g, "_").trim(),
    });
  } else {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/social/auth/${buttonPressed}`,
      options
    );
    const responseData = await response.json();
    if (!response.ok) {
        const errorMessage = `Request failed with status ${response.status}: ${responseData.errors[0].message}`;
        throw new Error(errorMessage);
      }
      if (buttonPressed === "register") {
        alert("Account created");
  
      } else {
         const {accessToken} = responseData;
         localStorage.setItem("data", accessToken)
         window.location.href="../feed/";
      }
  } catch (error) {
    console.error(error);
  }
});