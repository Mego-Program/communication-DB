import server from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
