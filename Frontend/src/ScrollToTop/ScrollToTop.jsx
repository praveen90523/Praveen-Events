import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
   
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

   
    AOS.refresh();

  }, [pathname]);

  return null;
};

export default ScrollToTop;
