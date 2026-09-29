import puppeteer from 'puppeteer-core'
import path from 'path'

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const SCREENSHOT_DIR = path.resolve('screenshots')

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })

  // Step 1: First load page normally to ensure React is initialized
  await page.goto('http://localhost:5175/projects', { waitUntil: 'networkidle0' })
  await page.waitForSelector('.repo-card')

  // Step 2: Intercept fetch BEFORE navigating so we can pause the response
  await page.setRequestInterception(true)
  let resolveBlock
  const blockPromise = new Promise(r => { resolveBlock = r })

  page.on('request', async (req) => {
    if (req.url().includes('api.github.com')) {
      // Hold the API response for 3 seconds to capture spinner
      setTimeout(() => {
        resolveBlock()
        req.continue()
      }, 3000)
    } else {
      req.continue()
    }
  })

  // Step 3: Reload the page (this triggers new fetch which we intercept)
  page.reload()

  // Step 4: Wait a moment for React to render the spinner, then screenshot
  await new Promise(r => setTimeout(r, 1800))
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_loading_spinner.png') })
  console.log('Spinner screenshot captured!')

  // Step 5: Let the blocked request complete, then capture success
  await blockPromise
  await page.waitForSelector('.repo-card', { timeout: 15000 })
  await new Promise(r => setTimeout(r, 500))
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_retry_success.png') })
  console.log('Post-retry success screenshot captured!')

  await browser.close()
  console.log('Done!')
}

run().catch(e => { console.error(e.message); process.exit(1) })
