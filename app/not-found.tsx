import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-100 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-400 mb-8">Oops! The page you&apos;re looking for seems to have vanished into the digital void.</p>
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300 bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 h-9 px-4 py-2"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}