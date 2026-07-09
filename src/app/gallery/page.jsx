import prisma from "lib/prisma";
import Gallery from "../../components/public/Gallery";
import Navbar from "@/components/public/Navbar";
import ProfilePic from "../../../public/images/GemaBangsa.png";

export const metadata = {
  title: "Galeri Sekolah",
  description: "Dokumentasi kegiatan dan momen sekolah",
};

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar schoolName="SMK Gema Bangsa" logoUrl={ProfilePic} />
      <main className="min-h-screen bg-white">
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a5f]">
              Galeri Sekolah
            </h1>
            <p className="text-slate-500 mt-2">
              Dokumentasi kegiatan dan momen berharga sekolah
            </p>
          </div>
          <Gallery images={images} />
        </section>
      </main>
    </>
  );
}
