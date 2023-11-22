const API_BASE_URL = "https://api.noroff.dev/api/v1"
const bearerToken = localStorage.getItem("data")


const posts = await fetch(
    `${API_BASE_URL}/social/posts`,
    {
    headers: {
        Authorization: `Bearer ${bearerToken}`
    },
});

const responseData = await posts.json();
console.log(responseData)




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
