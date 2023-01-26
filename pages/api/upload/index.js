const express = require("express")
const path = require("path");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client")
import nc from 'next-connect'


const prisma = new PrismaClient()


export const config = {
    api: {
       bodyParser: false,
    }
};

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(process.cwd(), "public", "uploads"));
        },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
    }),
});
 
const handler = nc({
    onError: (err, req, res, next) => {
        console.log(err)
        res.status(500).json({ error: err.message })
    },
    onNoMatch: (req, res, next) => {
        console.log('no match')
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    }
}).use(upload.single("fileName")).post(async (req, res) => {
    const {project_name,fileName,final_client,client_id, activity_resumen } = req.body
    const offer = await prisma.offer.create({
        data: {
            project_name,
            fileName: req.file.filename,
            final_client,
            client_id: parseInt(client_id),
            activity_resumen

        }
    })
    console.log(req.file)

    return res.json(offer)
})

export default handler