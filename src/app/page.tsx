'use client'

import { ErrorBoundary } from 'react-error-boundary'
import BookBuddy from '@/components/BookBuddy'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h2 className="text-xl font-bold mb-4">Something went wrong:</h2>
      <pre className="text-red-500">{error.message}</pre>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </div>
  )
}

export default function Home() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <main className="min-h-screen">
        <BookBuddy />
      </main>
    </ErrorBoundary>
  )
}