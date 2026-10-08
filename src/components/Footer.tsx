import { Github, Linkedin, Twitter, Instagram, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Website",
      url: "https://gdg.community.dev/gdg-on-campus-vidyalankar-institute-of-technology-mumbai-india/",
      icon: Globe,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/gdg_vitm",
      icon: Twitter,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/gdg_vit/",
      icon: Instagram,
    },
    {
      name: "GitHub",
      url: "https://github.com/GDGVITM",
      icon: Github,
    },
  ];

  return (
    <footer className="bg-background/80 backdrop-blur-sm border-t border-border/40 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* GDG Motto */}
          <div className="text-center">
            <p className="text-lg font-medium text-foreground mb-2">
              "For all updates Join https://chat.whatsapp.com/BZBlTDTw1drGZG86XrKJnO?s=sh&p=a&ilr=4"
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              Building a community of developers, designers, and innovators
              passionate about Google technologies.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-border/40" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} GDG VIT Mumbai. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Part of the Google Developer Groups program
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
