const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Task = require("./models/task");
const Date = require("./date");

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.iy4bhde.mongodb.net/fruitsDBv2")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

//Declaring static folders
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/:taskType", async (req, res) => {
  const allTask = await Task.find({
    type: req.params.taskType,
    createdAt: Date,
  }).catch((err) => {
    console.log(err);
  });

  res.render("index.ejs", {
    type: req.params.taskType,
    fulldate: Date,
    lists: allTask,
  });
});

app.post("/:taskType", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask
    .save()
    .then(() => {
      res.redirect(`/${req.body.type}`);
    })
    .catch((err) => {
      console.log(err);
      res.redirect(`/${req.body.type}`);
    });
});

app.post("/:taskType/delete", async (req, res) => {
  var status;
  const findTask = await Task.findById(req.body.id);

  if (findTask.isDone == true) {
    status = false;
  } else {
    status = true;
  }

  await Task.findByIdAndUpdate(req.body.id, { isDone: status })
    .then(() => {
      res.redirect("/" + req.params.taskType);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/" + req.params.taskType);
    });
});

/* ------------------------------------------------------------------*/

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
