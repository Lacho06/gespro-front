import { Link, useNavigate } from '@tanstack/react-router'
import { Badge, Drawer, InputNumber } from 'antd'
import { Menu, ShoppingCart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useShopCart } from '@/stores/shopCartStore'

export const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { products, subtotal, removeProduct, updateQuantity } = useShopCart()
  const navigate = useNavigate()

  const categories = [
    'Bestsellers',
    'Bakery',
    'Cosmetics',
    'Fruit & Vegetables',
    'Grains',
    'Herbs & Spices',
    'Household',
    'Legumes',
    'Nuts',
    'Tea & Coffee'
  ]

  const goToCart = () => {
    setIsCartOpen(false)
    setIsMenuOpen(false)
    navigate({ to: '/cart' })
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-12 h-12 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            activeProps={{ className: 'text-gray-900' }}
            inactiveProps={{ className: 'text-gray-600' }}
            className="hover:text-gray-900 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/orders"
            activeProps={{ className: 'text-gray-900' }}
            inactiveProps={{ className: 'text-gray-600' }}
            className="hover:text-gray-900 font-medium transition-colors"
          >
            My Orders
          </Link>
        </div>

        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="text-gray-900">
            ClaudiaStore
          </Link>
        </div>

        {/* Cart button */}
        <div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1C1C1C] text-white hover:bg-gray-800 transition-colors"
          >
            <Badge count={products.length} size="small">
              <ShoppingCart size={20} className="text-white" />
            </Badge>
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <Drawer
        title="ClaudiaStore"
        placement="left"
        onClose={() => setIsMenuOpen(false)}
        open={isMenuOpen}
      >
        <div className="flex flex-col">
          <div className="mb-8">
            <Link
              to="/"
              className="block py-2 text-gray-800 hover:text-gray-900 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/orders"
              className="block py-2 text-gray-800 hover:text-gray-900 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              My Orders
            </Link>
          </div>
          <div>
            <h2 className="text-xl font-medium mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <button className="text-gray-700 hover:text-gray-900 transition-colors w-full text-left py-1">
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Drawer>

      {/* Cart Drawer */}
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={() => setIsCartOpen(false)}
        open={isCartOpen}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            {products.length === 0 ? (
              <p className="text-gray-500 text-center mt-4">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-start gap-4 border-b pb-4"
                  >
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-sm font-bold mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <InputNumber
                          min={1}
                          value={product.quantity}
                          onChange={(value) =>
                            updateQuantity(product.id, value || 1)
                          }
                          className="w-20"
                        />
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <button
              disabled={products.length === 0}
              className="w-full py-2 bg-[#1C1C1C] text-white rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={goToCart}
            >
              Checkout
            </button>
          </div>
        </div>
      </Drawer>
    </nav>
  )
}
