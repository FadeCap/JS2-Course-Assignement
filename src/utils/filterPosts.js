document.addEventListener("submit", async (event) => {
    event.preventDefault();
    const buttonPressed = event.submitter.id;
    const data = new FormData(event.target);
    const formData = {};
    data.forEach((value, key) => {
      formData[key] = value;
    })});