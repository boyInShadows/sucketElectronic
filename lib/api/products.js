export async function getProductsByCategory(categorySlug) {
  if (!categorySlug) {
    throw new Error("Category slug is required");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  try {
    const response = await fetch(
      `${apiUrl}/products/?category=${encodeURIComponent(categorySlug)}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 404) {
      return [];
    }

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}
