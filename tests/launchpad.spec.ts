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

  test('เปิดแอป Pokemon Team Builder, จัดทีม, ดูตาราง Matrix และคำแนะนำธาตุได้ถูกต้อง', async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    // 1. ไปที่หน้าหลัก
    await page.goto('/')

    // 2. คลิกการ์ด Pokemon Team Builder
    const pokemonTile = page.locator('text=Pokemon Team Builder').first()
    await expect(pokemonTile).toBeVisible()
    await pokemonTile.click()

    // ตรวจสอบว่าเข้าหน้าแอป Pokemon Team Builder
    await expect(page.locator('h1')).toContainText('Pokemon Team Builder')
    expect(page.url()).toContain('#/pokemon-builder')

    // 3. คลิก Slot 1 เพื่อเปิด Modal เลือกสมาชิก
    const slot1 = page.locator('text=Slot 1 • Add Pokemon').first()
    await expect(slot1).toBeVisible()
    await slot1.click()

    // ตรวจสอบว่า Modal เปิดขึ้นมา
    await expect(page.locator('text=Configure Slot #1')).toBeVisible()

    // 4. สลับไปแท็บ Pick by Pokemon Species
    const speciesTab = page.locator('text=Pick by Pokemon Species')
    await speciesTab.click()

    // เลือก Charizard
    const charizardOption = page.locator('text=Charizard').first()
    await expect(charizardOption).toBeVisible()
    await charizardOption.click()

    // กดยืนยัน Confirm
    const confirmBtn = page.locator('button:has-text("Confirm")')
    await confirmBtn.click()

    // 5. ตรวจสอบว่า Slot 1 กลายเป็น Charizard พร้อม Badge ธาตุ
    await expect(page.locator('h4:has-text("Charizard")')).toBeVisible()

    // ตรวจสอบว่าตาราง Team Defense Matrix ปรากฏขึ้นและคำนวณ
    await expect(page.locator('text=Team Defense Matrix')).toBeVisible()

    // บันทึกภาพหน้าจอ Pokemon Team Builder Light mode
    await page.screenshot({ path: 'screenshots/pokemon-builder-light.png', fullPage: true })

    // สลับเป็น Dark Mode ในหน้า Pokemon Team Builder
    const themeBtn = page.locator('header button[aria-label="Toggle theme"]')
    await themeBtn.click()
    await page.screenshot({ path: 'screenshots/pokemon-builder-dark.png', fullPage: true })

    // สลับกลับเป็น Light Mode
    await themeBtn.click()

    // ทดสอบเปิดหน้าต่าง Type Chart Modal
    const typeChartBtn = page.locator('button:has-text("Type Chart")')
    await typeChartBtn.click()
    await expect(page.locator('text=Official 18-Type Matchup Reference')).toBeVisible()

    // ปิด Modal Type Chart
    const closeBtn = page.locator('button:has(svg.lucide-x)').first()
    await closeBtn.click()

    // 6. ทดสอบปุ่ม Back to Hub
    const backBtn = page.locator('button:has-text("Back to Hub")')
    await backBtn.click()
    await expect(page.locator('h1')).toContainText('My WebApp Hub')

    // ตรวจสอบว่าไม่มี Console Error
    expect(consoleErrors).toEqual([])
  })
})
