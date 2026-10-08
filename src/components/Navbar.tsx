import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NavigationLinks } from "./NavigationLinks";
import { ApplicationForm } from "./ApplicationForm";
import { MobileNavigation } from "./MobileNavigation";

interface NavbarProps {
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  preSelectedPosition?: string;
  clearPreSelectedPosition?: () => void;
}

export const Navbar = ({
  isFormOpen,
  setIsFormOpen,
  preSelectedPosition,
  clearPreSelectedPosition,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationLinks />
            <ApplicationForm
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              preSelectedPosition={preSelectedPosition}
              clearPreSelectedPosition={clearPreSelectedPosition}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          preSelectedPosition={preSelectedPosition}
          clearPreSelectedPosition={clearPreSelectedPosition}
        />
      </div>
    </nav>
  );
};
