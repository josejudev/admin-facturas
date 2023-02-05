import axios from "axios"

const express = require("express")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())




export default async function handler(req, res) {

    switch(req.method) {
        case "GET":
            return await listClients(req, res);
            break;

        case "POST":
            return await createClient(req, res);
            break;

        case "PUT":
            return res.status(200).json('Updating a product')

        default:
            return res.status(200).json('Nothing')        
    }


}

const listClients = async (req, res) => {
    const clients = await prisma.client.findMany()
    return res.json(clients)
}

const createClient = async (req, res) => {
    const { name, rfc, fiscal_address, email, address, contact_phone, contact_email, contact_name} = req.body
    const client = await prisma.client.create({
        data: {
            name,
            rfc,
            fiscal_address,
            email,
            address,
            contact_phone,
            contact_email,
            contact_name
        }
        
    })
    return res.json(client)
}