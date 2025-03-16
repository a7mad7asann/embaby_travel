import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { FaCloudSun, FaMapSigns, FaCogs } from "react-icons/fa";

export default function Services() {
  const { lang } = useContext(LanguageContext);
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setContent(data.services[lang]));
  }, [lang]);

  if (!content) return null;

  const icons = {
    weather: <FaCloudSun />,
    guide: <FaMapSigns />,
    customization: <FaCogs />,
  };

  return (
    <section className="overflow-hidden py-16 px-6 sm:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* العنوان */}
        <div className="mb-10 text-start">
          <p className="text-orange-400 italic text-lg">{content.sectionTitle}</p>
          <h2 className="text-4xl font-bold text-gray-900">{content.mainTitle}</h2>
        </div>

        {/* البطاقات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 border border-gray-200 rounded-lg shadow-lg text-center bg-white hover:shadow-xl transition"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center text-3xl text-white bg-orange-400 rounded-full">
                  {icons[feature.icon]}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
