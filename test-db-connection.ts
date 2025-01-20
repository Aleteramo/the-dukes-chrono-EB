const { PrismaClient } = require('@prisma/client')

async function testDatabaseConnection() {
  const prisma = new PrismaClient()

  try {
    console.log('Attempting to connect to the database...')
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Verify database name instead of trying to read from a non-existent table
    const databaseName = await prisma.$queryRaw`SELECT DATABASE()`
    console.log('Connected to database:', databaseName)
  } catch (error: unknown) {
    console.error('❌ Database connection failed:', error)
    
    // Additional debug information
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
    }
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseConnection()