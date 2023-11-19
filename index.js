import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan"; // Log request to console
const app = express();
const port = 3000;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

var userIsConnect = false;

app.use(bodyParser.urlencoded({ extended: true }));

function idCheck(req, res, next) {
  const id = req.body["id"];
  if (id === "ILoveProgramming") {
    userIsAuthorised = true;
  }
  next();
}
app.use(idCheck);

app.post("/check", (req, res) => {
  if (userIsConnect) {
    res.send("send massage");
  } else {
    res.redirect("/");
    //Alternatively res.sendFile("/");
    console.log(req.body);
    res.sendStatus(201);
  }
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
