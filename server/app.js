const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 9000;
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/mongoose");
const Entry = require("./Model/entry");
// Middleware to parse incoming form data
app.use(express.urlencoded());

app.use(
  cors({
    origin: ["https://anonymus-thoughts-client.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.static("Assets"));
app.use(express.json());
app.post("/api/add", async (req, res) => {
  try {
    const { title, category, content, falseName } = req.body;
    console.log(req.body);
    if (!title || !content || !falseName) {
      return res
        .status(400)
        .json({ error: "Title and content and falseName are required." });
    }

    const newEntry = new Entry({
      title: title,
      content: content,
      falseName: falseName,
      category: category,
    });

    const response = await newEntry.save();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.json("Hello");
});
//get all entries
app.get("/api/all", async (req, res) => {
  try {
    const all = await Entry.find({}).exec();
    res.status(200).json(all);
  } catch (err) {
    console.log("err in getting all", err);
  }
});

app.listen(port, function (err) {
  if (err) {
    console.log("therer is error in serfer");
  }
  console.log("yup!! server is ruuning on port", port);
});
