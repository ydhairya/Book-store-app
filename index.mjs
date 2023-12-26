import events from 'events';
import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import mongodb from 'mongodb';
import fs from 'fs';
const app = express();
import {fileURLToPath} from 'url';
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);
import path from 'path'
app.set("view engine" , 'hbs');
app.set('views',path.join(__dirname , 'views')
)

dotenv.config({path: './config.env'})
const PORT = process.env.PORT || 80;
import Writers from './engines/public/Coders.mjs';
app.use( express.urlencoded());
app.use(express.static(path.join(__dirname,'engines')))
const DB = 'mongodb+srv://Dhairya:1122334456@cluster0.xhbqz3d.mongodb.net/Aryabhatta?retryWrites=true&w=majority';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(DB).then(() => {
    console.log("Database connected successfully!")
}).catch((err) => {
    console.log(err)
})
const userSchema = {
    username : String,
    useremail : String,
    userdateofbirth : String,
    userpassword : String
}
const userCoder = {
    Emailid : String,
    Password : String
}
const User = mongoose.model("data",userSchema)
const UserCoder = mongoose.model("registeredusers",userCoder)
app.post('/account',async (req,res)=>{
    let emailid = req.body.email;
    let password = req.body.userpassword;
    let name = req.body.username;
    let dateofbirth = req.body.userdateofbirth;
   
    
    if(emailid == "",password == "",dateofbirth == "",name == ""){
        console.log("Registration unsuccessfull!")
        
        return false
    }
   try{
    const userExistence = await User.findOne({username:name,useremail:emailid,userdateofbirth:dateofbirth,userpassword:password})
    if(userExistence){     
        console.log("Account already Exist!")
    }else{
    const users = new User ({ username : req.body.username,
        userdateofbirth : req.body.userdateofbirth,
        userpassword : req.body.userpassword,
        useremail : req.body.email})
    await users.save() 
    console.log("SUBMITION SUCCESSFULLED!")
    res.status(200).render('Login')}
   }catch(err) {
    console.log(err)
   }
})
app.post('/post', (req,res)=>{
    var Nameofbook = req.body.nameofbook;
    var Genre = req.body.genre;
    var Nameofauthor = req.body.nameofauthor;
    var Url = req.body.url;
    if(Nameofbook == "",Genre == "",Nameofauthor == "",Url == ""){
        console.log('Submition Failed!')
        return false
    }else{
        const writers = new Writers ({
            Nameofauthor : req.body.nameofauthor,
            Nameofbook : req.body.nameofbook,
            Genre : req.body.genre,
            Url : req.body.url,
            Description : req.body.description
        })
         writers.save()
         res.status(200).render('Contact')
         
         
    }
    
})
app.get('/Biography',(req,res)=>{
    res.status(200).render('Biography')
})
app.get('/teaching',(req,res)=>{
    res.status(200).render('Buddhas Teachings')
})
app.get('/Profile',(req,res)=>{
    res.status(200).render('Profile')
    })
app.post("/Login" ,async (req,res) =>{
    let email = req.body.useremailid
    let password = req.body.userpassword;
    if(email == "",password == ""){
        console.log('Submition Failed!')
        return false
    }
    else if(password.length < 8){
        return false
    }try{
        const employee =  await User.findOne({useremail:email,userpassword:password})
        const person = await UserCoder.findOne({Emailid:email,Password:password})
       if(employee){
        const Javacoder = new UserCoder({
            Emailid : req.body.useremailid,
            Password : req.body.userpassword

        })
        await Javacoder.save();
        res.status(200).render('index')
       }
        else{
            res.status(200).render('Error2')
            console.log('Account Not Exist!')
        }
    }catch(err){
        console.log(err)
    }
})

app.get("/",(req,res)=>{
    res.status(200).render("Login");
})
app.get('/Home',(req,res)=>{
    res.status(200).render("index")
})
app.get('/Sign',(req,res)=>{
    res.status(200).render("SignUp")
})
app.get('/About',(req,res)=>{
    res.status(200).render('About')
})
app.post('/fictionsearch',(req,res)=>{
    console.log(req.body)
   res.status(200).render('Searchbar')

})
app.get('/Others',(req,res)=>{
    res.status(200).render('Other')
})


