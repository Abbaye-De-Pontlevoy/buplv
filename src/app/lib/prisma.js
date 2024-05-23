// @ts-nocheck
import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

/**
 * Prisma client instance.
 * @typedef {import('@prisma/client').PrismaClient} PrismaClient
 */

/** @type {PrismaClient} */
const prisma = new PrismaClient();

export default prisma;
