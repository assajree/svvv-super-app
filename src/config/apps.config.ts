import type { WebAppItem } from '../types'

/**
 * กำหนดรายชื่อ Web Apps ทั้งหมดของคุณที่นี่
 * - เพิ่ม ลบ หรือแก้ไขรายการได้ง่ายๆ ตามโครงสร้างด้านล่าง
 * - icon: รองรับชื่อ Lucide icon เช่น 'LayoutDashboard', 'Database', 'Bot', 'BarChart3', 'FileText', 'Server', 'Globe' ฯลฯ
 * - gradient: โทนสีพื้นหลังไอคอนสไตล์ Modern App Icon
 */
export const WEB_APPS: WebAppItem[] = [
  {
    id: 'dashboard',
    title: 'Main Dashboard',
    description: 'ศูนย์ควบคุมและภาพรวมระบบทั้งหมด',
    url: 'https://example.com/dashboard',
    icon: 'LayoutDashboard',
    category: 'Management',
    badge: 'PROD',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    description: 'ระบบสถิติและการวิเคราะห์ข้อมูล',
    url: 'https://example.com/analytics',
    icon: 'BarChart3',
    category: 'Analytics',
    gradient: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'database-admin',
    title: 'DB Studio',
    description: 'เครื่องมือจัดการฐานข้อมูลและสคีมา',
    url: 'https://example.com/db',
    icon: 'Database',
    category: 'Developer',
    badge: 'INTERNAL',
    gradient: 'from-amber-400 to-orange-600',
  },
  {
    id: 'ai-assistant',
    title: 'AI Playground',
    description: 'แอปสนทนาและทดสอบโมเดล AI',
    url: 'https://example.com/ai',
    icon: 'Bot',
    category: 'AI / Tools',
    badge: 'BETA',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'docs-portal',
    title: 'Documentation',
    description: 'เอกสารคู่มือการใช้งานระบบและ API',
    url: 'https://example.com/docs',
    icon: 'BookOpen',
    category: 'Documentation',
    gradient: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'server-monitor',
    title: 'Server Status',
    description: 'ตรวจสอบสถานะ Uptime และสถานะเซิร์ฟเวอร์',
    url: 'https://example.com/status',
    icon: 'Server',
    category: 'Operations',
    gradient: 'from-rose-500 to-red-600',
  },
  {
    id: 'settings-hub',
    title: 'System Settings',
    description: 'ตั้งค่าระบบและการเข้าถึง',
    url: 'https://example.com/settings',
    icon: 'SlidersHorizontal',
    category: 'Management',
    gradient: 'from-slate-600 to-zinc-800',
  },
  {
    id: 'cloud-storage',
    title: 'Cloud Storage',
    description: 'ระบบจัดการไฟล์และพื้นที่เก็บข้อมูล',
    url: 'https://example.com/storage',
    icon: 'HardDrive',
    category: 'Operations',
    gradient: 'from-sky-400 to-indigo-500',
  },
]

export const PORTAL_CONFIG = {
  title: 'My WebApp Hub',
  subtitle: 'ศูนย์รวมเว็บแอปพลิเคชันส่วนตัวและระบบงาน',
  footerText: 'Powered by Vite + React + Tailwind CSS',
}
