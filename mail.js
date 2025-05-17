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

var blogPostDB = firebase.database().ref("blogPost");

document.getElementById('blogPost').addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Collect values
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const technology = document.getElementById("technology").value;
  const quote = document.getElementById("quote").value;
  const author = document.getElementById("author").value;
  const blogImageUrl = document.getElementById("blogImageUrl").value;
  const additionalImageUrl = document.getElementById("additionalImagesUrl").value; // FIXED ID

  // Save to Firebase
  saveBlogs(title, content, technology, quote, author, blogImageUrl, additionalImageUrl);

  // Show success message
  document.querySelector(".alert").style.display = "block";

  // Optional: Reset form
  document.getElementById("blogPost").reset();
}

const saveBlogs = (title, content, technology, quote, author, blogImageUrl, additionalImageUrl) => {
  const newBlogPost = blogPostDB.push();
  newBlogPost.set({
    title: title,
    content: content,
    technology: technology,
    quote: quote,
    author: author,
    blogImageUrl: blogImageUrl,
    additionalImageUrl: additionalImageUrl,
    datePosted: new Date().toISOString() // Automatically add current date
  });
};


const getElementVal = (id) => {
    return document.getElementById(id).value;
 };