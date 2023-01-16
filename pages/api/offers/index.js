import axios from "axios"

const express = require("express")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

export default async function handler(req, res) {
    
        switch(req.method) {
            case "GET":
                return await listOffers(req, res);
                break;
    
            case "POST":
                return await createOffer(req, res);
                break;
    
            case "PUT":
                return res.status(200).json('Updating a product')
    
            default:
                return res.status(200).json('Nothing')        
        }
}

const listOffers = async (req, res) => {
    const offers = await prisma.offer.findMany(
        {
            include: {
                client: true
            }
        }
    )
    return res.json(offers)
}

const createOffer = async (req, res) => {
    const {project_name,fileName,final_client,client_id } = req.body
    const offer = await prisma.offer.create({
        data: {
            project_name,
            fileName,
            final_client,
            client_id: Number(client_id),
        }
    })
    return res.json(offer)
}