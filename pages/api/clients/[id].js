const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch(req.method) {
        case "DELETE":
            return await deleteClient(req, res);
            break;
        
        case "PUT":
            return await updateClient(req, res);
            break;
        default:
            return res.status(200).json('Nothing')    
    }
}

const deleteClient = async (req, res) => {
    const { id } = req.query
    const client = await prisma.client.delete({
        where: {
            id: parseInt(id)
        }
    })
    return res.json(client)
}

const updateClient = async (req, res) => {
    const { id } = req.query
    const { name, rfc, contact_phone, fiscal_address, email, address, contact_email, contact_name} = req.body
    const client = await prisma.client.update({
        where: {
            id: parseInt(id)
        },
        data: {
            name,
            rfc,
            contact_phone,
            fiscal_address,
            email,
            address,
            contact_email,
            contact_name

        }
    })
    return res.json(client)
}
