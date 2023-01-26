import { IncomingForm } from 'formidable'
import { promises as fs } from 'fs'
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

var mv = require('mv');


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req, res) => {
    
    const data = await new Promise((resolve, reject) => {
       const form = new IncomingForm()
       
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            console.log(fields, files)
            var oldPath = files.file.filepath;
            var newPath = `./public/uploads/${files.file.originalFilename}`;
            console.log(newPath)
            mv(oldPath, newPath, function(err) {
            });
            
            res.status(200).json({ fields, files })
        })
    })


    
}