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
            return res.status(200).json('There is a problem')    
    }
}

const getMilestone = async (req, res) => {
    const { id } = req.query
    const milestone = await prisma.milestone.findMany({
        where: {
            id: parseInt(id)
        }
    })
    return res.json(milestone)
    
}

const updateMilestone = async function (req, res) {
    try {
        const { id } = req.query
        const { isCheck } = req.body
        const milestone = await prisma.milestone.update({
            where: {
                id: parseInt(id)
            },
            data: {
                isCheck: isCheck
            }
        })
        return res.json(milestone)
    }catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}