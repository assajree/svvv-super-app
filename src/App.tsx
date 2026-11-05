import { useMemo, useState } from 'react'
import { WEB_APPS } from './config/apps.config'
import { useTheme } from './hooks/useTheme'
import { LaunchpadHeader } from './components/LaunchpadHeader'
import { LaunchpadGrid } from './components/LaunchpadGrid'
import { LaunchpadFooter } from './components/LaunchpadFooter'

export function App() {
  const { theme, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด')

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>()
    WEB_APPS.forEach((app) => {
      if (app.category) set.add(app.category)
    })
    return ['ทั้งหมด', ...Array.from(set)]
  }, [])

  // Filter apps by search query and category
  const filteredApps = useMemo(() => {
    return WEB_APPS.filter((app) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (app.description &&
          app.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (app.category &&
          app.category.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        selectedCategory === 'ทั้งหมด' || app.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const handleResetFilter = () => {
    setSearchQuery('')
    setSelectedCategory('ทั้งหมด')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col relative overflow-x-hidden transition-colors duration-300">
      {/* Ambient background blur elements (macOS wallpaper effect) */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[15%] w-[450px] h-[450px] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <LaunchpadHeader
          theme={theme}
          onToggleTheme={toggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          categories={categories}
          onSelectCategory={setSelectedCategory}
        />

        <main className="flex-1 flex flex-col justify-center">
          <LaunchpadGrid
            apps={filteredApps}
            onResetFilter={handleResetFilter}
          />
        </main>

        <LaunchpadFooter />
      </div>
    </div>
  )
}

export default App
