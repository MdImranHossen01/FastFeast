import Link from 'next/link';
import { FiAlertTriangle, FiHome, FiBriefcase, FiMessageSquare } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <main className="flex items-center justify-center min-h-[70vh] bg-gray-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center bg-white p-12 rounded-2xl shadow-lg max-w-2xl w-full">
        <div className="flex items-center justify-center mb-6">
          <FiAlertTriangle className="h-12 w-12 text-purple-500" />
        </div>
        <p className="text-base font-semibold text-purple-600">404 Error</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Oops! Page Not Found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved, deleted, or you may have mistyped the URL.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
          >
            Go back home
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-gray-900 hover:underline">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Helpful Links Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Here are some helpful links instead:
          </h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-purple-600">
            <Link href="/" className="flex items-center gap-2 hover:underline">
              <FiHome /> Home 
            </Link>
            <Link href="/services" className="flex items-center gap-2 hover:underline">
              <FiBriefcase /> Our Services
            </Link>
            <Link href="/blog" className="flex items-center gap-2 hover:underline">
              <FiMessageSquare /> Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
