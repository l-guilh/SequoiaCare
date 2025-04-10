import Link from "next/link"

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          <Link href="/services" className="nav-link">
            Services
          </Link>
        </li>
        <li>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}

