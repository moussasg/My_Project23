const mongoose = require('mongoose')
const Usercommands = new mongoose.Schema({
    prenom:{type:String},
    adress:{type:String},
    numero:{type:Number},
    quantité:{type:Number},
    prix:{type:Number},
    marque:{type:String},
    nom:{type:String},
  }) // quand tu crée ici collection sa crée automatuqement dans dbatlas avec une base de donnée par défault nomé 
  const Command = mongoose.model('command', Usercommands) // commands = collection dans dbatlas
  module.exports = Command

  
