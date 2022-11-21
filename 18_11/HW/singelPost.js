import { posts } from "./main.js";

let queryString = new URLSearchParams(window.location.href.split("?")[1]);
const selectedPost = document.querySelector(".post");
const postId = queryString.get("postId");

console.log(posts);

const showPost = () => {
  selectedPost.innerHTML = `
      <div id="${postId}">
          <img src="${posts[postId].thumbnail}" alt=""/>
          <div>
              <h1>${posts[postId].title}</h1>
              <p>
              ${posts[postId].excerpt}
              </p>
              <h4>
              <span class="material-icons-outlined"> visibility </span>${posts[postId].views} /
              <span class="material-icons-outlined"> calendar_today </span>${posts[postId].date} /
              <span class="material-icons-outlined"> local_offer </span>${posts[postId].tags}
              </h4>
          </div>
      </div>
            `;
};
showPost();
