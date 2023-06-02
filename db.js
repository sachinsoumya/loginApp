const dotenv = require("dotenv");
dotenv.config();
let mongoose = require("mongoose");
mongoose.connect(`${process.env.URL_1}/ed73we?retryWrites=true&w=majority`);

// mongoose.connect("mongodb://localhost:27017/ed73we");