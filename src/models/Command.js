const mongoose = require('mongoose')
const commands = new mongoose.Schema({
    prenom:{type:String},
    adress:{type:String},
    numero:{type:Number}, // 
    quantité:{type:Number},
    prix:{type:Number},
    marque:{type:String},
    nom:{type:String}
  })
  var Command = mongoose.model('Command', commands)
  module.exports = Command