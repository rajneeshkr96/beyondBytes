
import { MetadataRoute } from "next";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${process.env.BASE_URL}/api/blog/get?fields=updatedAt,slug`);
  const { data } = await response.json();
  console.log(data);

  const postEntries: MetadataRoute.Sitemap = data.map(({slug,updatedAt}:{slug:string,updatedAt:string}) => ({
    url: `${process.env.BASE_URL}/post/${slug}`,
    lastModified: new Date(updatedAt),
  }));

  return [
    ...postEntries,
  ];
}