import { useStore } from '@tanstack/react-store'
import { Store } from '@tanstack/store'

interface CartProduct {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface ShopCartState {
  products: Array<CartProduct>
  subtotal: number
}

const initialState: ShopCartState = {
  products: [],
  subtotal: 0
}

class ShopCartStore extends Store<ShopCartState> {
  constructor() {
    super(initialState)
  }

  addProduct(product: Omit<CartProduct, 'quantity'>) {
    this.setState((state) => {
      const existingProduct = state.products.find((p) => p.id === product.id)

      if (existingProduct) {
        // If product exists, increase quantity
        const updatedProducts = state.products.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
        return {
          products: updatedProducts,
          subtotal: this.calculateSubtotal(updatedProducts)
        }
      }

      // If product doesn't exist, add it with quantity 1
      const updatedProducts = [...state.products, { ...product, quantity: 1 }]
      return {
        products: updatedProducts,
        subtotal: this.calculateSubtotal(updatedProducts)
      }
    })
  }

  removeProduct(productId: number) {
    this.setState((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== productId)
      return {
        products: updatedProducts,
        subtotal: this.calculateSubtotal(updatedProducts)
      }
    })
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) {
      this.removeProduct(productId)
      return
    }

    this.setState((state) => {
      const updatedProducts = state.products.map((p) =>
        p.id === productId ? { ...p, quantity } : p
      )
      return {
        products: updatedProducts,
        subtotal: this.calculateSubtotal(updatedProducts)
      }
    })
  }

  clearCart() {
    this.setState({
      products: [],
      subtotal: 0
    })
  }

  private calculateSubtotal(products: Array<CartProduct>): number {
    if (products.length === 0) return 0
    return products.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

export const shopCartStore = new ShopCartStore()

// Hook para usar el store en componentes
export const useShopCart = () => {
  const state = useStore(shopCartStore)

  return {
    ...state,
    addProduct: shopCartStore.addProduct.bind(shopCartStore),
    removeProduct: shopCartStore.removeProduct.bind(shopCartStore),
    updateQuantity: shopCartStore.updateQuantity.bind(shopCartStore),
    clearCart: shopCartStore.clearCart.bind(shopCartStore)
  }
}

// Exportar tipos para reutilización
export type { CartProduct, ShopCartState }
