import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Usa Prisma o il tuo client DB

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { name, description, price, image } = req.body;

    try {
      const updatedProduct = await prisma.product.update({
        where: { id: String(id) },
        data: { name, description, price: parseFloat(price), image },
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}