const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await listTable(req, res);
      break;

    default:
      return res.status(200).json("Nothing");
  }
}

const listTable = async (req, res) => {
  //create a pagination
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const search = req.query.search || "";
  const offset = limit * page;
  const total = await prisma.offer.count({
    where: {
      OR: [{ project_name: { contains: search } }],
    },
  });
  
  const totalPage = Math.ceil(total / limit);  
  const result = await prisma.offer.findMany({
    where: {
        OR: [{ project_name: { contains: search } }],
    },
    skip: offset,
    take: limit,
    orderBy: {
        id: "desc",
    },

  });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: total,
        totalPage: totalPage
    });
};


//http://localhost:3000/api/table?page=0&limit=10&search=proyect_name
