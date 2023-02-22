const path = require("path");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await listOrders(req, res);
      break;

    case "POST":
      return await createOrder(req, res);
      break;

    default:
      return res.status(200).json("Nothing");
  }
}

const listOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      offer: true,
      offer: {
        include: {
          client: true,
        }
      }
    },
  });
  return res.json(orders);
};

const createOrder = async (req, res) => {
  try{
    upload.single("fileName")(req, res, async (err) => {
      if (err) {
        console.log(err);
      }
      const {
        date,
        name,
        fileName,
        concept,
        amount,
        final_amount,
        type,
        class_type,
        entity,
        currency,
        order_balance,
        status,
        observations,
        offer_id,
      } = req.body;


  
      const order = await prisma.order.create({
          data: {
              date,
              name,
              fileName: req.file.filename,
              concept,
              amount: parseFloat(amount),
              final_amount : parseFloat(final_amount),
              type,
              class_type,
              entity,
              currency,
              order_balance : parseFloat(order_balance),
              status,
              observations,
              offer_id: parseInt(offer_id)
          },
      });

      await prisma.offer.update({
        where: {
          id: parseInt(offer_id),
        },
        data: {
          status: "Aceptado",
        }
        
      });




      return res.json(order);
    });
  } catch (error) {
    console.log("La orden no se pudo crear");
  }
};

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public", "uploads"));
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
  });
