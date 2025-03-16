import { useState, useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../context/LanguageContext";
import data from "../../public/data.json";

export default function TravelBookingForm() {
  const { lang } = useContext(LanguageContext);
  const label = data[lang].labels;

  const [formData, setFormData] = useState({
    name: "",
    travelDate: "",
    travelers: "",
    destination: "",
    departureTime: "",
    arrivalTime: ""
  });

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false, // غيرها إلى false لتحديث التأثيرات عند التمرير
    });

    // تحديث AOS بعد تحميل المحتوى لضمان ظهور التأثيرات
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBooking = () => {
    if (!formData.name || !formData.travelDate || !formData.travelers || !formData.destination || !formData.departureTime || !formData.arrivalTime) {
      alert(lang === "en" ? "Please fill in all required fields." : "يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    const message = lang === "en" ? `
      ✈️ Travel Booking Request ✈️

      👤 Name: ${formData.name}
      📅 Travel Date: ${formData.travelDate}
      🕗 Departure Time: ${formData.departureTime}
      🕛 Arrival Time: ${formData.arrivalTime}
      🧑‍🤝‍🧑 Number of Travelers: ${formData.travelers}
      📍 Destination: ${formData.destination}
    ` : `
      ✈️ طلب حجز رحلة ✈️

      👤 الاسم: ${formData.name}
      📅 تاريخ السفر: ${formData.travelDate}
      🕗 وقت المغادرة: ${formData.departureTime}
      🕛 وقت الوصول: ${formData.arrivalTime}
      🧑‍🤝‍🧑 عدد الأفراد: ${formData.travelers}
      📍 الوجهة: ${formData.destination}
    `;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "+201061380485";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="overflow-hidden max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4" data-aos="fade-up">
      <h2 className="text-xl font-semibold text-center" data-aos="fade-down" data-aos-delay="200">
        {label.booking}
      </h2>
  
      <input
        type="text"
        name="name"
        placeholder={label.name}
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        data-aos="fade-right"
      />
  
      <input
        type="date"
        name="travelDate"
        value={formData.travelDate}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        data-aos="fade-left" data-aos-delay="100"
      />
  
      <input
        type="time"
        name="departureTime"
        value={formData.departureTime}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        data-aos="fade-up"
      />
  
      <input
        type="time"
        name="arrivalTime"
        value={formData.arrivalTime}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        data-aos="fade-up" data-aos-delay="100"
      />
  
      <input
        type="number"
        name="travelers"
        placeholder={label.travelers}
        value={formData.travelers}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        data-aos="flip-left"
      />
  
      <input
        type="text"
        name="destination"
        placeholder={label.destination}
        value={formData.destination}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
        data-aos="flip-right" data-aos-delay="100"
      />
  
      <button
        onClick={handleBooking}
        className="w-full bg-orange-400 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-500"
        data-aos="zoom-in-up"
      >
        {label.booking}
      </button>
    </div>
  );
}  