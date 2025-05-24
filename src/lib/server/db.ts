import { PrismaClient } from '@prisma/client';

// Create a single instance of the Prisma client
export const prisma = new PrismaClient();

export async function getProducts(category?: string) {
  const where = category && category !== 'all' ? { category } : {};
  return prisma.product.findMany({ where });
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({ where: { id } });
}

export async function getUserOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });
}

export async function createOrder(data: any) {
  return prisma.order.create({ data });
}