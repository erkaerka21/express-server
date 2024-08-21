const express = require("express");
const app = express();
const fs = require("fs"); //fs=file system
const cors = require("cors");
// app.get("/", (req, res) => {
//   res.send("Hello express");
// });
app.use(express.json()); // middleware
app.use(cors()); //haanaas ch handaj bolno widdleware
// const users = [{ id: 1, name: "Galaa", age: 87 }];
app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);
  console.log("DATA:", data);
  res.status(200).json({ users: obData.workers });
});
app.post("/users", (req, res) => {
  console.log("body", req.body);
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { workers: users } = JSON.parse(data);
  const newUser = {
    id: `${users.length + 1}`,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    country: req.body.country,
    job: req.body.job,
    email: req.body.email,
  };
  users.push(newUser);
  fs.writeFileSync("./users.json", JSON.stringify({ workers: users })); //file dotor nemj oruulna
  res.status(201).json({ users: newUser });
});
app.put("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  console.log(req.params);
  console.log(req.body);
  console.log("USERS:", users);
  // console.log(data);
  const findUser = users.findIndex((user) => user.id === req.params.id); //parse Int deer aldsan baisanstring bolgoson baisaniig parseInt ni string utgatai bolgono. uund anhaarah
  if (findUser > -1) {
    users[findUser].name = req.body.name;
    users[findUser].age = req.body.age;
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: users[findUser] });

    // fs.writeFileSync("./users.json", );
  } else {
    res.status(400).json({ message: "not found" });
  }
});
app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { users } = JSON.parse(data);
  console.log("USERS:", users);
  // console.log(data);
  const findUser = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  if (findUser > -1) {
    const deleteUser = users.splice(findUser, 1);
    fs.writeFileSync("./users.json", JSON.stringify({ users }));
    res.status(200).json({ user: deleteUser[0] });
  } else {
    res.status(400).json({ message: "not found" });
  }
});
app.listen(8000, () => {
  console.log("Server is running at local host: 8000");
});
