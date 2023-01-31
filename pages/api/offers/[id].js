const path = require("path");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


  

export default async function handler(req, res) {
    switch (req.method) {
        case "PUT":
            return await editOffer(req, res);
            break;

        case "DELETE":
            return await deleteOffer(req, res);
            break;

        default:
            return res.status(200).json("Nothing");
    }
}

const editOffer = async (req, res) => {
    const { id } = req.query;
    const { project_name, final_client, client_id, activity_resumen, status } = req.body;
    
        const edit_offer = await prisma.offer.update({
            where: {
                id: parseInt(id),
            },
            data: {
                project_name,
                client_id: parseInt(client_id),
                activity_resumen,
                final_client,
                status
            },
        });
        return res.json(edit_offer);

}

const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public", "uploads"));
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  });
  