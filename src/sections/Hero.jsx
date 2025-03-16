import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../context/LanguageContext";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import { BsPinMap } from "react-icons/bs";

export default function HeroSection() {
  const { lang } = useContext(LanguageContext);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch("/data.json") // جلب البيانات ديناميكياً
      .then((res) => res.json())
      .then((data) => setContent(data.heroSection[lang]));
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");
  }, [lang]);

  if (!content) return <p>Loading...</p>;

  return (
    <section className="overflow-hidden relative bg-white text-gray-900 flex flex-col items-center px-6 sm:px-12 lg:px-24 py-12">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-10">
        <div className={`md:w-1/2 text-center md:text-left ${lang === "ar" ? "md:text-right" : "md:text-left"}`}>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            {content.title}
          </h1>
          <p className="text-gray-600 mt-4 text-lg">{content.description}</p>
        </div>

        <div className="md:w-1/2 flex gap-4 justify-center">
          {content.images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="rounded-2xl overflow-hidden border border-gray-300 shadow-md"
            >
              <img src={img} alt="destination" className="w-40 h-[350px] object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      
    </section>
  );
}