app.get('/Searchbar',(req,res)=>{
    res.status(200).render('Searchbar')
})
app.get('/Others',(req,res)=>{
    res.status(200).render('Other')
})
app.get('/Contact',(req,res)=>{
    res.status(200).render('Contact')
    
})
app.get('/Dracula',(req,res)=>{
    res.status(200).render('Dracula')})
app.get('/Hauntedhouse',(req,res)=>{

    res.status(200).render('The Haunted Hill House')
})
app.get('/Theshining',(req,res)=>{

    res.status(200).render('The shining')
})
app.get('/Gita',(req,res)=>{
    res.status(200).render('Bhagvadgita')
})
app.get('/Shastra',(req,res)=>{
    res.status(200).render('Viman Shastra')
})
app.get('/Puran',(req,res)=>{
    res.status(200).render('Shiv Puran')
})
app.get('/Bible',(req,res)=>{
    res.status(200).render('Illustrated')
})
app.get('/Confusion',(req,res)=>{
    res.status(200).render('Turning Confusion into Clarity')
})
app.get('/Ninteen-Eighty-four',(req,res)=>{
    res.status(200).render('Ninteen-Eighty-Four')
})
app.get('/TheTimeMachine',(req,res)=>{
    res.status(200).render('The Time Machine')
})
app.get('/Greatgatsby',(req,res)=>{
    res.status(200).render('The Great GATSBY')
})
app.get('/Thewomaninblack',(req,res)=>{
    res.status(200).render('The Woman in Black')
})
app.get('/Thelefthandofdarkness',(req,res)=>{
    res.status(200).render('The left hand of darkness')
})
app.get('/Wings',(req,res)=>{
    res.status(200).render('Wings Of Fire')
})
app.get('/Steve',(req,res)=>{
    res.status(200).render('Steve Jobs')
})
app.get('/Unbroken',(req,res)=>{
    res.status(200).render('Unbroken')
})
app.get('/Einstein',(rq,res)=>{
    res.status(200).render('Einstein his life and Universe')
})
app.get('/Gandhi',(req,res)=>{
    res.status(200).render('The Years that changes the world')
})
app.get('/Theturnofthescrew',(req,res)=>{
    res.status(200).render('The Turn Of the Screw')
})
app.get('/GhostsHead',(req,res)=>{
    res.status(200).render('Ghostshead')
})
app.get('/Theother',(req,res)=>{
    res.status(200).render('The Other')
})
app.get('/THOSEACROSSTHERIVER',(req,res)=>{
    res.status(200).render('Those Cross The River')
})
app.get('/Thehellhouse',(req,res)=>{
    res.status(200).render('Hell House')
})
app.get('/TheLockedRoom',(req,res)=>{
    res.status(200).render('The Locked Room')
})
app.get('/Wehavealwayslivedinthecastle',(req,res)=>{

    res.status(200).render('We have always lived in the castle')
})
app.get('/Death',(req,res)=>{
    res.status(200).render('A Death at the party')
})
app.get('/ReligionHistory',(req,res)=>{
    res.status(200).render('A little History Of Religion')
})
app.get('/WhiteSpaces',(req,res)=>{
    res.status(200).render('All the white spaces')
})
app.get('/Sky',(req,res)=>{
    res.status(200).render('Black and Endless Sky')
})
app.get('/Blind',(req,res)=>{
    res.status(200).render('Blind Sight')
})
app.get('/Ramayana',(req,res)=>{
    res.status(200).render('Illustrated Ramayana')
})
app.get('/Mahabharata',(req,res)=>{
    res.status(200).render('Illustrated Mahabharata')
})
app.get('/Grihya',(req,res)=>{
    res.status(200).render('Grihya Sutras')
})
app.get('/Jainism',(req,res)=>{
    res.status(200).render('Jainism')
})
app.get('/teaching',(req,res)=>{
    res.status(200).render('Buddhas Teaching')
})
app.get('/Aghori',(req,res)=>{
    res.status(200).render('Aghori')
})
app.get('/Rama',(req,res)=>{
    res.status(200).render('Parables of Rama')
})
app.get('/Iamthat',(req,res)=>{
    res.status(200).render('I am that')
})
app.get('/Patanjali',(req,res)=>{
    res.status(200).render('The yogi Sutras Of Patanjali')
})
app.get('/Hindu',(req,res)=>{
    res.status(200).render('Why I am a Hindu')
})
app.get('/Yogi',(req,res)=>{
    res.status(200).render('Autobiography of a yogi')
})
app.get('/SouthIndian',(req,res)=>{
    res.status(200).render('Studies in south Indian Jainsim')
})
app.get('/Hidden',(req,res)=>{
    res.status(200).render('The Hidden Hindu')
})
app.get('/Greatdisciple',(req,res)=>{
    res.status(200).render('Great disciples of buddha')
})
app.get('/Words',(req,res)=>{
    res.status(200).render('The buddhas words')
})
app.get('/teachingofbuddha',(req,res)=>{
    res.status(200).render('The Teachings of Buddha')
})
app.get('/discourses',(req,res)=>{
    res.status(200).render('The Numerical discourses of the buddha')
})
app.get('/questioning',(req,res)=>{
    res.status(200).render('Questioning the buddha')
})
app.get('/manybuddha',(req,res)=>{
    res.status(200).render('Many buddhas')
})
app.get('/Jain',(req,res)=>{
    res.status(200).render('Jain')
})
app.get('/Jainhistory',(req,res)=>{
    res.status(200).render('Jain History')
})
app.get('/Jainintroduction',(req,res)=>{
    res.status(200).render('An Introduction to Jainism')
})
app.get('/Essex',(req,res)=>{
    res.status(200).render('Essex Dogs.hbs')
})
app.get('/Harry',(req,res)=>{
    res.status(200).render('Harry Potter and the soceres stone')
})
app.get('/Hinduism',(req,res)=>{
    res.status(200).render('Hinduism')
})
app.get('/Footstepsoframa',(req,res)=>{
    res.status(200).render('IntheFootstepsofRama')
})
app.get('/Station',(req,res)=>{
    res.status(200).render('StationEleven')
})
app.get('/Exorcism',(req,res)=>{
    res.status(200).render('My Friend Exorcism')
})
app.get('/Drowning',(req,res)=>{
    res.status(200).render('No gods for drowning')
})
app.get('/Alchemist',(req,res)=>{
    res.status(200).render('The Alchemist')
})
app.get('/DarkForest',(req,res)=>{
    res.status(200).render('The Dark Forest')
})
app.get('/Institute',(req,res)=>{
    res.status(200).render('The Institute')
})
app.get('/Prince',(req,res)=>{
    res.status(200).render('The Little Prince')
})
app.get('/Holds',(req,res)=>{
    res.status(200).render('The World and all that holds')
})
app.get('/TheHiddenHindu-2',(req,res)=>{
    res.status(200).render('The Hidden Hindu-2')
})
app.get('/Hunt',(req,res)=>{
    res.status(200).render('Hunt')
})
app.get('/WhiteHorse',(req,res)=>{
    res.status(200).render('Horse')
})
app.get('/TheHunger',(req,res)=>{
    res.status(200).render('The Hunger')
})
app.get('/Exorcist',(req,res)=>{
    res.status(200).render('The Exorcist')
})
app.get('/Themartianwars',(req,res)=>{
    res.status(200).render('The Martian Wars')
})
app.get('/Frankanstein',(req,res)=>{
    res.status(200).render('FRANKANSTEIN')
})
app.get('/Crossdown',(req,res)=>{
    res.status(200).render('Cross Down')
})
app.get('/DouglasAdams',(req,res)=>{
    res.status(200).render('Douglas Adams')
})
app.get('/Endergame',(req,res)=>{
    res.status(200).render('EndersGame')
})
app.get('/Allthelightwecatsee',(req,res)=>{
    res.status(200).render('All the light we cant see')
})
app.get('/Bravenewworld',(req,res)=>{
    res.status(200).render('Brave new Worlds')
})
app.get('/Comics',(req,res)=>{
    res.status(200).render('COMICS')
})
app.get('/Maus',(req,res)=>{
    res.status(200).render('Maus')
})
app.get('/Palestine',(req,res)=>{
    res.status(200).render('Palestine')
})
app.get('/SafeArea',(req,res)=>{
    res.status(200).render('SafeArea')
})
app.get('/Footnotes',(req,res)=>{
    res.status(200).render('Footnotes')
})
app.get('/Likeit',(req,res)=>{
    res.status(200).render('Likeit')
})
app.get('/Defeatist',(req,res)=>{
    res.status(200).render('Defeatist')
})
app.get('/Fixer',(req,res)=>{
    res.status(200).render('Fixer')
})
app.get('/Blackhole',(req,res)=>{
    res.status(200).render('Blackhole')
})
app.get('/Bone',(req,res)=>{
    res.status(200).render('Bone')
})
app.get('/Harrow-1',(req,res)=>{
    res.status(200).render('Harrow-1')
})
app.get('/Harrow-2',(req,res)=>{
    res.status(200).render('Harrow-2')
})
app.get('/Empty',(req,res)=>{
    res.status(200).render('Empty')
})
app.get('/Parish',(req,res)=>{
    res.status(200).render('Parish')
})
app.get('/Land',(req,res)=>{
    res.status(200).render('Land')
})
app.get('/Burma',(req,res)=>{
    res.status(200).render('Burma')
})
app.get('/Pyongyang',(req,res)=>{
    res.status(200).render('Pyongyang')
})
app.get('/Shenzhen',(req,res)=>{
    res.status(200).render('Shenzhen')
})
app.get('/Jerusalem',(req,res)=>{
    res.status(200).render('Jerusalem')
})
app.get('/MetaMaus',(req,res)=>{
    res.status(200).render('MetaMaus')
})
app.get('/Funhome',(req,res)=>{
    res.status(200).render('Funhome')
})
app.get('/Lockkey',(req,res)=>{
    res.status(200).render('Lockkey')
})
app.get('/Woods',(req,res)=>{
    res.status(200).render('Woods')
})
app.post('/Ramayana',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Illustrated Ramayana')
})
app.post('/Mahabharata',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Illustrated Mahabharata')
})
app.post('/Grihya',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Grihya Sutras')
})
app.post('/lifescience',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Jainism')
})
app.post('/Teachings',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Buddhas Teachings')
})
app.post('/Aghori',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Aghori')
})
app.post('/Parables',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Parables of Rama')
})
app.post('/Iamthat',(req,res)=>{
    console.log(req.body)
    res.status(200).render('I am that')
})
app.post('/yogi',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The yogi Sutras Of Patanjali')
})
app.post('/Contact',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Contact')
})
app.get('/fictionsearch',(req,res)=>{
    res.status(200).render('Searchbar')
})
app.post('/Hindus',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Why I am a hindu')
})
app.post('/Auto',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Autobiography of a yogi')
})
app.post('/Jainism',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Studies in south Indian Jainsim')
})
app.post('/Hiddenhindu',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The Hidden Hindu')
})
app.post('/Disciples',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Great Disciples of Buddha')
})
app.post('/Words',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The buddhas words')
})
app.post('/Buddhasteaching',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The teachings of Buddha')
})
app.post('/Questioning',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Questioning the buddha ')
})
app.post('/Many',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Many Buddhas')
})
app.post('/Jainhistorical' ,(req,res)=>{
    console.log(req.body)
    res.status(200).render('Jain')
})
app.post('/JainHistory',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Jain History')
})
app.post('/Intoduction',(req,res)=>{
    console.log(req.body)
    res.status(200).render('An Intoduction to Jainism ')
})
app.post('/myform',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Dune')
})
app.post('/Footsteps',(req,res)=>{
    console.log(req.body)
    res.status(200).render('IntheFootstepsofRama')
})
app.post('/hindu',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The Hidden Hindu-2')
})
app.post('/world',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The World and all that  holds')
})
app.post('/Essex',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Essex Dogs')
})
app.post('/Spaces',(req,res)=>{
    console.log(req.body)
    res.status(200).render('All the white spaces')
})
app.post('/Horse',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Horse')
})
app.post('/Drowning',(req,res)=>{
    console.log(req.body)
    res.status(200).render('No gods for drowning')
})
app.post('/Sky',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Black and Endless Sky')
})
app.post('/HarryPotter',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Harry Potter and the soceres stone')
})
app.post('/Death',(req,res)=>{
    console.log(req.body)
    res.status(200).render('A Death at the party')
})
app.post('/Alchemist',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The Alchemist')
})
app.post('/prince',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The Little Prince')
})
app.post('/Maus',(req,res)=>{
res.status(200).render('Maus')
})
app.post('/Palestine',(req,res)=>{
    res.status(200).render('Palestine')
})
app.post('/SafeArea',(req,res)=>{
    res.status(200).render('SafeArea')
})
app.post('/FootNotes',(req,res)=>{
    res.status(200).render('Footnotes')
})
app.post('/likeit',(req,res)=>{
    res.status(200).render('Likeit')
})
app.post('/defeatist',(req,res)=>{
    res.status(200).render('Defeatist')
})
app.post('/Fixer',(req,res)=>{
    res.status(200).render('Fixer')
})
app.post('/BlackHole',(req,res)=>{
    res.status(200).render('BlackHole')
})
app.post('/Bone',(req,res)=>{
    res.status(200).render('Bone')
})
app.post('/Harrow-1',(req,res)=>{
    res.status(200).render('Harrow-1')
})
app.post('/Harrow-2',(req,res)=>{
    res.status(200).render('Harrow-2')
})
app.post('/empty',(req,res)=>{
    res.status(200).render('Empty')
})
app.post('/Parish',(req,res)=>{
    res.status(200).render('Parish')
})
app.post('/Land',(req,res)=>{
    res.status(200).render('Land') 
})
app.post('/Burma',(req,res)=>{
    res.status(200).render('Burma') 
})
app.post('/Pyongyang',(req,res)=>{
    res.status(200).render('Pyongyang')
})
app.post('/shenzhen',(req,res)=>{
    res.status(200).render('Shenzhen')
})
app.post('/Jerusalem',(req,res)=>{
    res.status(200).render('Jerusalem')  
})
app.post('/MetaMaus',(req,res)=>{
    res.status(200).render('MetaMaus')
})
app.post('/Home',(req,res)=>{
    res.status(200).render('Funhome')
})
app.post('/Lockekey',(req,res)=>{
    res.status(200).render('Lockkey')  
})
app.post('/Woods',(req,res)=>{
    res.status(200).render('Woods')  
})
app.post('/',(req,res)=>{
    res.status(200).render('')
})
app.post('/',(req,res)=>{
    res.status(200).render('')  
})
app.post('/',(req,res)=>{
    res.status(200).render('')
})
app.post('/',(req,res)=>{
    res.status(200).render('')
})
app.post('/',(req,res)=>{
    res.status(200).render('')
})
app.post('/',(req,res)=>{
    res.status(200).render('')
})
app.post('/',(req,res)=>{
    res.status(200).render('')
})
app.post('/religion',(req,res)=>{
    console.log(req.body)
    res.status(200).render('A little History Of Religion')
})
app.post('/hinduism',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Hinduism')
})
app.post('/Exorcism',(req,res)=>{
    console.log(req.body)
    res.status(200).render('My Friend Exorcism')
})
app.post('/Forest',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The Dark Forest')
})
app.post('/Sight',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Blind Sight')
})
app.post('/Eleven',(req,res)=>{
    console.log(req.body)
    res.status(200).render('StationEleven')
})
app.post('/Institute',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The Institute')
})
app.post('/Hunt',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Hunt')
})
app.post('/message',(req,res)=>{
    console.log(req.body)
    res.status(200).render('The Great GATSBY')
})
app.post('/account',(req,res)=>{
    console.log(req.body)
    res.status(200).render('Signup')
})
app.get('/aghora',(req,res)=>{
    res.status(200).render('Aghora')
})
app.get('/yogi',(req,res)=>{
    res.status(200).render('yogi')
})
app.get('/Religious',(req,res)=>{
    res.status(200).render('Religious')
})
app.get('/Hindu',(req,res)=>{
    res.status(200).render('The Hidden Hindu')
})
app.get('/hind',(req,res)=>{
    res.status(200).render('Why I am a Hindu')
})
app.get('/rama',(req,res)=>{
    res.status(200).render('Rama')
})
app.get('/Iamthat',(req,res)=>{
    res.status(200).render('Iamthat')
})
app.get('/ramayana',(req,res)=>{
    res.status(200).render('Ramayana')
})
app.get('/sutras',(req,res)=>{
    res.status(200).render('Sutras')
})
app.get('/mahabharata',(req,res)=>{
    res.status(200).render('mahabharata')
})
app.get('/hindus',(req,res)=>{
    res.status(200).render('Hindus')
})
app.get('/TheheartofBuddha',(req,res)=>{
    res.status(200).render('The GOD of PEACE')
})
app.get('/Jainisminsouthern',(req,res)=>{
    res.status(200).render('Science In Jainism')
})
app.get('/Fiction',(req,res)=>{
    res.status(200).render('Fiction')
})
app.get('/Dune',(req,res)=>{
    res.status(200).render('Dune')
})
app.listen(PORT , ()=>{
    console.log(`The App is successfully running at ${PORT} port`);
})
