import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

function checkEnvFile() {
  const envPath = resolve(process.cwd(), '.env')
  
  try {
    // Check if .env file exists
    if (!existsSync(envPath)) {
      console.error('❌ .env file not found')
      return
    }

    // Read .env file
    const envContents = readFileSync(envPath, 'utf8')
    
    // Check for critical environment variables
    const requiredVars = [
      'NEXTAUTH_SECRET',
      'DATABASE_URL',
      'NEXTAUTH_URL',
      'NODE_ENV',
      'NEXT_PUBLIC_SITE_URL'
    ]

    console.log('🔍 Checking Environment Variables:')
    requiredVars.forEach(varName => {
      const varRegex = new RegExp(`^${varName}=`, 'm')
      if (varRegex.test(envContents)) {
        console.log(`✅ ${varName} is set`)
      } else {
        console.error(`❌ ${varName} is NOT set`)
      }
    })

    // Optional: Mask sensitive information
    const maskedContents = envContents
      .split('\n')
      .map((line: string) => {
        if (line.includes('=')) {
          const [key, value] = line.split('=')
          return `${key}=${value ? '*'.repeat(value.length) : ''}`
        }
        return line
      })
      .join('\n')

    console.log('\n🔒 Masked .env contents:')
    console.log(maskedContents)

  } catch (error) {
    console.error('❌ Error reading .env file:', error)
  }
}

export default checkEnvFile

// Immediately invoke the function if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkEnvFile()
}