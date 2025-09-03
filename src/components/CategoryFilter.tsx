export const CategoryFilter = () => {
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

  return (
    <div className="w-64 pr-8">
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
  )
}
