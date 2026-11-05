import React from 'react'
import { Code2 } from 'lucide-react'
import { PORTAL_CONFIG } from '../config/apps.config'

export const LaunchpadFooter: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto py-8 px-4 mt-auto text-center flex flex-col items-center gap-2">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50">
        <Code2 className="w-3.5 h-3.5 text-blue-500" />
        <span>เพิ่ม/แก้ไข Webapp ได้ที่</span>
        <code className="text-blue-600 dark:text-blue-400 font-semibold">src/config/apps.config.ts</code>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500">
        {PORTAL_CONFIG.footerText}
      </p>
    </footer>
  )
}
