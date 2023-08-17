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
  const Command = mongoose.model('commands', Usercommands) // commands = collection dans dbatlas
  module.exports = Command
  const dbURI = 'mongodb+srv://myjwt:fVwnW0b46LnqEC9n@cluster0.iejtzdc.mongodb.net/commands?retryWrites=true&w=majority';//// commands = collection
   const x = mongoose.createConnection(dbURI, { useNewUrlParser: true, useUnifiedTopology: true , bufferCommands: true})
   x.on('connected', () => {
    console.log('Connected to commands');
  });
  x.on('error', (error) => {
    console.error('Connection error:', error);
  });
  
