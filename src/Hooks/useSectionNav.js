import { useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "@/lib/motion";

export default function useSectionNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (id) => {
    if (pathname === "/") {
      scrollToId(id);
      return;
    }

    navigate(`/#${encodeURIComponent(id)}`);
  };
}