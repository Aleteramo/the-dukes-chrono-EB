import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
  })
  
  try {
    console.log('🔍 Querying Database...')

    // Test user query
    const userCount = await prisma.user.count()
    console.log(`👥 Total Users: ${userCount}`)

    const users = await prisma.user.findMany({
      take: 5,
      select: {
        id: true,
        username: true,
        email: true,
        role: true
      }
    })
    console.log('👤 Sample Users:', users)

    // Test watch query
    const watchCount = await prisma.watch.count()
    console.log(`⌚ Total Watches: ${watchCount}`)

    const watches = await prisma.watch.findMany({
      take: 5,
      include: {
        category: true,
        images: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log('⌚ Recent Watches:', JSON.stringify(watches, null, 2))

    // Test categories
    const categories = await prisma.category.findMany({
      take: 5,
      include: {
        _count: {
          select: { watches: true }
        }
      }
    })
    console.log('📁 Categories:', categories)

    // Test inquiries
    const inquiryCount = await prisma.inquiry.count()
    console.log(`📧 Total Inquiries: ${inquiryCount}`)

    const inquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log('📧 Recent Inquiries:', inquiries)

  } catch (error) {
    console.error('❌ Database connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main().catch(console.error)
