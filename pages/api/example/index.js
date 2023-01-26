const express = require("express");
const path = require("path");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

export const config = {
  api: {
    bodyParser: false,
  },
};

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

export default async function handler(req, res) {
  upload.single("fileName")(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    const { project_name,fileName,final_client,client_id,activity_resumen} = req.body;
    const offer = await prisma.offer.create({
      data: {
        project_name,
        fileName: req.file.filename,
        final_client,
        client_id: parseInt(client_id),
        activity_resumen,
      },
    });
    console.log(req.file);
    console.debug(offer);

    return res.json(offer);
  });
}
