import prisma from '../../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Clear existing data
    await prisma.inquiry.deleteMany()
    await prisma.watchImage.deleteMany()
    await prisma.watch.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()

    // Hash password
    const hashedPassword = await bcrypt.hash('AdminLogin2024!', 10)

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@dukes-chrono.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    console.log('✅ Seeding completed successfully!')
    console.log('Admin User Created:', {
      id: adminUser.id,
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role
    })
  } catch (error) {
    console.error('❌ Seeding error:', error)
    throw error
  }
}

export default main
main()
  .catch((e) => {
    console.error('Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })