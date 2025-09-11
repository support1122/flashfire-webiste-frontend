import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useSectionSpyRouter(
  ids: string[],
  offsetPx: number = 80
) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const id = visible.target.id;
        const nextHash = `#${id}`;

        if (location.hash !== nextHash) {
          // replace so we don’t spam back/forward history while scrolling
          navigate({ pathname: location.pathname, hash: nextHash }, { replace: true });
        }
      },
      {
        root: null,
        rootMargin: `-${offsetPx}px 0px -70% 0px`,
        threshold: [0.2, 0.5, 0.8],
      }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [ids, offsetPx, navigate, location.pathname, location.hash]);
}
