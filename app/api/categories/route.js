import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // Get API URL with fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    // Make request to Django backend
    const djangoUrl = `${apiUrl}/api/categories/?slug=${slug}`;

    const response = await fetch(djangoUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Django backend error:", data);
      return NextResponse.json(
        { error: data.detail || "Failed to fetch category" },
        { status: response.status }
      );
    }

    // If no results found, return 404
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ results: data });
  } catch (error) {
    console.error("Error in categories API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
