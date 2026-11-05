import React from 'react'
import type { LucideProps } from 'lucide-react'
import { cn } from '../lib/utils'
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
  Shield,
  Swords,
  Gamepad2,
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
  Shield,
  Swords,
  Gamepad2,
}

interface DynamicIconProps extends LucideProps {
  name: string
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className, ...props }) => {
  if (
    name &&
    (name.startsWith('data:') ||
      name.startsWith('/') ||
      name.startsWith('http') ||
      name.includes('.png') ||
      name.includes('.jpg') ||
      name.includes('.webp') ||
      name.includes('.svg'))
  ) {
    return <img src={name} alt="" className={cn('object-contain', className)} />
  }

  const IconComponent = ICON_MAP[name] || AppWindow
  return <IconComponent className={className} {...props} />
}
