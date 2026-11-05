import React, { useEffect, useState } from 'react'
import { Sun, Moon, Search, Sparkles } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'
import { PORTAL_CONFIG } from '../config/apps.config'

interface LaunchpadHeaderProps {
  theme: Theme
  onToggleTheme: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  categories: string[]
  onSelectCategory: (category: string) => void
}

export const LaunchpadHeader: React.FC<LaunchpadHeaderProps> = ({
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  selectedCategory,
  categories,
  onSelectCategory,
}) => {
  const [time, setTime] = useState<string>('')
  const [date, setDate] = useState<string>('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      )
      setDate(
        now.toLocaleDateString('th-TH', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      )
    }
    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="w-full max-w-5xl mx-auto pt-8 pb-6 px-4 flex flex-col items-center">
      {/* Top Status & Controls Bar */}
      <div className="w-full flex items-center justify-between mb-8">
        {/* Clock & Date Badge */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
          <span className="text-slate-700 dark:text-slate-200 font-semibold">{time}</span>
          <span className="opacity-40">•</span>
          <span>{date}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="สลับโหมดมืด/สว่าง"
            className="p-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 transition-all duration-200 active:scale-90"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Main Portal Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-2">
          <span>{PORTAL_CONFIG.title}</span>
          <Sparkles className="w-5 h-5 text-amber-500 inline-block" />
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 max-w-md mx-auto">
          {PORTAL_CONFIG.subtitle}
        </p>
      </div>

      {/* Minimal Search Bar */}
      <div className="w-full max-w-md relative mb-5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ค้นหา Web App (พิมพ์ชื่อหรือหมวดหมู่)..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-slate-100/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 border border-slate-200/80 dark:border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ล้าง
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills (if categories exist) */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
