const express = require("express")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

export default async function handler(req, res) {
    
app.get("/hello", (req, res) => {
    res.send("Hello World!")
})
  }
  