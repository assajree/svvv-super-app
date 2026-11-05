# 🚀 My WebApp Hub (Launchpad Portal)

เว็บรวม Web Application ส่วนตัวและระบบงาน สไตล์ **Minimal Dock / macOS Launchpad & Google App Grid** เรียบหรู คลีน สวยงาม โหลดเร็ว ด้วย Vite + React + TypeScript + Tailwind CSS

---

## ✨ จุดเด่นและฟีเจอร์

- **🎨 Minimal App Grid Layout**: การ์ดไอคอนแอปสไตล์ Squircle ทรงมน พร้อม Gradient และ Micro-interaction เมื่อชี้เมาส์ (Hover Effect)
- **🌓 Dark / Light Mode**: สลับโหมดมืด-สว่างได้ง่ายดาย บันทึกการตั้งค่าลง LocalStorage อัตโนมัติ
- **🔍 Quick Search & Category Filter**: ค้นหาด่วนตามชื่อ คำอธิบาย หรือแท็กหมวดหมู่
- **⚡ Ultra Fast & Lightweight**: ขนาด JS Bundle เพียง ~76 kB (gzipped) โหลดเปิดเว็บได้ในเสี้ยววินาที
- **🛠️ Zero-Backend Management**: จัดการรายชื่อ Webapp ทั้งหมดผ่านไฟล์ Config เพียงไฟล์เดียว

---

## 📁 โครงสร้างโปรเจกต์ (Folder Structure)

```text
svvv_web/
├── public/                  # Static assets และ Favicon
├── src/
│   ├── config/
│   │   └── apps.config.ts   # ⭐️ ไฟล์กำหนดรายชื่อ Webapp ทั้งหมดของคุณที่นี่
│   ├── components/
│   │   ├── AppTile.tsx          # การ์ดไอคอน Webapp แต่ละตัว (Launchpad Squircle)
│   │   ├── DynamicIcon.tsx      # ตัวแปลงชื่อไอคอน Lucide แสดงผลแบบ Dynamic
│   │   ├── LaunchpadHeader.tsx  # ส่วนหัวของหน้าเว็บ (นาฬิกา, ปุ่มสลับธีม, ช่องค้นหา)
│   │   ├── LaunchpadGrid.tsx    # ตารางจัดวางการ์ดแอปทั้งหมด
│   │   └── LaunchpadFooter.tsx  # ส่วนท้ายของหน้าเว็บ
│   ├── hooks/
│   │   └── useTheme.ts          # Hook จัดการ Dark / Light mode
│   ├── types/
│   │   └── index.ts             # TypeScript interface ของ WebAppItem
│   ├── lib/
│   │   └── utils.ts             # Tailwind class merging utility (cn)
│   ├── App.tsx                  # หน้าหลัก (Main Component)
│   ├── index.css                # Tailwind CSS v4 styling & theme tokens
│   └── main.tsx                 # Entry point ของ React
├── index.html               # โครงสร้างหน้าเว็บหลักและฟอนต์ Inter / Prompt
├── package.json
├── tsconfig.json
└── vite.config.ts           # การตั้งค่า Vite + Tailwind Plugin
```

---

## 📝 วิธีเพิ่ม Webapp ใหม่

เปิดไฟล์ [`src/config/apps.config.ts`](file:///d:/me/svvv_web/src/config/apps.config.ts) แล้วเพิ่ม Object ใหม่เข้าไปใน Array `WEB_APPS`:

```typescript
{
  id: 'my-new-app',                    // รหัสเฉพาะของแอป
  title: 'ชื่อเว็บแอปของคุณ',            // ชื่อที่แสดงใต้ไอคอน
  description: 'คำอธิบายสั้นๆ',          // คำอธิบาย (แสดงตอน hover/search)
  url: 'https://my-domain.com/app',    // URL สำหรับเปิดแอป
  icon: 'Sparkles',                    // ชื่อไอคอน Lucide (เช่น Globe, Server, Bot ฯลฯ)
  category: 'เครื่องมือ',               // หมวดหมู่สำหรับกรอง
  badge: 'PROD',                       // แท็กสถานะมุมบนขวา (เช่น PROD, BETA, DEV)
  gradient: 'from-blue-500 to-indigo-600', // โทนสีพื้นหลังไอคอน Tailwind
}
```

---

## 💻 วิธีการรันโปรเจกต์

### 1. รันโหมด Development (รันดูตัวอย่าง)
```bash
npm run dev
# หรือดับเบิลคลิกไฟล์ _start.bat
```
เปิดบราวเซอร์ที่ลิงก์: `http://localhost:5173`

### 2. รัน Headless Browser Automated Test (ให้ AI หรือ CI เข้าไปทดสอบ)
```bash
npm run test:browser
# หรือดับเบิลคลิกไฟล์ _test-browser.bat
```
สคริปต์จะเปิด Headless Chromium เพื่อทดสอบหน้าเว็บ ตรวจสอบ Console Error และบันทึกภาพหน้าจอลงในโฟลเดอร์ `screenshots/`

### 3. รันโหมด Debug แบบเห็นหน้าต่าง Browser จริง
```bash
npm run test:debug
```

### 4. Build สำหรับ Deploy จริง (Production)
```bash
npm run build
# หรือดับเบิลคลิกไฟล์ _build.bat
```
ไฟล์ที่พร้อมใช้งานจะอยู่ในโฟลเดอร์ `dist/` สามารถนำไปอัปโหลดขึ้น **Vercel**, **Cloudflare Pages**, **Netlify**, หรือโฮสติ้งใดๆ ได้ทันที!

---

## 🌐 การ Deploy ขึ้น GitHub Pages (ฟรี 100%)

โปรเจกต์นี้ตั้งค่า **GitHub Actions CI/CD** ไว้ใน [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml) ให้แล้ว สามารถขึ้นออนไลน์ได้ง่ายๆ ใน 2 ขั้นตอน:

1. **Push โค้ดขึ้น GitHub Repository** ของคุณ:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/<username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```

2. **เปิดการใช้งาน GitHub Pages บนหน้าเว็บ GitHub**:
   - ไปที่แท็บ **Settings** ของ Repository บน GitHub
   - เลื่อนแถบซ้ายเลือก **Pages**
   - ในส่วน **Build and deployment > Source** ให้เปลี่ยนเป็น **`GitHub Actions`**

หลังจากนั้น GitHub Actions จะ Build และปล่อยเว็บขึ้นออนไลน์ที่ URL:
`https://<username>.github.io/<repo-name>/` ให้อัตโนมัติทุกครั้งที่มีการ Push โค้ดครับ!
