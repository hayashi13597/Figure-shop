const express = require("express");
require("dotenv").config();
const cors = require("cors");

const authRouter = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
