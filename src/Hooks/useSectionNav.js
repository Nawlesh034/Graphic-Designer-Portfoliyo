import { useLocation, useNavigate } from "react-router-dom";
import { transitionToSection } from "@/lib/motion";

export default function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (id) => {
    if (pathname === "/") {
      transitionToSection(id);
      return;
    }

    navigate(`/#${encodeURIComponent(id)}`);
  };
}