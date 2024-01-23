var mongoose = require("mongoose");

var assessmentSchema = new mongoose.Schema({
    temperature: String,
    respiratoryRate: String,    
    heartRate: String,
    bloodPressure: String,
    bloodSugar: String,
    painLevel: String,
    status: String,    
    createdAt: {
      type: Date,
      default: Date.now
  }   
});

module.exports = mongoose.model("Assessment", assessmentSchema);