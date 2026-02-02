console.log('db file running');

import { PrismaClient } from "../../generated/prisma/client.ts";
import { PrismaPg  } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString })

const prisma = new PrismaClient({adapter});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

export { prisma, connectDB };