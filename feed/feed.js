import fetchData from "../src/utils/fetchData.js";

const API_BASE_URL = "https://api.noroff.dev/api/v1";
const API_ENDPOINT = "/social/posts";
const bearerToken = localStorage.getItem("data");
const templatePicture = "../assets/no-image-available.jpg";
// Redirect to post ID url

window.getPostByID = (e) => {
  window.location.href = `?q=${e.currentTarget.id}`;
};
const urlParams = new URLSearchParams(window.location.search);
const postID = urlParams.get("q");

const postSection = document.getElementById("post-section");
const render = async (id = null) => {
  const url = id
    ? `${API_BASE_URL}${API_ENDPOINT}/${id}`
    : `${API_BASE_URL}${API_ENDPOINT}?_author=true`;
  const postsData = await fetchData(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  let postData = postsData;
  if (!Array.isArray(postsData)) {
    postData = [postsData];
  }

  for (let i = 0; i < postData.length; i++) {
    postSection.innerHTML += ` <div class="feed-container d-flex justify-content-center">
              <div class="card bg-secondary mt-5 m-4">
                <div class="card-body px-0 pb-0" onclick=" getPostByID(event)" id="${
                  postData[i].id
                }">
                  <div class="post-picture px-3">
                    <img
                      src="../assets/post-picture.png"
                      alt="Maker of posts profile picture"
                    />
                  </div>
                  <p class="card-text p-3">
                      ${postData[i].body}
                  </p>
                  <img
                    class="w-100 rounded-bottom"
                    src="${
                      postData[i].media ? postData[i].media : templatePicture
                    }"
                    alt="Posts image"
                  />
                </div>
              </div>
            </div>`;
  }
};

render(postID);

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

// Filter Posts

const searchForm = document.getElementById("tagSearchForm");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);
  const formData = {};
  data.forEach((value, key) => {
    formData[key] = value;
  });
  const URL = `${API_BASE_URL}${API_ENDPOINT}?_tag=${formData.searchInput}`;
  const tagResponse = await fetchData(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  postSection.innerHTML = "";
  for (let i = 0; i < tagResponse.length; i++) {
    postSection.innerHTML += ` <div class="feed-container d-flex justify-content-center">
              <div class="card bg-secondary mt-5 m-4">
                <div class="card-body px-0 pb-0" id="${tagResponse[i].id}">
                  <div class="post-picture px-3">
                    <img
                      src="../assets/post-picture.png"
                      alt="Maker of posts profile picture"
                    />
                  </div>
                  <p class="card-text p-3">
                      ${tagResponse[i].body}
                  </p>
                  <img
                    class="w-100 rounded-bottom"
                    src="${
                      tagResponse[i].media
                        ? tagResponse[i].media
                        : templatePicture
                    }"
                    alt="Posts image"
                  />
                </div>
              </div>
            </div>`;
  }
});
// Creating post
const postForm = document.getElementById("post-form");
postForm.addEventListener("submit", async (event) => {
  const data = new FormData(event.target);
  const formData = {};
  data.forEach((value, key) => {
    formData[key] = value;
  });
  const { title, description, tags, image } = formData;
  const postURL = API_BASE_URL + API_ENDPOINT;
  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({
      title,
      body: description,
      tags: tags.split(" "),
      media: image,
    }),
  };
  const tagResponse = await fetchData(postURL, options);
  console.log(tagResponse);
});
