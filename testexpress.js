import express from "express" // framwork node.js 
import dotenv from "dotenv"
dotenv.config()
const app = express()
app.use(express.urlencoded({ extended: true })) //// pour prendre en charge les données de formulaire envoyées depuis votre formulaire React (je vais essayer aprés de éliminer et voir est ce qui'il influe ,!)
import cors from "cors"
app.use(cors())
import mongoose from "mongoose"
// 1 )conect db 
mongoose.connect(process.env.DBu ,{  useNewUrlParser: true,
})
.then(()=> {
    console.log('conecnted database')
})
.catch((error)=>{
    console.log('enable to db')
})
// 2) shema ndiroha dakhel el model
const usershema = new mongoose.Schema({
    email:String,
    password:String,
})
// 3) model
const User = mongoose.model('User' , usershema)
// 4) post wl get ;)
app.post('/api/users/' , async (req,res) => {
const {email , password} = req.body // pour récupéré le corp de la requette 
try {
    const nouvutil = new User({ email , password})
    await nouvutil.save()
    res.json({ success: true }); 
    console.log(`email: ${email} , password: ${password} inserted into db with id: ${nouvutil._id} ` )
}
catch(err) {
    console.log(err)
    res.status(500).json({error : 'erreur coté serveur'})
}
} )
app.get('/api/users' , async (req, res) => {
    const {email , password} = req.query
    try {
        const ancienutil = await User.findOne({email , password})
        res.json({exists: ancienutil !== null})  // si ancienutil exiss donc n'est pas null
    }
    catch(err) {
        console.log(err)
        res.status(500).json({error : 'érreur coté seveur'})
    }
})
app.use((req,res,next)=>{ // 5)cors
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
next();
})
/// 6) listen port
app.listen(3001 ,()=> {
    console.log('server listen on port 3001')
})
