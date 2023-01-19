const express = require("express")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get("/hello", (req, res) => {
    res.send("Hello World!")
})

//add client
app.post("/client", async (req, res) => {
    const { name} = req.body
    const client = await prisma.client.create({
        data: {
            name
        }
    })
    res.json(client)
})

//delete client
app.delete("/client/:id", async (req, res) => {
    const { id } = req.params
    const client = await prisma.client.delete({
        where: {
            id: Number(id)
        }
    })
    res.json(client)
})

//update client
app.put("/client/:id", async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const client = await prisma.client.update({
        where: {
            id: Number(id)
        }
        ,
        data: {
            name
        }
    })
    res.json(client)
})



app.post("/offer", async (req, res) => {
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
})

//Show clients with id
app.get("/client/:id", async (req, res) => {
    const { id } = req.params
    const client = await prisma.client.findUnique({
        where: {
            id: Number(id)
        }
    })
    res.json(client)
})

//Show all clients
app.get("/clients", async (req, res) => {
    const client = await prisma.client.findMany(
    )
    res.json(client)
})

//Show all offers of a client
app.get("/offer/:id", async (req, res) => {
    const { id } = req.params
    const offer = await prisma.offer.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            client: true
        }
    })
    res.json(offer)
})

app.listen(3001, () => console.log("Server is running on port 3001"))