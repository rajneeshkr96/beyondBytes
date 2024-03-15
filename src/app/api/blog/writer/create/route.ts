import { dataBasePrisma } from "@/databasePrisma";
import { currentRole } from "@/lib/authDet";
import { NextRequest,NextResponse } from "next/server";
import { currentUserId } from "@/lib/authDet";

export interface BlogPops {
  title: string;
  image: object;
  content: string;
  metaTitle: string;
  metaDesc: string;
}

const genrateSlug = async (title:string) => {
  // remove all the special characters from the title
  title = title.replace(/[^a-zA-Z0-9 ]/g, "");
  const slug = await dataBasePrisma.blog.findUnique({
    where: {
      slug: title.split(" ").join("-"),
    },
  });
  if (slug) {
    const time:string = new Date().getTime().toString();
    return title.split(" ").join("-") + "-" + time;
  }
  else{
    return title.split(" ").join("-");
  }
  
}
export async function POST(request: NextRequest) {
  try {
    const {title,image,content,metaTitle,metaDesc}:BlogPops = await request.json();
    // todo remove id sting 
    const authorId = await currentUserId() || "65e6de30136474657e223231";
    const blog = await dataBasePrisma.blog.create({
      data: {
        title: title,
        image: image,
        content: content,
        metaTitle: metaTitle,
        metaDesc: metaDesc,
        authorId: authorId,
        slug: await genrateSlug(title),
      },
    });
    return NextResponse.json({ success: true, message: "Blog created successfully", data: blog }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
