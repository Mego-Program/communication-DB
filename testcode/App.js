const exspres = require("express");
const app = exspres();
const morgan = require("morgan"); // Log request to console

const articleRoutes = require("./api/router/articles");

app.use(morgan("dev"));

//Middleware function that sets CORS headers for HTTP responses.Middleware function that sets CORS headers for HTTP responses.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


app.get("/", (req, res) => {
  res.status(200).json({ massage: "Hello, world!" });
});

app.use("/articles", articleRoutes);


app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  // Forward error request to next middleware
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
