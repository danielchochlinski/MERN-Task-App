const mongoose = require("mongoose");

<<<<<<< HEAD
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");
=======
mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
>>>>>>> 51582a1e63bebd8989ffe8bbee4320a9d5a61cdf
