
const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();



export default async function handler(req, res) {
  switch (req.method) {
    case "DELETE":
      return await deleteOffers(req, res);
      break;

    default:
      return res.status(200).json("Nothing");
  }
}

const deleteOffers = async (req, res) => {
    const checkedIds = req.body.checkedIds;

    const delete_offers = await prisma.offer.deleteMany({
        where: {
            id: {
                in: checkedIds
            }
        }
    });

    return res.json(delete_offers);
    };