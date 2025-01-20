import prisma from '../lib/prisma'
import { compare } from 'bcryptjs'
import { authOptions } from '../lib/auth-options'

async function verifyLoginProcess() {
  try {
    // 1. Verify database user
    const user = await prisma.user.findFirst({
      where: { username: 'admin' }
    })

    if (!user) {
      console.error('❌ Admin user not found in database')
      return
    }

    console.log('✅ Admin user found in database:', {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    })

    // 2. Verify password
    const testPassword = 'AdminLogin2024!'
    const isValidPassword = await compare(testPassword, user.password || '')

    console.log('🔐 Password Verification:', {
      passwordProvided: !!testPassword,
      isValidPassword
    })

    // 3. Manual authentication verification
    try {
      // Manual authentication process
      const foundUser = await prisma.user.findFirst({
        where: { username: 'admin' }
      })

      if (!foundUser) {
        console.error('❌ User not found during manual authentication')
        return
      }

      const passwordMatch = await compare(testPassword, foundUser.password || '')

      if (!passwordMatch) {
        console.error('❌ Password does not match')
        return
      }

      console.log('🚪 Manual Authentication Successful:', {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        role: foundUser.role
      })
    } catch (authError) {
      console.error('❌ Authentication Error:', authError)
    }
  } catch (error) {
    console.error('❌ Verification process error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default verifyLoginProcess
verifyLoginProcess()