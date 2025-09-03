import { Link } from '@tanstack/react-router'
import { Button } from 'antd'

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between w-full">
        <Link to="/">Claudia Store</Link>

        <Button>Carrito</Button>
      </nav>
    </header>
  )
}
