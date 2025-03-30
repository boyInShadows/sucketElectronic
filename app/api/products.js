export default function handler(req, res) {
  if (req.method === "GET") {
    // Fetch products from the database
    const products = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
    ];
    res.status(200).json(products);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
