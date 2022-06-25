const { apply } = require("function-bind");
const mongoose = require("mongoose");

const Task = require("./models/task");S
const User = require("./models/User");

// Task.findByIdAndDelete("62aba0e36cb998ce8f0a3552")
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("62aba0e36cb998ce8f0a3552", 2)
  .then((count) => {
    console.log(count);
  })
  .catch((err) => {
    console.log(err);
  });
