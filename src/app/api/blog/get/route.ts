import { NextApiRequest, NextApiResponse } from "next";
import { dataBasePrisma } from "@/databasePrisma";


export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const blog = await dataBasePrisma.Blog.findMany({
      where: {
        id: req.query.id as string,
      },
    });
    return res.json({ success: true, data: blog, message: "blog found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching blog" });
  }
}
