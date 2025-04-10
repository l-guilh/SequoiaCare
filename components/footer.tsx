import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto text-center">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/" className="text-gray-500 hover:text-gray-700 mr-4">
            Home
          </Link>
          <Link href="/contact" className="text-gray-500 hover:text-gray-700 mr-4">
            Contact
          </Link>
          <Link href="/privacy" className="text-gray-500 hover:text-gray-700">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

