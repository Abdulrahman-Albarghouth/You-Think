const posts = [];
let LoadMoreNum = 1;
const postsList = document.querySelector(".posts");
const inputLoadMore = document.getElementById("LoadMore");

const getPosts = async (num) => {
  const res = await fetch(
    `https://www.wp-course.site/wp-json/youthink/posts?page=${num}`
  );
  const data = await res.json();
  posts.push(...data.data);
};

await getPosts(LoadMoreNum);
console.log(posts);

const showPosts = (data) => {
  postsList.innerHTML = "";
  let i = 0;
  data.map((item) => {
    postsList.innerHTML += `
    <div id="${i}">
        <img src="${item.thumbnail}" alt=""/>
        <div class="post-info">
            <h1>${item.title}</h1>
            <p>
            ${item.excerpt}
            </p>
            <h3>
            <span class="material-icons-outlined"> visibility </span>${item.views} /
            <span class="material-icons-outlined"> calendar_today </span>${item.date} /
            <span class="material-icons-outlined"> local_offer </span>${item.tags}
            </h3>
        </div>
    </div>
          `;
          i++;
  });
};

showPosts(posts);

inputLoadMore.addEventListener("click", async (e) => {
  LoadMoreNum++;
  await getPosts(LoadMoreNum);
  showPosts(posts);
  console.log(posts);
});

postsList.addEventListener("click", (e) => {
    e.path.map((el) => {
      if (el.tagName == "DIV"  && el.id ) {
        window.location.href = `/18_11/HW/singelPost.html?slug=${posts[el.id].slug}`;
      }
    });
      console.log(e.path);
  });