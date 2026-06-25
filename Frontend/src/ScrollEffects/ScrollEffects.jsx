import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollEffects = () => {
  const { pathname } = useLocation();

  useEffect(() => {
   
    if (pathname === "/home") return;

    const isMobile = window.innerWidth < 768;

   
    const selector = isMobile
      ? ".scroll-item"
      : "section, article, .scroll-item";

    const elements = document.querySelectorAll(selector);

    const filteredElements = [...elements].filter(
      (el) =>
        !el.closest(".Toastify") &&
        !el.classList.contains("no-scroll")
    );

    filteredElements.forEach((el) => {
      el.classList.add("scroll-hide");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: isMobile ? 0.08 : 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    filteredElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default ScrollEffects;
