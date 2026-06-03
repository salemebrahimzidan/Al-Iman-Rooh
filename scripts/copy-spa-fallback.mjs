import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const distDir = 'dist'
const indexPath = join(distDir, 'index.html')
const htaccessPath = join(distDir, '.htaccess')
const fallback404Path = join(distDir, '404.html')

function fail(message) {
  console.error(`copy-spa-fallback: ${message}`)
  process.exit(1)
}

if (!existsSync(indexPath)) {
  fail('dist/index.html is missing — run vite build first.')
}

copyFileSync(indexPath, fallback404Path)

if (!existsSync(htaccessPath)) {
  fail('dist/.htaccess is missing — add public/.htaccess and rebuild.')
}

console.log('copy-spa-fallback: dist/404.html created (SPA refresh fallback).')
console.log('copy-spa-fallback: dist/.htaccess present for Apache/Hostinger.')
