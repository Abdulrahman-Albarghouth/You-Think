let queryString = new URLSearchParams(window.location.href.split("?")[1]);
const selectedPost = document.querySelector(".post");
const slug = queryString.get("slug");
var post = {};

const getPosts = async (slug) => {
    const res = await fetch(
      `https://www.wp-course.site/wp-json/youthink/post?slug=${slug}`
    );
    const data = await res.json();
    post = data.data;
  };

await getPosts(slug);

selectedPost.innerHTML="";
const showPost = () => {
  selectedPost.innerHTML = `
      <div>
          <img src="${post.thumbnail}" alt=""/>
          <div class="post-info">
              <h1>${post.title}</h1>
              <p>
              ${post.excerpt}
              </p>
              <h3>${post.author}</h3>
              <h4>
              <span class="material-icons-outlined"> visibility </span>${post.views} /
              <span class="material-icons-outlined"> calendar_today </span>${post.date} /
              <span class="material-icons-outlined"> local_offer </span>${post.tags}
              </h4>
          </div>
      </div>
            `;
};
showPost();
