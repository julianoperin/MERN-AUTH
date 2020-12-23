const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi there ");
});

const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
  console.log(`Server running on 3000 ${PORT}`);
});
