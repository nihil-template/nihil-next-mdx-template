import { PrismaClient } from '@prisma/client';

export class Db {
  static prisma() {
    let globalWithPrisma = global as typeof globalThis & {
      prisma: PrismaClient;
    };

    let prisma: PrismaClient;

    if (process.env.NODE_ENV === 'production') {
      prisma = new PrismaClient();
    } else {
      if (!globalWithPrisma.prisma) {
        globalWithPrisma.prisma = new PrismaClient();
      }
      prisma = globalWithPrisma.prisma;
    }

    return prisma;
  }

  static post() {
    return this.prisma().post;
  }

  static block() {
    return this.prisma().block;
  }
}
