import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    console.log("Received request for category with slug:", slug);

    if (!slug) {
      console.log("No slug provided");
      return NextResponse.json(
        { error: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // Get API URL with fallback
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    console.log("Using API URL:", apiUrl);

    // Make request to Django backend
    const djangoUrl = `${apiUrl}/api/categories/?slug=${slug}`;
    console.log("Making request to Django backend:", djangoUrl);

    const response = await fetch(djangoUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    console.log("Django response status:", response.status);
    const data = await response.json();
    console.log("Django response data:", data);

    if (!response.ok) {
      console.error("Django backend error:", data);
      return NextResponse.json(
        { error: data.detail || "Failed to fetch category" },
        { status: response.status }
      );
    }

    // If no results found, return 404
    if (!Array.isArray(data) || data.length === 0) {
      console.log("No results found in Django response");
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    console.log("Successfully found category:", data[0]);
    return NextResponse.json({ results: data });
  } catch (error) {
    console.error("Error in categories API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
