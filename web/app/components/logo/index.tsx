'use client'

import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center">
      <span className="text-xl font-bold text-blue-600">LeanyAI</span>
    </Link>
  )
}

export default Logo