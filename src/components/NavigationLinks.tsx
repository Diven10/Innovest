import { handleSmoothScroll } from "@/lib/smoothScroll";

interface NavigationLinksProps {
  className?: string;
}

export const NavigationLinks = ({ className = "" }: NavigationLinksProps) => {
  const baseClassName =
    "text-foreground hover:text-google-blue transition-colors cursor-pointer";
  const linkClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName;

  return (
    <>
      <a
        href="#home"
        className={linkClassName}
        onClick={(e) => handleSmoothScroll(e, "home")}
      >
        Home
      </a>
      <a
        href="#opportunities"
        className={linkClassName}
        onClick={(e) => handleSmoothScroll(e, "opportunities")}
      >
        Opportunities
      </a>
    </>
  );
};
