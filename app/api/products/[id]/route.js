import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Make request to Django backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: request.headers.get("Authorization"),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error in product delete API route:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
