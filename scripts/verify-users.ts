import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function verifyUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        password: true
      }
    })
    
    console.log('Registered Users:')
    users.forEach(user => {
      console.log(`
        ID: ${user.id}
        Username: ${user.username}
        Email: ${user.email}
        Role: ${user.role}
        Password Set: ${!!user.password}
      `)
    })

    // Test password verification
    if (users.length > 0) {
      const testPassword = 'AdminLogin2024!'
      const passwordValid = await bcrypt.compare(testPassword, users[0].password)
      console.log('Password Verification Test:', passwordValid)
    }
  } catch (error) {
    console.error('Error listing users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyUsers()
