import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'stdout' },
      { level: 'info', emit: 'stdout' },
      { level: 'warn', emit: 'stdout' },
    ] : []
  });

  // Optional: Add global query logging
  if (process.env.NODE_ENV === 'development') {
    client.$on('query', (event: any) => {
      console.log('Query:', event.query)
      console.log('Params:', event.params)
      console.log('Duration:', event.duration + 'ms')
    })
  }

  return client
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Rimuoviamo questo evento poiché non è supportato direttamente
// Gli errori verranno gestiti attraverso i log configurati sopra




export default prisma;