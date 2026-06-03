import { existsSync, readFileSync } from 'node:fs'

const envPath = '.env'

function fail(message) {
  console.error(`ensure-env: ${message}`)
  process.exit(1)
}

if (!existsSync(envPath)) {
  fail(
    'Missing .env — copy .env.example to .env and set VITE_WEB3FORMS_ACCESS_KEY before npm run build.',
  )
}

const env = readFileSync(envPath, 'utf8')
const match = env.match(/^\s*VITE_WEB3FORMS_ACCESS_KEY\s*=\s*(\S+)\s*$/m)

if (!match?.[1]) {
  fail('VITE_WEB3FORMS_ACCESS_KEY is missing or empty in .env.')
}

console.log('ensure-env: VITE_WEB3FORMS_ACCESS_KEY is set.')
