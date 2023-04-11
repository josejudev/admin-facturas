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


export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await listOffers(req, res);
      break;

    case "POST":
      return await createOffer(req, res);
      break;

    default:
      return res.status(200).json("Nothing");
  }
}

const listOffers = async (req, res) => {
  const offers = await prisma.offer.findMany({

    include: {
      client: true,
    },
  });
  return res.json(offers);
};

const createOffer = async (req, res) => {
  upload.single("fileName")(req, res, async (err) => {
    if (err) {
      console.log("Error uploading file: ", err);
    }
    const  {
      project_name,
      fileName,
      final_client,
      client_id,
      activity_resumen,
    } = req.body;
    console.log(req.body);
    const offer = await prisma.offer.create({
      data: {
        project_name,
        fileName: req.file.filename,
        final_client,
        client_id: parseInt(client_id),
        activity_resumen,
      },
    });

    return res.json(offer);
  });
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    },
  }),
});

