import { Button } from "@/components/ui/button";
import { ApplicationForm } from "./ApplicationForm";
import { handleSmoothScroll } from "@/lib/smoothScroll";

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  preSelectedPosition?: string;
  clearPreSelectedPosition?: () => void;
}

export const MobileNavigation = ({
  isOpen,
  setIsOpen,
  isFormOpen,
  setIsFormOpen,
  preSelectedPosition,
  clearPreSelectedPosition,
}: MobileNavigationProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <a
          href="#home"
          className="block px-3 py-2 text-foreground hover:text-google-blue transition-colors cursor-pointer"
          onClick={(e) => handleSmoothScroll(e, "home", () => setIsOpen(false))}
        >
          Home
        </a>
        <a
          href="#opportunities"
          className="block px-3 py-2 text-foreground hover:text-google-blue transition-colors cursor-pointer"
          onClick={(e) =>
            handleSmoothScroll(e, "opportunities", () => setIsOpen(false))
          }
        >
          Opportunities
        </a>
        <div className="px-3 py-2">
          <ApplicationForm
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            preSelectedPosition={preSelectedPosition}
            clearPreSelectedPosition={clearPreSelectedPosition}
            buttonClassName="w-full gdg-glow bg-google-blue hover:bg-google-blue/90 text-white"
          />
        </div>
      </div>
    </div>
  );
};
