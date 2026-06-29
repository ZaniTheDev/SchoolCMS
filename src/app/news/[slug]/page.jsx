import { notFound } from "next/navigation";
import PostDetail from "@/components/public/PostDetails.jsx";

async function getPost(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?slug=${encodeURIComponent(
      slug,
    )}&published=true`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data?.posts?.[0] ?? null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Berita Tidak Ditemukan" };
  return {
    title: post.title,
    description: post.content?.slice(0, 150),
  };
}

export default async function PostDetailPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <PostDetail post={post} />;
}
