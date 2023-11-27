import mongoose from "mongoose";

let connect = null;

const connectToDatabase = async () => {
  const userName = process.env.USERNAME_DB;
  const password = process.env.PASSWORD_DB;
  const cluster = process.env.CLUSTER_DB;
  const dbName = "ToDo";

  const connectionURI = `mongodb+srv://${userName}:${password}${cluster}${dbName}`;

  try {
    if (!connect) {
      connect = await mongoose.connect(connectionURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to the database");
    }
    return connect;
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectToDatabase;
