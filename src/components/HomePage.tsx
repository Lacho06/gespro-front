import { CategoryFilter } from './CategoryFilter'
import { ProductCard } from './ProductCard'
import { useShopCart } from '@/stores/shopCartStore'

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Bagel with poppy seeds',
    price: 1.5,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdqJQBVCaBZIkkWIDgYG6f2LaFJSQQ201UQ&s'
  },
  {
    id: 2,
    name: 'Berliner donut with jam',
    price: 2.0,
    image: '/images/donut.jpg'
  },
  {
    id: 3,
    name: 'Bread triangle with seeds',
    price: 1.0,
    image: '/images/bread.jpg'
  },
  {
    id: 4,
    name: 'Cinnamon roll with raisins',
    price: 2.0,
    image: '/images/cinnamon-roll.jpg'
  },
  {
    id: 5,
    name: 'Fair trade allepo soap',
    price: 4.5,
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4XhjKQbIOyMDl558xmSa2P08XjEO79ZWhbA&s'
  },
  {
    id: 6,
    name: 'Organic American blueberries',
    price: 2.0,
    image: '/images/blueberries.jpg'
  }
]

export const HomePage = () => {
  const { addProduct } = useShopCart()

  const handleAddToCart = (productId: number) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId)
    if (product) {
      addProduct(product)
    }
  }

  return (
    <main className="container mx-auto px-6 py-8">
      <div className="flex">
        {/* Desktop Categories */}
        <div className="hidden md:block">
          <CategoryFilter />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-2 lg:gap-6 lg:max-w-[800px] lg:mx-auto">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                onAddToCart={() => handleAddToCart(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
