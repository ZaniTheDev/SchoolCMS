import News from "@/app/news/News";
import Navbar from "@/components/public/Navbar";
import ProfilePic from "../../../public/images/GemaBangsa.png";

export default function about() {
  return (
    <>
      <News />
      <Navbar schoolName="SMK Gema Bangsa" logoUrl={ProfilePic} />
    </>
  );
}
