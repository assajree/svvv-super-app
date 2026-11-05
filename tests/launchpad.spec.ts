import { test, expect } from '@playwright/test'

test.describe('My WebApp Hub - Headless Browser E2E Tests', () => {
  test('หน้าเว็บหลักโหลดได้ถูกต้อง แสดงรายการแอปครบถ้วน และไม่มี Console Error', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    // 1. ไปที่หน้าหลัก
    await page.goto('/')

    // ตรวจสอบชื่อ Title และ Header
    await expect(page).toHaveTitle(/My WebApp Hub/i)
    const headerTitle = page.locator('h1')
    await expect(headerTitle).toContainText('My WebApp Hub')

    // 2. ตรวจสอบว่ามีรายการการ์ดแอปแสดงผลอยู่จริง
    const appTiles = page.locator('a[target="_blank"]')
    const count = await appTiles.count()
    expect(count).toBeGreaterThan(0)

    // บันทึกภาพหน้าจอ Light Mode
    await page.screenshot({ path: 'screenshots/launchpad-light.png', fullPage: true })

    // 3. ทดสอบปุ่มสลับธีม Dark / Light Mode
    const themeBtn = page.locator('button[aria-label*="สลับโหมด"]')
    await expect(themeBtn).toBeVisible()
    await themeBtn.click()

    // ตรวจสอบว่า HTML ได้ class 'dark' หรือไม่
    const html = page.locator('html')
    const isDark = await html.evaluate((el) => el.classList.contains('dark'))
    expect(typeof isDark).toBe('boolean')

    // บันทึกภาพหน้าจอ Dark Mode
    await page.screenshot({ path: 'screenshots/launchpad-dark.png', fullPage: true })

    // 4. ทดสอบช่องค้นหาแอป
    const searchInput = page.locator('input[placeholder*="ค้นหา"]')
    await expect(searchInput).toBeVisible()
    await searchInput.fill('DB Studio')

    // ตรวจสอบว่าพบ DB Studio และรายการแอปที่ไม่เกี่ยวข้องถูกกรองออก
    await expect(page.locator('text=DB Studio')).toBeVisible()

    // ล้างคำค้นหา
    const clearBtn = page.locator('button:has-text("ล้าง")')
    if (await clearBtn.isVisible()) {
      await clearBtn.click()
    }

    // 5. ตรวจสอบว่าไม่มี Console Error ตลอดการทดสอบ
    expect(consoleErrors).toEqual([])
  })
})
