import fetchData from "./fetchData.js";

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

  const responseData = await fetchData(
    `${API_BASE_URL}/social/auth/${buttonPressed}`,
    options
  );
  if (buttonPressed === "register") {
    alert("Account created");
  } else {
    const { accessToken } = responseData;
    localStorage.setItem("data", accessToken);
    window.location.href = "../feed/";
  }
});
