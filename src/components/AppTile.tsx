import React from 'react'
import type { WebAppItem } from '../types'
import { DynamicIcon } from './DynamicIcon'
import { ExternalLink } from 'lucide-react'

interface AppTileProps {
  app: WebAppItem
}

export const AppTile: React.FC<AppTileProps> = ({ app }) => {
  return (
    <a
      href={app.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center justify-start text-center p-3 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* App Icon Container (macOS Launchpad / iOS Squircle Style) */}
      <div className="relative mb-3">
        <div
          className={`w-20 h-20 sm:w-22 sm:h-22 rounded-[1.35rem] bg-gradient-to-br ${
            app.gradient || 'from-gray-700 to-gray-900'
          } p-[1px] shadow-lg shadow-black/10 dark:shadow-black/40 group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center`}
        >
          {/* Inner Gloss / Texture */}
          <div className="w-full h-full rounded-[1.3rem] flex items-center justify-center relative overflow-hidden bg-white/10 backdrop-blur-xs">
            {/* Top Gloss Reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/20 pointer-events-none" />

            {/* Icon */}
            <DynamicIcon
              name={app.icon}
              className="w-10 h-10 text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.8}
            />

            {/* External link micro icon on hover */}
            <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ExternalLink className="w-3.5 h-3.5 text-white/80" />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        {app.badge && (
          <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-slate-900/90 dark:bg-white text-white dark:text-slate-900 shadow border border-white/20 dark:border-slate-800">
            {app.badge}
          </span>
        )}
      </div>

      {/* App Title */}
      <span className="text-sm font-medium tracking-tight text-slate-800 dark:text-slate-100 max-w-[120px] truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {app.title}
      </span>

      {/* Subtle Description / Category */}
      {app.description && (
        <span className="text-[11px] text-slate-400 dark:text-slate-500 max-w-[120px] truncate mt-0.5">
          {app.description}
        </span>
      )}
    </a>
  )
}
