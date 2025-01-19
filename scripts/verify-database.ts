import prisma from '../lib/prisma'

async function verifyDatabase() {
  try {
    // Check users
    const userCount = await prisma.user.count()
    console.log('Total Users:', userCount)

    // Check admin user
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (adminUser) {
      console.log('Admin User Found:', {
        id: adminUser.id,
        username: adminUser.username,
        email: adminUser.email,
        role: adminUser.role
      })
    } else {
      console.log('No admin user found')
    }
  } catch (error) {
    console.error('Database verification error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default verifyDatabase
verifyDatabase()