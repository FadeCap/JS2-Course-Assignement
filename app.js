
const API_BASE_URL = 'https://api.noroff.dev/api/v1/social/'


async function register() {
  const username = document.getElementById('InputEmail').value;
  const password = document.getElementById('inputPassword').value;

  const response = await fetch('https://api.noroff.dev/api/v1/social/')
}
// Authorization to the API 

const options = {
  headers: {
    Authorization: ''
  },
}

const response = await fetch(``)

// New post click event and display none when clicked outside or on the cross | Feed page
document.getElementById("new-post-button").addEventListener("click", function() {
    document.getElementById("post-modal").style.display = "block";
  });
  

  document.getElementById("close-button").addEventListener("click", function() {
    document.getElementById("post-modal").style.display = "none";
  });
  
  
  window.addEventListener("click", function(event) {
    var modal = document.getElementById("post-modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
  
  document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault();
  });
  