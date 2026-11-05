import React from 'react'
import type { WebAppItem } from '../types'
import { AppTile } from './AppTile'
import { AppWindow } from 'lucide-react'

interface LaunchpadGridProps {
  apps: WebAppItem[]
  onResetFilter?: () => void
}

export const LaunchpadGrid: React.FC<LaunchpadGridProps> = ({
  apps,
  onResetFilter,
}) => {
  if (apps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
          <AppWindow className="w-8 h-8" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
          ไม่พบ Web App ที่ค้นหา
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          ลองค้นหาด้วยคำอื่น หรือกดรีเซ็ตตัวกรอง
        </p>
        {onResetFilter && (
          <button
            onClick={onResetFilter}
            className="mt-4 px-4 py-1.5 text-xs font-medium rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            แสดงแอปทั้งหมด
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      {/* Launchpad App Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 sm:gap-y-8 gap-x-4 sm:gap-x-6 justify-items-center">
        {apps.map((app) => (
          <AppTile key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}
