import { createFileRoute } from '@tanstack/react-router'

const OrdersPage = () => {
  return (
    <main className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="bg-white rounded-lg p-6">
        <p className="text-gray-500 text-center">No orders yet</p>
      </div>
    </main>
  )
}

export const Route = createFileRoute('/_HomeLayout/orders')({
  component: OrdersPage
})
