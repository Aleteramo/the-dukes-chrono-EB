import prisma from '../lib/prisma'

async function testDatabaseConnection() {
  try {
    console.log('🔌 Testing Database Connection...')

    // Test di connessione al database
    try {
      await prisma.$connect()
      console.log('✅ Database Connection Established')
    } catch (connectError: unknown) {
      console.error('❌ Failed to connect to database:',
        connectError instanceof Error ? connectError.message : String(connectError))
      return
    }

    // Verifica base con query semplice
    try {
      const userCount = await prisma.user.count()
      console.log('📊 Total Users:', userCount)
    } catch (countError: unknown) {
      console.error('❌ Failed to count users:',
        countError instanceof Error ? countError.message : String(countError))
      return
    }

    // Informazioni aggiuntive sul database
    console.log('\n🗃️ Database Details:')
    console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:]*@/, ':****@'))

    // Definizione di un’interfaccia comune per i delegate
    interface ModelDelegate {
      count(args?: any): Promise<number>;
    }

    const modelTests: { name: string; query: ModelDelegate }[] = [
      { name: 'User', query: prisma.user },
      { name: 'Watch', query: prisma.watch },
      { name: 'Category', query: prisma.category },
      { name: 'Inquiry', query: prisma.inquiry },
    ]

    console.log('\n🔍 Model Connectivity Tests:')
    for (const model of modelTests) {
      try {
        const count = await model.query.count()
        console.log(`✅ ${model.name} Model: ${count} records`)
      } catch (modelError: unknown) {
        console.error(`❌ ${model.name} Model Connection Failed:`,
          modelError instanceof Error ? modelError.message : String(modelError))
      }
    }

  } catch (error: unknown) {
    console.error('❌ Unexpected Database Connection Test Error:',
      error instanceof Error ? error.message : String(error))
  } finally {
    try {
      await prisma.$disconnect()
      console.log('✅ Database connection closed')
    } catch (disconnectError: unknown) {
      console.error('❌ Error closing database connection:',
        disconnectError instanceof Error ? disconnectError.message : String(disconnectError))
    }
  }
}

export default testDatabaseConnection

// Se questo file viene eseguito direttamente, invoca immediatamente la funzione
if (import.meta.url === `file://${process.argv[1]}`) {
  testDatabaseConnection().catch(error => {
    console.error('Unhandled error in test-database-connection:',
      error instanceof Error ? error.message : String(error))
    process.exit(1)
  })
}