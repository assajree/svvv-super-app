# 🚀 My WebApp Hub (Super App & Launchpad Portal)

> 🌐 **Live Demo (GitHub Pages):** [https://assajree.github.io/svvv-super-app/](https://assajree.github.io/svvv-super-app/)  
> 📦 **GitHub Repository:** [https://github.com/assajree/svvv-super-app](https://github.com/assajree/svvv-super-app)

เว็บรวม Web Application ส่วนตัวและระบบงาน สไตล์ **Minimal Dock / macOS Launchpad & Google App Grid** เรียบหรู คลีน สวยงาม โหลดเร็ว ด้วย Vite + React + TypeScript + Tailwind CSS

รองรับทั้ง **การเปิดลิงก์ไปยัง Web App ภายนอก** และ **การรันแอปพลิเคชันภายในตัว (Built-in Micro-apps)** โดยไม่ต้องเปลี่ยนหน้า

---

## ✨ จุดเด่นและฟีเจอร์

- **🎨 Minimal App Grid Layout**: การ์ดไอคอนแอปสไตล์ Squircle ทรงมน พร้อม Gradient เคลือบแก้ว และ Hover Animation
- **🧩 Built-in Micro-apps Support**: รองรับการสร้างและรันแอปภายในตัวพอร์ทัลผ่าน Client-side Hash Routing (เช่น Pokemon Team Builder)
- **🌓 Dark / Light Mode**: สลับโหมดมืด-สว่างได้ราบรื่น บันทึกค่าลง LocalStorage อัตโนมัติ (Tailwind CSS v4 Custom Variant)
- **🔍 Quick Search & Category Filter**: ค้นหาด่วนตามชื่อ คำอธิบาย หรือเลือกดูตามหมวดหมู่
- **⚡ Ultra Fast & Lightweight**: รวดเร็ว ขนาด Bundle เบา โหลดแสดงผลได้ทันที
- **🤖 Headless E2E Browser Testing**: มีระบบ Playwright Automated Test ตรวจสอบ Error และถ่ายภาพหน้าจอให้อัตโนมัติ
- **🛠️ Zero-Backend & Git-based**: บริหารจัดการรายชื่อแอปทั้งหมดผ่านไฟล์ Config หรือเขียนโค้ดเพิ่มแอปได้ง่ายดาย

---

## 🎮 Built-in Apps ที่ติดตั้งพร้อมใช้งาน

- **🛡️ Pokemon Team Builder (`#/pokemon-builder`)**
  - วิเคราะห์จุดแข็ง-จุดอ่อนของทีมโปเกมอนตาม Type Matchup ทั้ง 18 ธาตุ
  - ตารางเมทริกซ์คำนวณความต้านทาน (Resistances) และการแพ้ทาง (Weaknesses) รวม
  - ระบบค้นหาและเลือกจากรายชื่อโปเกมอนจริง หรือระบุเฉพาะ Type ผสมเองได้
  - AI / Rule-based Recommender แนะนำโปเกมอนและธาตุที่ช่วยมาปิดจุดอ่อนของทีม

---

## 📁 โครงสร้างโปรเจกต์ (Folder Structure)

```text
svvv_web/
├── source/                  # 📦 โค้ดต้นฉบับ/โปรเจกต์ภายนอกสำหรับนำมา Convert (git-ignored)
├── public/                  # Static assets และ Favicon
├── src/
│   ├── apps/                # 🧩 Built-in Micro-apps ภายในตัวพอร์ทัล
│   │   └── pokemon-team-builder/  # แอป Pokemon Team Builder
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
│   ├── App.tsx                  # หน้าหลักและ Routing สลับแอป
│   ├── index.css                # Tailwind CSS v4 styling & dark mode setup
│   └── main.tsx                 # Entry point ของ React
├── tests/
│   └── launchpad.spec.ts    # สคริปต์ Playwright Headless Browser Test
├── screenshots/             # ภาพถ่ายหน้าจอทดสอบ Light & Dark mode
├── _start.bat               # ดับเบิลคลิกเพื่อเปิดเว็บทันที (Dev Server + Browser)
├── _build.bat               # ดับเบิลคลิกเพื่อ Build โปรเจกต์
├── _test-browser.bat        # ดับเบิลคลิกเพื่อรัน Headless Browser Test
├── _push.bat                # ดับเบิลคลิกเพื่อ Push โค้ดขึ้น GitHub
├── AGENTS.md                # คู่มือและข้อตกลงสำหรับ AI Coding Agents
├── package.json
└── vite.config.ts           # การตั้งค่า Vite + Tailwind Plugin (Relative Base Path)
```

---

## 📝 วิธีเพิ่ม Webapp ใหม่

เปิดไฟล์ [`src/config/apps.config.ts`](file:///d:/me/svvv_web/src/config/apps.config.ts) แล้วเพิ่มข้อมูลเข้าไปใน Array `WEB_APPS`:

### แบบที่ 1: ลิงก์ไปยังเว็บแอปภายนอก (เปิดแท็บใหม่)
```typescript
{
  id: 'my-external-app',
  title: 'ชื่อเว็บแอปภายนอก',
  description: 'คำอธิบายสั้นๆ เกี่ยวกับแอป',
  url: 'https://my-domain.com/app',
  icon: 'Globe',                           // ชื่อ Lucide Icon (เช่น Server, Bot, BarChart3)
  category: 'เครื่องมือ',
  badge: 'PROD',
  gradient: 'from-blue-500 to-indigo-600',
  isExternal: true,                        // เปิดแท็บใหม่
}
```

### แบบที่ 2: Built-in Micro-app ภายในเว็บ (เปิดในหน้าเดิม)
```typescript
{
  id: 'my-internal-tool',
  title: 'เครื่องมือภายใน',
  description: 'รันภายในพอร์ทัลโดยตรง',
  url: '#/my-tool',                        // กำหนด Hash URL
  icon: 'Cpu',
  category: 'Tools',
  badge: 'BUILT-IN',
  gradient: 'from-purple-500 to-pink-600',
  isExternal: false,                       // แสดงผลผ่าน App.tsx ในหน้าเดิม
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
ไฟล์ที่พร้อมใช้งานจะอยู่ในโฟลเดอร์ `dist/` สามารถนำไปอัปโหลดขึ้น **GitHub Pages**, **Vercel**, **Cloudflare Pages**, หรือโฮสติ้งใดๆ ได้ทันที!

---

## 🌐 การ Deploy ขึ้น GitHub Pages

โปรเจกต์นี้ตั้งค่า **GitHub Actions CI/CD** ไว้ใน [`.github/workflows/deploy.yml`](file:///.github/workflows/deploy.yml) ให้เรียบร้อยแล้ว:

1. **Push โค้ดขึ้น GitHub Repository** ของคุณ:
   ```bash
   git push -u github master
   # หรือดับเบิลคลิกไฟล์ _push.bat
   ```

2. **เปิดการใช้งาน GitHub Pages บนหน้าเว็บ GitHub**:
   - ไปที่แท็บ **Settings** ของ Repository บน GitHub
   - เลื่อนแถบซ้ายเลือก **Pages**
   - ในส่วน **Build and deployment > Source** ให้เลือกเป็น **`GitHub Actions`**

หลังจากนั้น GitHub Actions จะ Build และปล่อยเว็บขึ้นออนไลน์ที่ URL:
👉 **[https://assajree.github.io/svvv-super-app/](https://assajree.github.io/svvv-super-app/)** ให้อัตโนมัติทุกครั้งที่มีการ Push โค้ดครับ!
