import { existsSync, readFileSync } from 'node:fs'

const ENV_KEY = 'VITE_WEB3FORMS_ACCESS_KEY'
const envPath = '.env'

function fail(message) {
  console.error(`ensure-env: ${message}`)
  process.exit(1)
}

function fromProcessEnv() {
  const value = process.env[ENV_KEY]
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function fromDotEnvFile() {
  if (!existsSync(envPath)) {
    return undefined
  }

  const env = readFileSync(envPath, 'utf8')
  const match = env.match(new RegExp(`^\\s*${ENV_KEY}\\s*=\\s*(\\S+)\\s*$`, 'm'))
  return match?.[1]?.trim() || undefined
}

const accessKey = fromProcessEnv() ?? fromDotEnvFile()

if (!accessKey) {
  fail(
    [
      `${ENV_KEY} is not set.`,
      'Vercel/CI: add it in Project Settings → Environment Variables, then redeploy.',
      'Local: copy .env.example to .env and set the key, or export it in your shell.',
    ].join(' '),
  )
}

const source = fromProcessEnv() ? 'process.env' : '.env'
console.log(`ensure-env: ${ENV_KEY} is set (from ${source}).`)
