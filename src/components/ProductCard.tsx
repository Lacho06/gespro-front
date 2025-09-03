interface ProductCardProps {
  image: string
  name: string
  price: number
  onAddToCart: () => void
}

export const ProductCard = ({
  image,
  name,
  price,
  onAddToCart
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg p-3 md:p-4 flex flex-col">
      <div className="aspect-square overflow-hidden rounded-lg mb-2 md:mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-sm md:text-lg font-medium mb-1 md:mb-2 line-clamp-2">
        {name}
      </h3>
      <div className="mt-auto">
        <p className="text-base md:text-lg font-bold mb-2 md:mb-3">
          ${price.toFixed(2)}
        </p>
        <button
          onClick={onAddToCart}
          className="w-full py-1.5 md:py-2 bg-[#1C1C1C] text-white text-sm md:text-base rounded-md hover:bg-gray-800 transition-colors"
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}
