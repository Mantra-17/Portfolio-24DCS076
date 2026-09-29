import puppeteer from 'puppeteer-core'
import path from 'path'

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const SCREENSHOT_DIR = path.resolve('screenshots')

async function run() {
  console.log('Launching Chrome from:', CHROME_PATH)
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })

  // ==========================================
  // PRACTICAL 1 CAPTURES (Port 5173)
  // ==========================================
  console.log('Capturing Practical 1...')
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' })
  await page.waitForSelector('.hero')
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_hero_skills.png') })

  // Scroll to projects & footer
  await page.evaluate(() => {
    document.getElementById('projects')?.scrollIntoView()
  })
  await new Promise(r => setTimeout(r, 600))
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p1_projects_footer.png') })

  // ==========================================
  // PRACTICAL 2 CAPTURES (Port 5174)
  // ==========================================
  console.log('Capturing Practical 2...')
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' })
  await page.waitForSelector('.hero')
  // 1. Home dark mode
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_home_dark.png') })

  // 2. Toggle to Light Mode
  const toggleBtn = await page.$('.toggle-track')
  if (toggleBtn) {
    await toggleBtn.click()
    await new Promise(r => setTimeout(r, 500))
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_home_light.png') })
    // Toggle back to dark
    await toggleBtn.click()
    await new Promise(r => setTimeout(r, 300))
  }

  // 3. Projects Page via React Router Link
  const projectsLink = await page.$('a[href="/projects"]')
  if (projectsLink) {
    await projectsLink.click()
    await page.waitForSelector('.project-list')
    await new Promise(r => setTimeout(r, 400))
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_projects_page.png') })
  }

  // 4. Contact Page via React Router Link
  const contactLink = await page.$('a[href="/contact"]')
  if (contactLink) {
    await contactLink.click()
    await page.waitForSelector('.contact')
    
    // Click Help tooltip toggle
    const tipBtn = await page.$('.tip-btn')
    if (tipBtn) await tipBtn.click()

    // Type in controlled inputs
    await page.type('#contact-name', 'Mantra Patel')
    await page.type('#contact-email', 'mantrapatel.46@gmail.com')
    await page.type('#contact-message', 'Hello! I am demonstrating Practical 2 reactive state management with controlled inputs, dynamic character counting, and SPA navigation.')
    await new Promise(r => setTimeout(r, 400))
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_contact_controlled_form.png') })

    // Submit form
    const submitBtn = await page.$('button[type="submit"]')
    if (submitBtn) {
      await submitBtn.click()
      await new Promise(r => setTimeout(r, 500))
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_contact_submitted.png') })
    }
  }

  // 5. 404 Not Found Page
  await page.goto('http://localhost:5174/invalid-test-path', { waitUntil: 'networkidle0' })
  await page.waitForSelector('.not-found')
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p2_404_not_found.png') })

  // ==========================================
  // PRACTICAL 3 CAPTURES (Port 5175)
  // ==========================================
  console.log('Capturing Practical 3...')
  // 1. Visit projects page
  await page.goto('http://localhost:5175/projects', { waitUntil: 'networkidle0' })
  await page.waitForSelector('.repo-card')
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_repos_success.png') })

  // 2. Search / Filter repositories
  await page.type('.search-input', 'Movie')
  await new Promise(r => setTimeout(r, 500))
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_search_filter.png') })

  // 3. Search non-existent repo (empty state)
  await page.evaluate(() => {
    const input = document.querySelector('.search-input')
    if (input) {
      input.value = ''
    }
  })
  await page.type('.search-input', 'xyznonexistent123')
  await new Promise(r => setTimeout(r, 500))
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_empty_state.png') })

  // 4. Test Error State simulation
  await page.evaluate(() => {
    const clearBtn = document.querySelector('.clear-search-btn')
    if (clearBtn) clearBtn.click()
    else {
      const input = document.querySelector('.search-input')
      if (input) { input.value = ''; input.dispatchEvent(new Event('input', { bubbles: true })); }
    }
  })
  await new Promise(r => setTimeout(r, 300))

  const demoToggle = await page.$('.demo-toggle')
  if (demoToggle) {
    await demoToggle.click()
    await new Promise(r => setTimeout(r, 600))
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_error_state.png') })

    // Test Retry button
    await demoToggle.click() // turn off error
    const retryBtn = await page.$('.retry-btn')
    if (retryBtn) {
      await retryBtn.click()
      await new Promise(r => setTimeout(r, 800))
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'p3_retry_recovered.png') })
    }
  }

  console.log('All screenshots captured successfully!')
  await browser.close()
}

run().catch(console.error)
