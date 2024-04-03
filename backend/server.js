const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  registration: Number,
  branch: String,
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      registration: req.body.registration,
      branch: req.body.branch,
    });
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

app.post("/forgot-password", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { email: req.body.email },
      { password: hashedPassword }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "abdc@gmail.com",
        pass: "456erT@gmail",
      },
    });

    const mailOptions = {
      from: "mohanty4raj@gmail.com",
      to: req.body.email,
      subject: "New Password",
      text: `Your new password is: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("New password sent to your email");
  } catch (error) {
    console.error("Error in forgot-password route:", error);
    res.status(500).send("An error occurred. Please try again later.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




