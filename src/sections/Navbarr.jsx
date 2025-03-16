import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { HashLink as Link } from "react-router-hash-link";
import { FaBars, FaTimes } from "react-icons/fa";
import data from "../../public/data.json";

export default function Navbar() {
  const { lang, setLang } = useContext(LanguageContext);
  const content = data.navbar[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lang]);

  return (
    <nav
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={` w-full top-0 z-50 transition-all duration-300 bg-white shadow-md ${isScrolled ? "shadow-lg" : "shadow-none"}`}
    >
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* الشعار */}
        <Link to="/">
          <img src={content.logo} alt="Logo" className="w-36 h-auto transition-all duration-300 hover:brightness-100" />
        </Link>

        {/* القائمة في وضع الهاتف */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 transition-transform duration-300 hover:scale-110"
        >
          {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>

        {/* القائمة الرئيسية */}
        <ul
          className={`md:flex gap-8 text-lg font-medium text-gray-700 transition-all duration-300 
            ${isMenuOpen ? "flex flex-col absolute bg-white w-full left-0 top-16 py-6 px-4 shadow-xl rounded-md" : "hidden md:flex"}`}
        >
          {["home", "about", "tours", "login"].map((item) => (
            <li key={item} className="relative group">
              <Link to={`/${item}`} className="relative inline-block transition-all duration-300 ease-in-out hover:text-orange-500 hover:scale-105">
                {content[item]}
                <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-orange-500 transition-all duration-500 ease-in-out group-hover:w-full group-hover:left-0"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* زر التسجيل */}
        <Link to="/register" className="hidden md:block px-4 py-2 bg-orange-500 text-white rounded-lg font-medium transition-all duration-300 hover:bg-orange-600">
          {content.register}
        </Link>

        {/* زر اللغة */}
        <label className="relative inline-flex items-center cursor-pointer ml-4">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={lang === "ar"}
            onChange={() => setLang(lang === "ar" ? "en" : "ar")}
          />
          <div className="w-16 h-8 bg-gray-300 rounded-full flex items-center p-1 transition-all duration-300 peer-checked:bg-gray-500">
            <span
              className={`w-6 h-6 bg-white text-xs font-bold flex items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
                lang === "ar" ? "translate-x-0 text-black" : "translate-x-8 text-black"
              }`}
            >
              {lang === "ar" ? "AR" : "EN"}
            </span>
          </div>
        </label>
      </div>
    </nav>
  );
}
