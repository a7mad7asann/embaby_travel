import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../context/LanguageContext";

export default function Gallery() {
  const { lang } = useContext(LanguageContext);
  const [galleryData, setGalleryData] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true });

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setGalleryData(data.gallerySection))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  if (!galleryData) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 overflow-hidden" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Explore Button */}
      <div className="mb-6">
        <div className="w-28 bg-orange-400 text-white italic px-6 py-2 rounded-full shadow-md  ">
          {galleryData.exploreButton[lang]}
        </div>
      </div>
      
      <h2 className="text-4xl font-bold text-start mb-12 text-gray-800" data-aos="fade-up">
        {galleryData.title[lang]}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryData.images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-transform group 
              ${index === 2 ? "lg:col-span-2" : ""}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={image.src}
              alt={image.alt[lang]}
              className="w-full h-64 object-cover rounded-xl transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-100 sm:bg-black/30 sm:justify-end sm:p-6">
              <div className="text-white text-center sm:text-right">
                <h3 className="text-xl font-semibold">{image.alt[lang]}</h3>
                <p className="text-sm opacity-90">{image.description ? image.description[lang] : ""}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
