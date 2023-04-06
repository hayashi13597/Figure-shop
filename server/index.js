const express = require("express");
require("dotenv").config();
const cors = require("cors");

const authRouter = require("./routes/auth");
const productApi = require("./routes/productApi");
const categoryApi = require("./routes/categoryApi");
const orderApi = require("./routes/orderApi");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./public'));

// API auth router
app.use("/api/auth", authRouter);
// API product router
productApi(app)
categoryApi(app);
orderApi(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
