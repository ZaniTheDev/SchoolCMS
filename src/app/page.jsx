// app/page.jsx
import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import ProfilePic from "../../public/images/GemaBangsa.png";
import About from "@/components/public/About";
import FotoSekolah from "../../public/images/FotoSekolah.jpg";
import prisma from "lib/prisma";
import JurusanSection from "@/components/public/JurusanSection";

export default async function HomePage() {
  const heroImages = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <>
      <Navbar schoolName="SMK Gema Bangsa" logoUrl={ProfilePic} />
      <Hero
        schoolName="SMK Gema Bangsa"
        imageUrl={FotoSekolah}
        images={heroImages}
      />
      <About />
      <JurusanSection></JurusanSection>
    </>
  );
}
