const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
dotEnv.config();

//config express to receive form data
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/user", require("./routes/userRouter"));
app.use("/api/event", require("./routes/eventRouter"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_CLOUD_URL)
  .then(() => {
    console.log("MongoDB connected successfully......");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello World................!");
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
