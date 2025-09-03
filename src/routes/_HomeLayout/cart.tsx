import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useShopCart } from '../../stores/shopCartStore'
import { InputNumber } from 'antd'
import { Trash2 } from 'lucide-react'

type PaymentMethod = 'cash' | 'transfer'
type ShippingMethod = 'pickup' | 'delivery'

export const Route = createFileRoute('/_HomeLayout/cart')({
  component: CartPage
})

function CartPage() {
  const { products, subtotal, updateQuantity, removeProduct } = useShopCart()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('pickup')

  const handlePayment = () => {
    // TODO: Implement payment logic
    console.log('Processing payment:', {
      products,
      subtotal,
      paymentMethod,
      shippingMethod
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column - Payment & Shipping (3 columns) */}
        <div className="col-span-3 space-y-6">
          {/* Payment Method Selection */}
          <div className="bg-white border border-gray-200 p-6 rounded-md">
            <h2 className="text-lg font-medium mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:border-gray-300 transition-colors">
                <input
                  type="radio"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                  name="paymentMethod"
                  className="form-radio accent-[#1C1C1C]"
                />
                <span className="font-medium text-gray-800">Cash</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:border-gray-300 transition-colors">
                <input
                  type="radio"
                  checked={paymentMethod === 'transfer'}
                  onChange={() => setPaymentMethod('transfer')}
                  name="paymentMethod"
                  className="form-radio accent-[#1C1C1C]"
                />
                <span className="font-medium text-gray-800">Bank Transfer</span>
              </label>
            </div>
          </div>

          {/* Shipping Method Selection */}
          <div className="bg-white border border-gray-200 p-6 rounded-md">
            <h2 className="text-lg font-medium mb-4">Shipping Method</h2>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:border-gray-300 transition-colors">
                <input
                  type="radio"
                  checked={shippingMethod === 'pickup'}
                  onChange={() => setShippingMethod('pickup')}
                  name="shippingMethod"
                  className="form-radio accent-[#1C1C1C]"
                />
                <span className="font-medium text-gray-800">Store Pickup</span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md cursor-pointer hover:border-gray-300 transition-colors">
                <input
                  type="radio"
                  checked={shippingMethod === 'delivery'}
                  onChange={() => setShippingMethod('delivery')}
                  name="shippingMethod"
                  className="form-radio accent-[#1C1C1C]"
                />
                <span className="font-medium text-gray-800">Home Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Middle Column - Cart Items (6 columns) */}
        <div className="col-span-6">
          <div className="bg-white border border-gray-200 p-6 rounded-md">
            <h2 className="text-lg font-medium mb-6">Cart Items</h2>
            <div className="space-y-6">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="font-bold text-gray-800 mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <InputNumber
                          min={1}
                          value={item.quantity}
                          onChange={(value) =>
                            updateQuantity(item.id, value || 1)
                          }
                          className="w-20"
                        />
                        <button
                          onClick={() => removeProduct(item.id)}
                          className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Total and Payment (3 columns) */}
        <div className="col-span-3">
          <div className="bg-white border border-gray-200 p-6 rounded-md sticky top-4">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="font-medium text-gray-800">Total:</span>
                <span className="font-bold text-gray-900 text-2xl mt-1">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handlePayment}
                className="w-full py-2 bg-[#1C1C1C] text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
