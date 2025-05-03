export async function getProductsByCategory(categoryId) {
  try {
    const response = await fetch(`/api/products/?category_id=${categoryId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}
