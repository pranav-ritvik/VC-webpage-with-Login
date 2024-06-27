const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4001;

app.use(cors());
app.use(bodyParser.json());

const getUsers = () => {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, "users.json"));
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users.json:", error);
    return [];
  }
};

const saveUsers = (users) => {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, "users.json"),
      JSON.stringify(users, null, 2)
    );
  } catch (error) {
    console.error("Error writing to users.json:", error);
  }
};

app.post("/register", (req, res) => {
  const users = getUsers();
  const { email } = req.body;

  if (users.find((user) => user.email === email)) {
    return res.status(400).send("User already exists");
  }

  users.push(req.body);
  saveUsers(users);
  res.status(201).send("User registered");
});

app.post("/login", (req, res) => {
  const users = getUsers();
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400).send("Invalid login credentials");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
