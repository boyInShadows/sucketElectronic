"use client";

import React from "react";
import CategoryPage from "@/app/components/pages/products/CategoryPage";

/**
 * Category Page
 * Renders the CategoryPage component with the category slug from the URL
 */
export default function Page({ params }) {
  const category = React.use(params);
  return <CategoryPage categorySlug={category.category} />;
}
