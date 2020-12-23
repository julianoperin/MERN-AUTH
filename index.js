const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//! setup mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB Connection established");
  }
);

const app = express();
app.use(express.json());
app.use(cors());

//! Include route as middleware
app.use("/users", require("./routes/userRouter"));

app.get("/", (req, res) => {
  res.send("Hi there ");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
