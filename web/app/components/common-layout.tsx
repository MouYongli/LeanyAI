'use client'

import React from 'react'
import Header from './header'

interface CommonLayoutProps {
  children: React.ReactNode
}

const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />
      <main className="flex-1 p-6">
        {children}
      </main>
      <footer className="bg-gray-50 py-6 px-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} LeanyAI. All rights reserved.
      </footer>
    </div>
  )
}

export default CommonLayout