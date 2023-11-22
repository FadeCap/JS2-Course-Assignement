import fetchData from "../src/utils/fetchData.js";

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const API_ENDPOINT = "/social/posts";
const bearerToken = localStorage.getItem("data");
const templatePicture = "../assets/cook.jpg";

const postSection = document.getElementById("post-section");
const render = async () => {
  const postsData = await fetchData(
    `${API_BASE_URL}${API_ENDPOINT}?_author=true`,
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
  console.log("test", postsData);

  for (let i = 0; i < postsData.length; i++) {
    postSection.innerHTML += ` <div class="feed-container d-flex justify-content-center">
              <div class="card bg-secondary mt-5 m-4">
                <div class="card-body px-0 pb-0">
                  <div class="post-picture px-3">
                    <img
                      src="../assets/post-picture.png"
                      alt="Maker of posts profile picture"
                    />
                  </div>
                  <p class="card-text p-3">
                      ${postsData[i].body}
                  </p>
                  <img
                    class="w-100 rounded-bottom"
                    src="${
                      postsData[i].media ? postsData[i].media : templatePicture
                    }"
                    alt="Posts image"
                  />
                </div>
              </div>
            </div>`;
  }
};

render();

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
