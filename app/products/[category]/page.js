"use client";

import CategoryPage from "../../components/pages/products/CategoryPage";

/**
 * Category Page
 * Renders the CategoryPage component with the category slug from the URL
 */
export default function Page({ params }) {
  return <CategoryPage categorySlug={params.category} />;
}
