import { dataBasePrisma } from "@/databasePrisma";
import { currentRole } from "@/lib/authDet";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const role = await currentRole();
    if (role !== "WRITER" && role !== "ADMIN") {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to create a blog",
      });
    }
    const blog = await dataBasePrisma.blog.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        slug: req.body.slug,
        author: {
          connect: {
            id: req.body.authorId,
          },
        },
      },
    });
    return res.json({ success: true, data: blog, message: "blog created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating blog" });
  }
}
