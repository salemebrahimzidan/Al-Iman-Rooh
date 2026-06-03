import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const distDir = 'dist'
const indexPath = join(distDir, 'index.html')
const htaccessPath = join(distDir, '.htaccess')
const fallback404Path = join(distDir, '404.html')

function fail(message) {
  console.error(`verify-dist: ${message}`)
  process.exit(1)
}

if (!existsSync(indexPath)) {
  fail('dist/index.html is missing — run npm run build first.')
}

if (!existsSync(htaccessPath)) {
  fail('dist/.htaccess is missing — ensure public/.htaccess exists and rebuild.')
}

if (!existsSync(fallback404Path)) {
  fail('dist/404.html is missing — run npm run build (copy-spa-fallback step).')
}

const indexHtml = readFileSync(indexPath, 'utf8')
const assetRefs = [...indexHtml.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(
  (match) => match[1],
)

if (assetRefs.length === 0) {
  fail('dist/index.html does not reference any /assets/ files.')
}

for (const assetRef of assetRefs) {
  const assetPath = join(distDir, assetRef.replace(/^\//, ''))
  if (!existsSync(assetPath)) {
    fail(`dist/index.html references missing file: ${assetRef}`)
  }
}

console.log('verify-dist: OK')
console.log(`  index.html references ${assetRefs.length} asset(s):`)
for (const assetRef of assetRefs) {
  console.log(`    ${assetRef}`)
}
console.log('  Upload the entire dist/ folder to public_html (clear old files first).')
