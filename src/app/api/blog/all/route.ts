import { NextResponse, NextRequest } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";

async function validateQueryParams(req: NextRequest) {
  const url = req.nextUrl;
  const allowedParams = ["page", "limit", "sort", "fields"];
  const invalidParams = Object.keys(url.searchParams).filter(
    (param) => !allowedParams.includes(param)
  );

  if (invalidParams.length > 0) {
    throw new Error(`Invalid query parameters: ${invalidParams.join(", ")}`);
  }

  // Validate page and limit (if provided)
  const page = parseInt(url.searchParams.get("page") || "1");
  if (isNaN(page) || page < 1) {
    throw new Error("Invalid page number: must be a positive integer");
  }

  const limit = parseInt(url.searchParams.get("limit") || "10");
  if (isNaN(limit) || limit < 1 || limit > 100) {
    throw new Error(
      "Invalid limit: must be a positive integer between 1 and 100"
    );
  }

  return { page, limit };
}

async function getBlogs(page: number, limit: number, sort?: string, fields?: string[]) {
  const query: any = { }; // Create empty query object

  if (sort) {
    const sortFields = sort.split(",").map((field) => {
      const order = field.startsWith("-") ? "desc" : "asc";
      const fieldName = order === "desc" ? field.slice(1) : field;
      return { [fieldName]: order };
    });
    query.orderBy = sortFields;
  }

  if (fields && fields.length > 0) {
    query.select = {}; // Initialize select object

    fields.forEach((field) => {
      if (!field.startsWith("-")) {
        query.select[field] = true; // Set each field to true for selection
      } else {
        const deselectedField = field.slice(1);
        query.select[deselectedField] = false; // Deselect the field
      }
    });
  }
  console.log(query);
  const skip = (page - 1) * limit; // Calculate skip for pagination
  const blogs = await dataBasePrisma.blog.findMany({
    take: limit, // Limit results
    skip, // Skip results for pagination
    ...query 
  });

  return blogs;
}


export async function GET(req: NextRequest) {
  try {
    const { page, limit } = await validateQueryParams(req);
    const sort = req.nextUrl.searchParams.get("sort") ?? "";
    const fields = req.nextUrl.searchParams.get("fields")?.split(",");

    let blogs = await getBlogs(page, limit, sort, fields);
    const total = await dataBasePrisma.blog.count(); // Count all blogs
    return NextResponse.json(
      { success: true, message: "Fetched successfully", data: blogs, total },
      { status: 200 }
    );
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
