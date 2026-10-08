import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Code,
  FileText,
  GitBranch,
  BookOpen,
  Video,
  Calendar,
  Palette,
  Users,
  Trophy,
  MapPin,
  ArrowRight,
  Star,
  Brain,
  Megaphone,
  Paintbrush,
} from "lucide-react";

const opportunities = [
  {
    id: 3,
    title: "Open-Source Team",
    description: "Contribute to open-source projects and build community tools",
    requirements: [
      "Git proficiency",
      "Code reading & analysis",
      "Technical documentation",
    ],
    icon: GitBranch,
    color: "text-google-yellow",
    bgColor: "bg-google-yellow/10",
    isNew: true,
  },
  {
    id: 6,
    title: "Event Management Team",
    description: "Organize and coordinate community events and workshops",
    requirements: ["Event planning", "Team coordination", "Project management"],
    icon: Calendar,
    color: "text-google-red",
    bgColor: "bg-google-red/10",
  },
  {
    id: 7,
    title: "UI/UX Team",
    description: "Design intuitive user experiences and visual interfaces",
    requirements: [
      "Visual design skills",
      "Wireframing & prototyping",
      "Design tools proficiency",
    ],
    icon: Palette,
    color: "text-google-green",
    bgColor: "bg-google-green/10",
    isNew: true,
  },
  {
    id: 8,
    title: "Outreach Team",
    description: "Build community connections and expand our reach",
    requirements: [
      "Community engagement",
      "Partnership development",
      "Networking & communication",
    ],
    icon: Megaphone,
    color: "text-google-yellow",
    bgColor: "bg-google-yellow/10",
  },
  {
    id: 1,
    title: "Technical Team",
    description: "Lead technical initiatives and build innovative solutions",
    requirements: ["React/Next.js", "Node.js", "Database knowledge"],
    icon: Code,
    color: "text-google-green",
    bgColor: "bg-google-blue/10",
    commitment: "High",
  },
  {
    id: 2,
    title: "Finance Team",
    description: "Manage budgets and drive strategic financial planning",
    requirements: [
      "Leadership experience",
      "Strong technical skills",
      "Event management",
    ],
    icon: Users,
    color: "text-google-red",
    bgColor: "bg-google-red/10",
  },
  {
    id: 4,
    title: "Documentation Team",
    description: "Create comprehensive technical documentation and guides",
    requirements: [
      "Report writing & structuring",
      "Formatting expertise",
      "Microsoft Docs",
    ],
    icon: BookOpen,
    color: "text-google-green",
    bgColor: "bg-google-green/10",
    isNew: true,
  },
  {
    id: 5,
    title: "Media Team",
    description: "Create engaging content and manage social media presence",
    requirements: [
      "Video editing tools",
      "Graphic design & branding",
      "Social media management",
    ],
    icon: Video,
    color: "text-google-blue",
    bgColor: "bg-google-blue/10",
  },
  {
    id: 9,
    title: "Design Team",
    description: "Create stunning visuals and brand identity",
    requirements: [
      "Typography & color theory",
      "Brand identity design",
      "Digital & print design",
    ],
    icon: Paintbrush,
    color: "text-google-blue",
    bgColor: "bg-google-blue/10",
  },
];

const benefits = [
  {
    title: "Google Swag & Certificates",
    description: "Exclusive merchandise and official certificates",
    icon: Trophy,
  },
  {
    title: "Industry Networking",
    description: "Connect with Google engineers and industry experts",
    icon: Users,
  },
  {
    title: "Skill Development",
    description: "Access to premium courses and training resources",
    icon: Brain,
  },
  {
    title: "Event Access",
    description: "Free access to Google events and conferences",
    icon: Calendar,
  },
];

interface CardsSectionProps {
  onOpenForm: (position?: string) => void;
}

export const CardsSection = ({ onOpenForm }: CardsSectionProps) => {
  return (
    <section id="cards-section" className="min-h-screen bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="google-heading-2 text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-google-blue">Opportunities</span> Await
          </h2>
          <p className="google-body-large text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your track and start your journey with Google Developer
            Groups. Each position offers unique learning opportunities and
            real-world experience.
          </p>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {opportunities.map((opportunity) => {
            const IconComponent = opportunity.icon;
            return (
              <Card
                key={opportunity.id}
                className={`relative group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 h-full flex flex-col ${
                  opportunity.isNew ? "ring-2 ring-google-green/30" : ""
                }`}
              >
                {opportunity.isNew && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-google-green text-white">
                      <Star className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  </div>
                )}

                <CardHeader className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-lg ${opportunity.bgColor} flex items-center justify-center mb-4`}
                  >
                    <IconComponent className={`w-6 h-6 ${opportunity.color}`} />
                  </div>
                  <CardTitle className="google-heading-4 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {opportunity.title}
                  </CardTitle>
                  <CardDescription className="google-body text-muted-foreground">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div>
                      <h4 className="google-caption font-semibold text-sm text-foreground mb-2">
                        Requirements:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.requirements.map((req, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4">
                    <Button
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                      onClick={() => onOpenForm(opportunity.title)}
                      data-cursor-stable="true"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-card/50 rounded-2xl p-8 md:p-12 border border-border">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Why Join <span className="text-google-green">GDG</span>?
            </h3>
            <p className="text-muted-foreground text-lg">
              Being part of GDG comes with amazing perks and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
