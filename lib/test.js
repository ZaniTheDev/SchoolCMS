import prisma from "./prisma"; // Change this path if needed

async function main() {
  try {
    console.log("Connecting to database...");

    await prisma.$connect();
    console.log("✅ Connected successfully!");

    // Run a simple query
    const result = await prisma.$queryRaw`SELECT NOW()`;

    console.log("✅ Query successful!");
    console.log(result);
  } catch (error) {
    console.error("❌ Error:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
    console.log("Disconnected.");
  }
}

main();