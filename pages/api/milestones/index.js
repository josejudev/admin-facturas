const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

export default async function handler(req, res) {
    switch(req.method) {
        case "GET":
            return await getMilestone(req, res);
            break;
        case "PUT":
            return await updateMilestone(req, res);
            break;
        case "DELETE":
            return await deleteMilestone(req, res);
            break;
        default:
            return res.status(200).json('Nothing')    
    }
}

const getMilestone = async (req, res) => {
    const milestones = await prisma.milestone.findMany()
    return res.json(milestones)
}