const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// const PORT = config.get('port') || 5000;
const PORT = config.get("port"); //process.env.port || config.get('port');

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`app has been started on port ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
