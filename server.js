const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));  // replaces bodyparser, allows us to get req.body data



app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/expenses", require("./routes/api/expenses"));
app.use("/api/users", require("./routes/api/users"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
