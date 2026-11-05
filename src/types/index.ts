export interface WebAppItem {
  id: string
  title: string
  description?: string
  url: string
  // icon can be a Lucide icon component, or a Lucide icon name, or an image URL / emoji
  icon: string
  category?: string
  badge?: string
  // Tailwind gradient or background styling for icon tile
  gradient?: string
  isExternal?: boolean
}

export interface AppCategory {
  id: string
  name: string
  icon?: string
}
