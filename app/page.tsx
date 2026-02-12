import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection"
import Whatwedo from "@/components/Whatwedo"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Herosection />
      <Whatwedo />
      <Footer />
    </>
  );
}
