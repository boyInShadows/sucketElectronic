import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category_id = searchParams.get("category_id");

    // Make request to Django backend
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`);
    if (category_id) {
      url.searchParams.append("category_id", category_id);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in products API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Make request to Django backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: request.headers.get("Authorization"),
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create product");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in products API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
