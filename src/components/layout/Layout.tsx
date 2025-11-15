import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  console.log('Layout component rendering')
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 rtl">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout