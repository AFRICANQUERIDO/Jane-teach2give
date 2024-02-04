const selectInput = document.querySelector("#selectInput");
const postsContainer = document.querySelector("#postsContainer");
const commentsContainer = document.querySelector("#commentsContainer");
const currentPost = document.querySelector("#currentPost");

const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    console.log(users);

    if (users.length > 0) {
      // Polulate select options
      const htmlContent = users
        .map((user) => `<option value="${user.id}">${user.name}</option>`)
        .join("");
      selectInput.innerHTML = htmlContent;

      const userOne = users[0];
      fetchUserPost(userOne.id);

      // Populate profile details with defauls (user with id 1)
      
    }
  } catch (error) {
    alert("Error fetching users");
  }
};
fetchUsers();

async function fetchUserPost(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const posts = await response.json();

    if (posts.length > 0) {
      const htmlContent = posts
        .map(
          (post) =>
            `<div class="post">
              <div class="post-img">
                <img
                  data-id="${post.id}"
                  src="https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png"
                  alt="profile-pic"
                />
              </div>
              <div class="post-content">
                <div class="post-title">
                  <h4 data-id="${post.id}" class="post-name">${post.title}</h4>
                  <ion-icon name="checkmark-circle"></ion-icon>
                  <ion-icon name="logo-twitter"></ion-icon>
                </div>
                <p data-id="${post.id}" class="content">
                  ${post.body}
                </p>
                <div class="footer">
                  <ion-icon name="chatbubble-ellipses-outline"></ion-icon><span>200</span>
                  <img
                    src="https://twitter-signals-7iou.vercel.app/assets/retweet.png"
                    alt="retweet"
                  /> <span>200</span>
                  <ion-icon name="heart" class="heart">200</ion-icon><span>200</span>
                </div>
              </div>
            </div>
            `
        )
        .join("");
      postsContainer.innerHTML = htmlContent;

      const postContainers = document.querySelectorAll(".post");
      postContainers.forEach((container) => {
        container.addEventListener("click", (event) => {
          const postId = event.target.getAttribute("data-id");
          if (postId) fetchPostComments(postId);
        });
      });

      // Fetch default comment
      const postOne = posts[0];
      fetchPostComments(postOne.id);
    }
  } catch (error) {
    console.log(error);
    alert("Error fetching user posts");
  }
}

async function fetchPostComments(postId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const comments = await response.json();

    if (comments.length > 0) {
      currentPost.innerHTML = comments.length;
      const htmlContent = comments
        .map(
          (comment) =>
            `<div class="comment-content">
                <div class="post-img">
                  <img
                    src="https://sb.kaleidousercontent.com/67418/1672x1018/6463a5af0d/screenshot-2022-05-24-at-15-22-28.png"
                    ,
                    alt="profile-pic"
                  />"
                </div>
                <div class="comment-description">
                  <div class="comment-top">
                    <h4 class="comment-heading">
                      ${comment.name}
                    </h4>
                    <ion-icon name="checkmark-circle"></ion-icon>
                    <ion-icon name="logo-twitter"></ion-icon>
                  </div>

                  <p class="content">
                    ${comment.body}
                  </p>
                  <div class="footer">
                    <ion-icon name="chatbubble-ellipses-outline">0</ion-icon><span>0</span>
                    <img
                      src="https://twitter-signals-7iou.vercel.app/assets/retweet.png",alt="retweet"/><span>0</span>
                    <ion-icon name="heart" class="heart"></ion-icon> <span>0</span>
                  </div>
                </div>
              </div>
            `
        )
        .join("");
      commentsContainer.innerHTML = htmlContent;
    }
  } catch (error) {
    console.log(error);
    alert("Error fetching user posts");
  }
}
// adding event listener
selectInput.addEventListener("change", (event) => {
  console.log("TARGET", event.target.value);
});