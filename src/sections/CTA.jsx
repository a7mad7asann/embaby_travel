import { useEffect, useState, useContext } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../context/LanguageContext";

export default function ExperienceSection() {
  const { lang } = useContext(LanguageContext);
  const [experienceData, setExperienceData] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true });

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setExperienceData(data.experienceSection))
      .catch((err) => console.error("Error loading data:", err));
  }, []);

  if (!experienceData) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center overflow-hidden">
      {/* النصوص والمعلومات */}
      <div className="text-start">
        <span className="bg-orange-400 text-white italic px-4 py-1 rounded-full shadow-md text-lg">
          {experienceData.badge[lang]}
        </span>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4 mb-4 leading-tight" data-aos="fade-up">
          {experienceData.title[lang]}
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-lg" data-aos="fade-up" data-aos-delay="100">
          {experienceData.description[lang]}
        </p>

        {/* الإحصائيات */}
        <div className="flex flex-wrap gap-6">
          {experienceData.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-orange-400 text-white px-6 py-4 rounded-lg text-center shadow-md w-28"
            >
              <h3 className="text-2xl font-bold">
                {inView && <CountUp start={0} end={stat.number} duration={2.5} useEasing={true} redraw={true} />}+
              </h3>
              <p className="text-sm mt-1">{stat.label[lang]}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* الصورة والمحتوى التفاعلي */}
      <div className="relative flex justify-center">
        <div className="relative w-80 md:w-96">
          <img
            src={experienceData.image}
            alt="Experience"
            className="w-full rounded-xl"
            data-aos="zoom-in"
          />

          {/* تمييز الموقع */}
          <div className="absolute top-[41%] left-0 bg-white  px-3 py-1 rounded-lg text-xs font-bold">
            {experienceData.highlight.location[lang]}
          </div>

          {/* النشاط التفاعلي */}
          <div className="absolute bottom-0 right-[5px] bg-white shadow-lg rounded-lg flex items-center p-4  w-48">
            <div>
              <p className="font-bold text-sm">{experienceData.highlight.activity[lang]}</p>
              <p className="text-xs text-gray-500 mt-1">{experienceData.highlight.cta[lang]}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}