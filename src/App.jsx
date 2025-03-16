import { useState, useEffect } from "react";
import BuildingLoader from "./component/BuildingLoader.jsx"; // استيراد الكود الذي كتبته
import { BrowserRouter as Router } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Nav from "./sections/Navbarr";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Mques from "./sections/CTA";
import Gallery from "./sections/Gallery";
import Memories from "./sections/Memories.jsx"
import Form from "./sections/Form";
import Footer from "./component/Footer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000); // مدة الانتظار (2 ثانية)
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <BuildingLoader loading={loading} />
        {!loading && (
          <>
            <Nav />
            <Hero />
            <About />
            <Gallery />
            <Mques />
            <Memories />
            <Form />
            <Footer />
          </>
        )}
      </Router>
    </LanguageProvider>
  );
}

export default App;
