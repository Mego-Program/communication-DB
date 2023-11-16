import mongoose from "mongoose";

const start = async () => {
  try {
    const connection = await connectToDatabase();
    // Your database-related code here
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    // Close the MongoDB connection after all operations
    mongoose.connection.close();
  }
};                 

let connect = null;

const connectToDatabase = async () => {
  const userName = "ShmuelRoth"; // Make sure to wrap string values in quotes
  const password = "mh881999"; // Wrap in quotes
  const cluster = "@cluster0.gbn9blz.mongodb.net/?retryWrites=true&w=majority";
  const dbName = "ToDo";

  const connectionURI = `mongodb+srv://${userName}:${password}${cluster}${dbName}`;

  try {
    if (!connect) {
      connect = await mongoose.connect(connectionURI
      //   useNewUrlParser: true, // This option is no longer necessary in MongoDB driver v4.0.0 and above
      //   useUnifiedTopology: true, // This option is no longer necessary in MongoDB driver v4.0.0 and above
        );
      console.log("Connected to the database");
    }
    // return connect;
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
  
  const db = mongoose.connection;
 
 
  db.on("error", console.error.bind(console, "Connection error:"));
  console.log("jkjk");
  db.once("open", async () => {
  console.log("Connected to MongoDB!");
  
    // Example Schema and Model
    const todoSchema = new mongoose.Schema({
      content: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    });

    const Todo = mongoose.model("ToDo", todoSchema, "chat");

    // Create and Save a Document
    const newTodo = new Todo({
      content: "Do something",
    });

    try {
      await newTodo.save();
      console.log("Todo saved to the database");
    } catch (error) {
      console.error(error);
    } finally {
      // Close the MongoDB connection after all operations
      mongoose.connection.close();
    }
  });
};
start();
