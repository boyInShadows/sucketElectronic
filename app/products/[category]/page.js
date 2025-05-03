import { getProductsByCategory } from "@/lib/api/products";
import ProductCard from "@/app/components/pages/products/productCard";

export async function generateMetadata({ params }) {
  const category = params?.category
    ? decodeURIComponent(params.category)
    : "Products";
  return {
    title: `${category} | Omid Electronic`,
    description: `Browse our selection of ${category} products`,
  };
}

export default async function CategoryPage({ params }) {
  if (!params?.category) {
    return <div>Category not found</div>;
  }

  const categorySlug = decodeURIComponent(params.category);
  const products = await getProductsByCategory(categorySlug);

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          No products found in this category
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{categorySlug}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
