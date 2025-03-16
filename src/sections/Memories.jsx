import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../context/LanguageContext";

export default function TravelMemories() {
  const { lang } = useContext(LanguageContext);
  const [memoriesData, setMemoriesData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true });

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setMemoriesData(data.memories))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  if (!memoriesData) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <div className="overflow-hidden max-w-7xl mx-auto px-6 py-16" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Explore Button */}
      <div className="mb-4 flex items-center">
        <div className="bg-orange-400 text-white italic px-4 py-2 rounded-full shadow-md text-sm font-semibold transition-all duration-300 hover:bg-orange-500">
          {memoriesData.exploreButton[lang]}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-start mb-8 text-gray-800" data-aos="fade-up">
        {memoriesData.title[lang]}
      </h2>

      {/* Image Grid Layout */}
      <div className="grid grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {memoriesData.images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 ease-in-out group 
              ${index === 0 || index === 2 ? "row-span-2" : "row-span-1"} 
              ${index === 4 || index === 6 ? "row-span-1" : ""}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={image.src}
              alt={image.alt[lang]}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
           
          </motion.div>
        ))}
      </div>
    </div>
  );
}
