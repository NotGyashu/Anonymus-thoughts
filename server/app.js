const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 9000;
const multer = require("multer");
const dotenv = require("dotenv");
const streamifier = require("streamifier");

dotenv.config();
const db = require("./config/mongoose");
const Entry = require("./Model/entry");
const User = require("./Model/user");
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to parse incoming form data
app.use(express.urlencoded());
// Add middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.static("Assets"));
app.use(express.json());

app.post("/api/add", upload.single("voiceRecording"), async (req, res) => {
  try {
    const { title, category, content, falseName, author } = req.body;

    let newEntry;

    if (req.file) {
      const voiceRecording = req.file;
      console.log(voiceRecording);
      const gridFSBucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db
      );
      const writeStream = gridFSBucket.openUploadStream(
        voiceRecording.originalname
      );

      await new Promise((resolve, reject) => {
        const fileStream = streamifier.createReadStream(voiceRecording.buffer);
        fileStream.pipe(writeStream);

        writeStream.on("finish", () => {
          // Access Entry.title here since the file upload is complete
          newEntry = new Entry({
            title: title,
            falseName: falseName,
            category: category,
            author: author,
            voiceRecording: writeStream.id,
          });
          resolve();
        });
        writeStream.on("error", (err) => reject(err));
      });
    } else if (req.body.content) {
      // If no files are present but content is provided
      newEntry = new Entry({
        title: title,
        content: content,
        falseName: falseName,
        category: category,
        author: author,
      });
    } else {
      return res.status(400).json({ error: "No content or files provided" });
    }

    const response = await newEntry.save();
    res.status(200).json(response);
    console.log(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to serve audio files
app.get("/api/audio/:id", async (req, res) => {
  try {
    const entryId = req.params.id;
    const entry = await Entry.findById(entryId);

    if (!entry || !entry.voiceRecording) {
      console.log("no audio")
      return res.status(404).send("Audio not found");
    }

    // Assuming voiceRecording is stored as a Buffer in your database
    res.set("Content-Type", entry.voiceRecording.contentType);
    res.send(entry.voiceRecording.data);
  } catch (err) {
    console.error("Error retrieving audio:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/", (req, res) => {
  res.json("Hello");
});

// Get all entries for a specific user
app.get("/api/all/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const all = await Entry.find({ author: userId }).exec();
    res.status(200).json(all);
  } catch (err) {
    console.log("Error in getting all entries:", err);
    res.status(500).json({ error: "Error in getting all entries" });
  }
});

//delete operation
app.delete("/api/:id", async (req, res) => {
  console.log("here");
  try {
    const post = await Entry.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json("deletion done bro");
  } catch (err) {
    console.log("err in delet", err);
  }
});

//update operation
app.put("/api/:id", async (req, res) => {
  try {
    const post = await Entry.findById(req.params.id);
    const newd = req.body;

    await post.updateOne({ $set: req.body });
    return res.status(200).json(post);
  } catch (err) {
    console.log("err in update", err);
  }
});

//register
app.post("/api/register", async (req, res) => {
  try {
    console.log(req.body);
    // generate new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    //save user and return rsponse
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log("err in reg user :", err);
  }
});

//login
app.post("/api/login", async (req, res) => {
  try {
    console.log("login here", req.body);
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      const isPasswordCorrect = user.password === req.body.password;

      if (isPasswordCorrect) {
        // Password is correct, proceed with authentication
        res.status(200).json(user);
      } else {
        // Password is incorrect
        res.status(401).json({ message: "Incorrect password" });
      }
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("err in findg", err);
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log("therer is error in serfer");
  }
  console.log("yup!! server is ruuning on port", port);
});
