import News from "@/components/public/News";
import Navbar from "@/components/public/Navbar";
import ProfilePic from "../../../public/images/GemaBangsa.png";

async function getPosts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?published=true`,
    { cache: "no-store" },
  );
  if (!res.ok) return { featured: null, news: [] };

  const data = await res.json();
  const posts = data.data?.posts ?? [];

  const mapped = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.content?.replace(/<[^>]+>/g, "").slice(0, 180) ?? "",
    imageUrl: post.thumbnail ?? null,
    category: "Berita",
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "",
  }));

  return {
    featured: mapped[0] ?? null,
    news: mapped.slice(1),
  };
}

export default async function NewsPage() {
  const { featured, news } = await getPosts();
  return (
    <>
      <Navbar schoolName="SMK Gema Bangsa" logoUrl={ProfilePic} />
      <News featured={featured} news={news} />
    </>
  );
}
