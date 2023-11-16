import express from "express";
import morgan from "morgan"; // Log request to console
const app = express();
const port = 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.post("/register", (req, res) => {
  //Do something with the data
  console.log(req.body);
  res.sendStatus(201);
});

app.put("/user/myname", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/myname", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/myname", (req, res) => {
  //Deleting
  res.sendStatus(200);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
