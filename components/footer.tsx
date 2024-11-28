import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} VRV Security. All rights reserved.
          </div>
          <nav className="flex space-x-4 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-600">
              Privacy Policy
            </Link>
            <Link href="/" className="text-gray-500 hover:text-gray-600">
              Terms of Service
            </Link>
            <Link href="/" className="text-gray-500 hover:text-gray-600">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
