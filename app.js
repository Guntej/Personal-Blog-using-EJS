//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// Load the full build.
const _ = require('lodash');

const homeStartingContent = "Hello! This is my personal blog. I will share my thought process and how I approach problems with my coding projects";
const aboutStartingContent = "I am an Android and Web Developer based in British Columbia, Canada. I ❤️ to design and create mobile and web applications. I started to learn how to code when I was 17 years old because I wanted to make my own android application. Over time, I have gained a wealth of experience designing and developing mobile and web applications.";
const contactStartingContent = "If you have a project that you want to get started, think you may need my help with something or just want to say hello, then get in touch.";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render('home', {
    homeContent: homeStartingContent,
    hPosts: posts
  });
});

app.get("/about", function(req, res) {
  res.render('about', {
    aboutContent: aboutStartingContent
  });
});

app.get("/contact", function(req, res) {
  res.render('contact', {
    contactContent: contactStartingContent
  });
});

app.get("/compose", function(req, res) {
  res.render('compose');
});



app.post("/compose", function(req, res) {
  let pTitle = req.body.postTitle;
  let pBody = req.body.postBody;
  const post = {
    title: pTitle,
    content: pBody
  };

  posts.push(post);

  res.redirect('/');
});

app.get("/posts/:title", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.title);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
      });
    }
  });



});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
