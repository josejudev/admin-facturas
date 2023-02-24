const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const { fecha_creacion, cliente, estado, hitos } = req.body;

// Hacer el INSERT del pedido
const pedido = await prisma.pedidos.create({
  data: {
    fecha_creacion,
    cliente,
    estado,
  },
});

const num_pedido = pedido.num_pedido;

// Hacer el INSERT de los hitos del pedido
for (const h of hitos) {
  const { num_hito, descripcion, valor } = h;
  await prisma.hitos.create({
    data: {
      num_pedido,
      num_hito,
      descripcion,
      valor,
    },
  });
}

res.send('El pedido se ha guardado en la base de datos.');

// Cierra la conexión de Prisma
await prisma.$disconnect();