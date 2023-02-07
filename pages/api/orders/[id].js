const path = require("path");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "PUT":
      return await updateOrders(req, res);
      break;

    case "DELETE":
      return await deleteOrder(req, res);
      break;

    default:
      return res.status(200).json("Nothing");
  }
}

const updateOrders = async (req, res) => {
  const { id } = req.query;
  const {date,name,concept,amount,final_amount,type,class_type,milestone,entity,currency,order_balance,status,observations,offer_id} = req.body;
  const order = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      date,name,concept,
      amount,
      final_amount,
      type,
      class_type,
      milestone,
      entity,
      currency,
      order_balance,
      status,
      observations,
      offer_id,
    },
  });
  return res.json(order);
};
