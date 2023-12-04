const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const routes = require("./routes/routes");
const connection = require("./connection");

app.use("/api", routes);
app.use(cors({
  origin: 'http://192.168.56.1:3000' // Replace with your frontend's exact URL
}));


app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//const hospitalTable = require('./tables/hospital')
//const trafficsignal = require('./tables/trafficsignal')
//const user = require('./tables/user')

// const PORT = process.env.PORT;

app.listen(4000, () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
  console.log(`Server is running on`, 4000);
});
