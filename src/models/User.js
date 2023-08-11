const { isEmail } = require('validator'); // isEmail = function used to validate whether a given string is a valid email address.
// The validator = 'library 'is  used in Node.js for data validation various types of data : number , string , url
const bcrypt = require('bcrypt'); // library in the Node.js for hashing passwords securely.
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    }
  });
  userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };
var User = mongoose.model('user', userSchema)
module.exports = User  
/*
const commands = new mongoose.Schema({
  nom : {type:String},
  adress : {type:String},
  numero:{type:Number}
})
var Command = mongoose.model('command', commands)
*/
 
