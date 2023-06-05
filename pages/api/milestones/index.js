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
    const milestones = await prisma.milestone.findMany(
        {
            include: {
                order: true,
            },
        }
    )
    return res.json(milestones)
}

const updateMilestone = async (req, res) => {
    const {id, isCheck} = req.body
    const result = await prisma.milestone.update({
        where: {id: id},
        data: {
            isCheck: isCheck
        }
    })
    return res.json(result)
}