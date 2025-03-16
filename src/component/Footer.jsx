import { useState, useEffect, useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { LanguageContext } from "../context/LanguageContext";

export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setFooter(data.footer[lang]))
      .catch((err) => console.error("Error loading JSON:", err));
  }, [lang]);

  if (!footer) return <p className="text-center text-gray-500">جارِ التحميل...</p>;

  return (
    <footer className="bg-white py-10 border-t border-gray-200 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* معلومات الشركة */}
        <div className="text-center md:text-start">
          <img src={footer.logo} alt="Company Logo" className="mx-auto md:mx-0 h-12" />
          <p className="mt-3 text-gray-600">{footer.description}</p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href={footer.social.youtube} className="text-orange-500 text-xl hover:opacity-80 transition"><FaYoutube /></a>
            <a href={footer.social.twitter} className="text-orange-500 text-xl hover:opacity-80 transition"><FaTwitter /></a>
            <a href={footer.social.facebook} className="text-orange-500 text-xl hover:opacity-80 transition"><FaFacebookF /></a>
            <a href={footer.social.instagram} className="text-orange-500 text-xl hover:opacity-80 transition"><FaInstagram /></a>
          </div>
          <p className="text-gray-500 text-sm mt-4">{footer.copyright}</p>
        </div>

        {/* الروابط */}
        <div className="text-center md:text-start">
          <h3 className="text-gray-900 font-semibold">{footer.links.title}</h3>
          <ul className="mt-3 space-y-2 text-gray-600">
            {footer.links.items.map((item, index) => (
              <li key={index} className="hover:text-orange-500 transition cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* معلومات الاتصال */}
        <div className="text-center md:text-start flex flex-col gap-3" >
          <h3 className="text-gray-900 font-semibold">{footer.contact.title}</h3>
          <p className="mt-3 text-gray-600"><strong>📍 {footer.contact.address}</strong></p>
          <p className="text-gray-600"><strong>✉ {footer.contact.email}</strong></p>
          <p className="text-gray-600"><strong>📞 {footer.contact.phone}</strong></p>
        </div>
      </div>
    </footer>
  );
}
