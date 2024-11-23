'use client'

import { useState } from 'react'
import BookBuddy from '@/components/BookBuddy'

export default function Home() {
  const [error, setError] = useState<Error | null>(null)

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold mb-4">Something went wrong:</h2>
        <pre className="text-red-500">{error.message}</pre>
        <button
          className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <BookBuddy />
    </main>
  )
}