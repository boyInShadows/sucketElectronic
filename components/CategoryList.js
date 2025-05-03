import Link from "next/link";

export default function CategoryList({ categories }) {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/products/${category.slug}`}
          className="block px-4 py-2 text-neutral-800 hover:bg-primary hover:text-white rounded-md transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
