const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const PORT = 5100;
const HOST = '0.0.0.0';
const cookieParser = require("cookie-parser");

const _db = require("./config/db.js");
const indexRoutes = require("./routes/index.js");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/views"))
app.use(express.static(path.join(__dirname, "public/")));
app.use(cookieParser());

app.use("/", indexRoutes);

app.get("*", (req, res) => {
    res.render("404.ejs");
})


app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

require('dotenv').config();

_db.connectToServer((err) => {
    if (err) {
        console.log("Failed to connect to DB", err);
        process.exit();
    }
    else {
      console.log("Database connected successfully!");
    }
});