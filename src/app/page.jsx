import CardState from "@/components/atom/CardState";
import About from "@/components/organism/About";
import Footer from "@/components/organism/Footer";
import Header from "@/components/organism/Header";
import Hero from "@/components/organism/Hero";
import Plans from "@/components/organism/Plans";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <div className="absolute z-50 bottom-3 flex gap-4 justify-evenly px-20 w-full">
        <CardState
          title="Ellos confian"
          info={40}
          colorTitel="text-[#1FED92]"
          colorInfo="text-[#ED781F]"
          message="Ellos confian en nosotros"
        />
        <CardState
          title="Disponibilidad"
          info="99%"
          colorTitel="text-[#529199]"
          colorInfo="text-indigo-600"
          message="El mejor respaldo y responsabilidad"
        />
        <CardState
          title="Hecho Venezuela"
          info="100%"
          colorTitel="text-amber-400"
          colorInfo="text-blue-500"
          message="Impulzando el talento nacional"
        />
      </div>
      <About />
      <Plans />
      <Footer />
    </>
  );
}
