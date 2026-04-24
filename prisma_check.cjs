const { PrismaClient } = require('./generated/prisma-client');
const prisma = new PrismaClient();

(async () => {
  try {
    const columns = await prisma.$queryRawUnsafe('SHOW COLUMNS FROM TeamMember');
    console.log('SHOW_COLUMNS_RESULT');
    console.log(JSON.stringify(columns, null, 2));
  } catch (error) {
    console.error('SHOW_COLUMNS_ERROR');
    console.error(error);
  }

  try {
    const first = await prisma.teamMember.findFirst();
    console.log('FIND_FIRST_RESULT');
    console.log(JSON.stringify(first, null, 2));
  } catch (error) {
    console.error('FIND_FIRST_ERROR');
    console.error(error);
  }

  await prisma.$disconnect();
})();
