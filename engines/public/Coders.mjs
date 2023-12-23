import events from 'events';
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import mongodb from 'mongodb';
import fs from 'fs';
import dotenv from 'dotenv';
const app = express();
import {fileURLToPath} from 'url';
const _filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filename);
import path from 'path'
app.set("view engine" , 'hbs');
app.set('views',path.join(__dirname , 'views')
)

const writerSchema = {
    Nameofauthor : String,
    Nameofbook : String,
    Genre : String,
    Url : String,
    Description : String,
}
const Writers = mongoose.model('books',writerSchema)
export default Writers
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