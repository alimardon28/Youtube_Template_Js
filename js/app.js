const menu = document.querySelector("#menu");
const sidebar = document.querySelector(".sidebar");

menu.addEventListener("click", function () {
  sidebar.classList.toggle("show-sidebar");
});

const searchBox = document.querySelector(".search-bar");
const videoContainer = document.querySelector(".videos__container");
const videoItem = document.querySelector(".videoItem");

const KEY = "AIzaSyDYMpYv_AianLl7R_b3JmU4O4bKUOBz5MA";
const URL = "https://www.googleapis.com/youtube/v3/search?";

async function getData(query) {
  const request = await fetch(
    `${URL}q=${query}&key=${KEY}&part=snippet&maxResults=100`
  );
  const response = await request.json();
  sendDisplay(response.items);
}

searchBox.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    getData(searchBox.value);
    videoContainer.style.display = "flex";
  }
});

function sendDisplay(res) {
  videoContainer.innerHTML = "";
  res.map((item) => {
    const div = document.createElement("div");
    div.dataset.link = item.id.videoId;
    div.classList.add("vidId");
    console.log(item);
    div.innerHTML = `
      <div class="video">
      <div class="video__thumbnail">
        <img
          src="${item.snippet.thumbnails.high.url}"
          alt=""
        />
      </div>
      <div class="video__details">
        <div class="author">
          <img
            src="${item.snippet.thumbnails.high.url}"
            alt=""
          />
        </div>
        <div class="title">
          <h3 class="titles">
          ${item.snippet.description ? item.snippet.title : ""}
          </h3>
          <a href="">FutureCoders</a>
          <span>${
            item.snippet.channelTitle ? item.snippet.channelTitle : ""
          }</span>
        </div>
      </div>
    </div>

      `;

    videoContainer.prepend(div);
  });

  setVideo(res);
}

function setVideo(list) {
  const vid = document.querySelectorAll(".vidId");

  vid.forEach((item) => {
    console.log(item);

    item.addEventListener("click", async () => {
      const req = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${item.dataset.link}&key=${KEY}&part=snippet`
      );

      const res = await req.json();
      videoContainer.style.display = "none";

      sendVideo(res, item.dataset.link, list);
    });
  });
}

function sendVideo(item, videoId, list) {
  const div = document.createElement("div");
  div.classList.add("player");

  videoItem.classList.remove("hide");

  const { items } = item;
  const { channelTitle, description, thumbnails, localized } = items[0].snippet;

  div.innerHTML = `



 <div class="div>
 <iframe width="841" height="549" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

 <p>${localized.title}</p>
 </div>

<div class='container-title'>
<img src="${thumbnails.high.url}" class="channel-icon" alt="" />
<h2>${channelTitle}</h2>

</div>
  `;

  videoItem.prepend(div);
}
