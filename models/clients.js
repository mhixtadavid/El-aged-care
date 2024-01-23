var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,    
    gender: String,
    age: String,
    town: String,
    state: String,
    phoneNumber: String,
    email: String,
    address: String,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
  },
  assessments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment"
    }
  ]   
});

module.exports = mongoose.model("Client", clientSchema);