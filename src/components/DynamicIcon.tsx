import React from 'react'
import type { LucideProps } from 'lucide-react'
import {
  LayoutDashboard,
  BarChart3,
  Database,
  Bot,
  BookOpen,
  Server,
  SlidersHorizontal,
  HardDrive,
  Globe,
  AppWindow,
  FileText,
  Terminal,
  Settings,
  Code2,
  ShieldCheck,
  Cpu,
  Layers,
  Folder,
  Share2,
  Key,
  Workflow,
  Sparkles,
  Link,
  Monitor,
  Cloud,
} from 'lucide-react'

// Icon registry สำหรับไอคอนยอดนิยม (สามารถเพิ่มไอคอนที่ต้องการใช้ได้ที่นี่)
const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  LayoutDashboard,
  BarChart3,
  Database,
  Bot,
  BookOpen,
  Server,
  SlidersHorizontal,
  HardDrive,
  Globe,
  AppWindow,
  FileText,
  Terminal,
  Settings,
  Code2,
  ShieldCheck,
  Cpu,
  Layers,
  Folder,
  Share2,
  Key,
  Workflow,
  Sparkles,
  Link,
  Monitor,
  Cloud,
}

interface DynamicIconProps extends LucideProps {
  name: string
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = ICON_MAP[name] || AppWindow
  return <IconComponent {...props} />
}
