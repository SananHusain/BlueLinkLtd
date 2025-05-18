const firebaseConfig = {
  apiKey: "AIzaSyBZTgsUmEzpR33ZjCyQAywHZ-TZCw5j_lA",
  authDomain: "testproject-c72b7.firebaseapp.com",
  databaseURL: "https://testproject-c72b7-default-rtdb.firebaseio.com",
  projectId: "testproject-c72b7",
  storageBucket: "testproject-c72b7.appspot.com",
  messagingSenderId: "954353987668",
  appId: "1:954353987668:web:b370f74b59356e0cf93dc1"
};

firebase.initializeApp(firebaseConfig);

const blogPostDB = firebase.database().ref("blogPost");

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

window.addEventListener("DOMContentLoaded", () => {
  const blogId = localStorage.getItem("editBlogId");
  if (blogId) {
    // Change UI to reflect edit mode
    document.querySelector("h2").textContent = "Edit Blog Post";
    const submitButton = document.querySelector("form button[type='submit']");
    const successMessage = document.getElementById("successMessage");

    if (submitButton) submitButton.textContent = "Update Blog";
    if (successMessage) successMessage.textContent = "✅ Blog updated successfully!";

    // Prefill form with blog data
    blogPostDB.child(blogId).once("value")
      .then(snapshot => {
        const data = snapshot.val();
        if (data) {
          document.getElementById("title").value = data.title || "";
          document.getElementById("content").value = data.content || "";
          document.getElementById("technology").value = data.technology || "";
          document.getElementById("quote").value = data.quote || "";
          document.getElementById("author").value = data.author || "";
          document.getElementById("blogImageUrl").value = data.blogImageUrl || "";
          document.getElementById("additionalImagesUrl").value = data.additionalImagesUrl || "";
        }
      });
  }
});

document.getElementById('blogPost').addEventListener("submit", function(e) {
  e.preventDefault();

const blogId = localStorage.getItem("editBlogId");

  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const technology = document.getElementById("technology").value.trim();
  const quote = document.getElementById("quote").value.trim();
  const author = document.getElementById("author").value.trim();
  const blogImageUrl = document.getElementById("blogImageUrl").value.trim();
  const additionalImagesUrl = document.getElementById("additionalImagesUrl").value.trim();
  const datePosted = new Date().toISOString();

  if (!title || !content) {
    alert("Title and content are required.");
    return;
  }

  const blogData = {
    title,
    content,
    technology,
    quote,
    author,
    blogImageUrl,
    additionalImagesUrl,
    datePosted
  };

  const successMessage = document.getElementById("successMessage");

  if (blogId) {
    blogPostDB.child(blogId).set(blogData)
      .then(() => {
        alert("Blog updated successfully!");
        if (successMessage) successMessage.textContent = "✅ Blog updated successfully!";
        localStorage.removeItem("editBlogId");
        document.getElementById("blogPost").reset();
        successMessage.style.display = "block";
      })
      .catch(err => {
        alert("Error updating blog: " + err.message);
      });
  } else {
    blogPostDB.push(blogData)
      .then(() => {
        alert("Blog posted successfully!");
        if (successMessage) successMessage.textContent = "✅ Blog posted successfully!";
        document.getElementById("blogPost").reset();
        successMessage.style.display = "block";
      })
      .catch(err => {
        alert("Error posting blog: " + err.message);
      });
  }
}