// app/page.jsx
import Navbar from "@/components/public/Navbar";
import Hero from "@/components/public/Hero";
import ProfilePic from "../../public/images/GemaBangsa.png";
import About from "@/components/public/About";
import FotoSekolah from "../../public/images/FotoSekolah.jpg";

export default function HomePage() {
  return (
    <>
      <Navbar schoolName="SMK Gema Bangsa" logoUrl={ProfilePic} />
      <Hero schoolName="SMK Gema Bangsa" imageUrl={FotoSekolah} />
      <About />
    </>
  );
}
