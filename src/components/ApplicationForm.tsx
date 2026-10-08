import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { useToast } from "@/hooks/use-toast";

import { UserPlus } from "lucide-react";

import {
  AVAILABLE_POSITIONS,
  ACADEMIC_YEARS,
  UNIVERSITIES,
} from "@/lib/constants";

import { FormValidation } from "@/lib/formValidation";

interface ApplicationFormProps {
  isFormOpen: boolean;

  setIsFormOpen: (open: boolean) => void;

  preSelectedPosition?: string;

  clearPreSelectedPosition?: () => void;

  buttonClassName?: string;

  trigger?: React.ReactNode;
}

export const ApplicationForm = ({
  isFormOpen,
  setIsFormOpen,
  preSelectedPosition,
  clearPreSelectedPosition,
  buttonClassName,
  trigger,
}: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    year: "",
    position: "",
    skills: "",
    experience: "",
    motivation: "",
  });

  const { toast } = useToast();

  /* =====================================================
       PRESELECT POSITION
       ===================================================== */

  useEffect(() => {
    if (isFormOpen && preSelectedPosition) {
      setFormData((prev) => ({
        ...prev,

        position: preSelectedPosition,
      }));
    }
  }, [isFormOpen, preSelectedPosition]);

  /* =====================================================
       LOCK BODY SCROLL
       ===================================================== */

  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFormOpen]);

  /* =====================================================
       FORM SUBMISSION
       ===================================================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormErrors({});

    const validation = FormValidation.validateApplicationForm(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);

      const firstError = Object.values(validation.errors)[0];

      toast({
        title: "⚠️ Please check required fields",

        description:
          firstError ||
          "Please fill in all mandatory fields before submitting.",

        variant: "destructive",
      });

      return;
    }

    /* -------------------------------------------------
           NETWORK CHECK
           ------------------------------------------------- */

    if (!navigator.onLine) {
      toast({
        title: "No Internet Connection",

        description: "Please check your internet connection and try again.",

        variant: "destructive",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🔄 Starting form submission process...");

      /* -------------------------------------------------
             SUBMIT
             ------------------------------------------------- */

      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("✅ Form submission successful (Frontend only)!");

      /* -------------------------------------------------
             SUCCESS MESSAGE
             ------------------------------------------------- */

      toast({
        title: "Application Submitted Successfully! 🎉",

        description: (
          <div className="space-y-2">
            <p>
              Thank you for applying to GDG! We'll review your application and
              get back to you soon.
            </p>

            <p className="font-semibold">
              Join our WhatsApp group for updates:
            </p>

            <a
              href="https://chat.whatsapp.com/BZBlTDTw1drGZG86XrKJnO?s=sh&p=a&ilr=4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-google-blue hover:underline break-all"
            >
              https://chat.whatsapp.com/BZBlTDTw1drGZG86XrKJnO?s=sh&p=a&ilr=4
            </a>
          </div>
        ),
      });

      setIsFormOpen(false);

      if (clearPreSelectedPosition) {
        clearPreSelectedPosition();
      }

      /* -------------------------------------------------
             RESET FORM
             ------------------------------------------------- */

      setFormData({
        name: "",
        email: "",
        university: "",
        year: "",
        position: "",
        skills: "",
        experience: "",
        motivation: "",
      });

      setFormErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);

      let errorTitle = "Submission Error";

      let errorDescription =
        "There was an issue submitting your application. Please try again.";

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorTitle = "Request Timeout";

          errorDescription =
            "The submission is taking too long. Please check your connection and try again.";
        } else if (error.message.includes("fetch")) {
          errorTitle = "Network Error";

          errorDescription =
            "Unable to connect to the server. Please check your internet connection.";
        }
      }

      toast({
        title: errorTitle,

        description: errorDescription,

        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =====================================================
       INPUT HANDLER
       ===================================================== */

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = {
          ...prev,
        };

        delete newErrors[field];

        return newErrors;
      });
    }
  };

  /* =====================================================
       DYNAMIC LABELS
       ===================================================== */

  const getDynamicFieldLabels = (position: string) => {
    const baseLabels = {
      skills: "Skills",

      experience: "Experience",

      motivation: "What inspires you to be part of GDG?",
    };

    switch (position) {
      case "Technical Team":
        return {
          ...baseLabels,

          skills: "Technical Skills & Interests",

          experience: "Technical Experience & Projects",

          motivation: "What inspires you to be part of the Technical Team?",
        };

      case "Finance Team":
        return {
          ...baseLabels,

          skills: "Financial Management & Leadership Skills",

          experience: "Financial Management & Leadership Experience",

          motivation: "What inspires you to be part of the Finance Team?",
        };

      case "Open-Source Team":
        return {
          ...baseLabels,

          skills: "Open-Source Development Skills",

          experience: "Open-Source Contribution Experience",

          motivation: "What inspires you to be part of the Open-Source Team?",
        };

      case "Documentation Team":
        return {
          ...baseLabels,

          skills: "Technical Writing & Documentation Skills",

          experience: "Documentation & Writing Experience",

          motivation: "What inspires you to be part of the Documentation Team?",
        };

      case "Media Team":
        return {
          ...baseLabels,

          skills: "Content Creation & Social Media Skills",

          experience: "Media & Content Creation Experience",

          motivation: "What inspires you to be part of the Media Team?",
        };

      case "Event Management Team":
        return {
          ...baseLabels,

          skills: "Event Planning & Management Skills",

          experience: "Event Management & Organization Experience",

          motivation:
            "What inspires you to be part of the Event Management Team?",
        };

      case "UI/UX Team":
        return {
          ...baseLabels,

          skills: "UI/UX Design Skills & Tools",

          experience: "Design Experience & Portfolio links",

          motivation: "What inspires you to be part of the UI/UX Team?",
        };

      case "Outreach Team":
        return {
          ...baseLabels,

          skills: "Community Outreach & Partnership Skills",

          experience: "Outreach & Community Building Experience",

          motivation: "What inspires you to be part of Outreach?",
        };

      case "Design Team":
        return {
          ...baseLabels,

          skills: "Visual Design & Creative Skills",

          experience: "Design Portfolio & Creative Projects and links",

          motivation: "What inspires you to be part of the Design Team?",
        };

      default:
        return baseLabels;
    }
  };

  /* =====================================================
       DEFAULT TRIGGER
       ===================================================== */

  const defaultTrigger = (
    <Button
      className={
        buttonClassName ||
        "google-button gdg-glow bg-google-blue hover:bg-google-blue/90 text-white"
      }
    >
      <UserPlus className="w-4 h-4 mr-2" />
      Apply Now
    </Button>
  );

  /* =====================================================
       RENDER
       ===================================================== */

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

      <DialogContent
        className="
            application-dialog-content
            max-w-2xl
            max-h-[80vh]
            overflow-y-auto
          "
        style={{
          scrollbarWidth: "none",

          msOverflowStyle: "none",

          zIndex: 51,

          background: "#11151b",

          color: "#ffffff",
        }}
      >
        {/* =================================================
              FORM-SPECIFIC STYLING

              This is deliberately inside the component so
              the labels stay white regardless of external
              theme/CSS changes.
             ================================================= */}

        <style>
          {`
              .application-dialog-content {
                background: #11151b !important;
                color: #ffffff !important;
              }

              .application-dialog-content
              .application-field-label {
                color: #ffffff !important;
                opacity: 1 !important;
                font-weight: 600 !important;
                text-shadow:
                  0 1px 2px
                  rgba(0, 0, 0, 0.35);
              }

              .application-dialog-content
              input,
              .application-dialog-content
              textarea,
              .application-dialog-content
              [data-radix-select-trigger] {
                color: #ffffff !important;
                background:
                  rgba(
                    17,
                    21,
                    27,
                    0.96
                  ) !important;

                border:
                  1px solid
                  rgba(
                    255,
                    255,
                    255,
                    0.22
                  ) !important;
              }

              .application-dialog-content
              input::placeholder,
              .application-dialog-content
              textarea::placeholder {
                color:
                  rgba(
                    255,
                    255,
                    255,
                    0.48
                  ) !important;
              }

              .application-dialog-content
              [data-radix-select-value] {
                color:
                  #ffffff !important;
              }

              .application-dialog-content
              [data-radix-select-trigger]
              svg {
                color:
                  rgba(
                    255,
                    255,
                    255,
                    0.7
                  ) !important;
              }

              .application-dialog-content
              input:focus,
              .application-dialog-content
              textarea:focus,
              .application-dialog-content
              [data-radix-select-trigger]:focus {
                border-color:
                  #4285f4 !important;

                box-shadow:
                  0 0 0 2px
                  rgba(
                    66,
                    133,
                    244,
                    0.18
                  ) !important;
              }

              .application-dialog-content
              label {
                color:
                  #ffffff !important;
              }

              .application-dialog-content
              .text-muted-foreground {
                color:
                  rgba(
                    255,
                    255,
                    255,
                    0.65
                  ) !important;
              }
            `}
        </style>

        {/* =================================================
              HEADER
             ================================================= */}

        <DialogHeader>
          <DialogTitle
            className="
                google-heading-3
                text-2xl
                font-bold
                text-google-blue
              "
          >
            Join GDG Community
          </DialogTitle>
        </DialogHeader>

        {/* =================================================
              FORM
             ================================================= */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* =================================================
                NAME + EMAIL
               ================================================= */}

          <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
          >
            {/* NAME */}

            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="
                    google-caption
                    application-field-label
                  "
              >
                Full Name *
              </Label>

              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className={`scan-effect ${
                  formErrors.name
                    ? "border-google-blue focus-visible:ring-google-blue"
                    : ""
                }`}
              />

              {formErrors.name && (
                <p className="text-sm text-google-blue">{formErrors.name}</p>
              )}
            </div>

            {/* EMAIL */}

            <div className="space-y-2">
              <Label htmlFor="email" className="application-field-label">
                Email Address *
              </Label>

              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className={`scan-effect ${
                  formErrors.email
                    ? "border-google-blue focus-visible:ring-google-blue"
                    : ""
                }`}
              />

              {formErrors.email && (
                <p className="text-sm text-google-blue">{formErrors.email}</p>
              )}
            </div>
          </div>

          {/* =================================================
                UNIVERSITY + YEAR
               ================================================= */}

          <div
            className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
          >
            {/* UNIVERSITY */}

            <div className="space-y-2">
              <Label htmlFor="university" className="application-field-label">
                University/College *
              </Label>

              <Select
                value={formData.university}
                onValueChange={(value) =>
                  handleInputChange("university", value)
                }
                required
              >
                <SelectTrigger
                  className={`scan-effect ${
                    formErrors.university
                      ? "border-google-blue focus:ring-google-blue"
                      : ""
                  }`}
                >
                  <SelectValue
                    placeholder="
                        Select your
                        university/college
                      "
                  />
                </SelectTrigger>

                <SelectContent>
                  {UNIVERSITIES.map((university) => (
                    <SelectItem key={university.value} value={university.value}>
                      {university.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formErrors.university && (
                <p className="text-sm text-google-blue">
                  {formErrors.university}
                </p>
              )}
            </div>

            {/* ACADEMIC YEAR */}

            <div className="space-y-2">
              <Label htmlFor="year" className="application-field-label">
                Academic Year *
              </Label>

              <Select
                value={formData.year}
                onValueChange={(value) => handleInputChange("year", value)}
              >
                <SelectTrigger
                  className={`scan-effect ${
                    formErrors.year
                      ? "border-google-blue focus:ring-google-blue"
                      : ""
                  }`}
                >
                  <SelectValue
                    placeholder="
                        Select your year
                      "
                  />
                </SelectTrigger>

                <SelectContent>
                  {ACADEMIC_YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {formErrors.year && (
                <p className="text-sm text-google-blue">{formErrors.year}</p>
              )}
            </div>
          </div>

          {/* =================================================
                POSITION
               ================================================= */}

          <div className="space-y-2">
            <Label htmlFor="position" className="application-field-label">
              Preferred Position/Domain *
            </Label>

            <Select
              value={formData.position}
              onValueChange={(value) => handleInputChange("position", value)}
              required
            >
              <SelectTrigger
                className={`scan-effect ${
                  formErrors.position
                    ? "border-google-blue focus:ring-google-blue"
                    : ""
                }`}
              >
                <SelectValue
                  placeholder="
                      Select your preferred
                      domain/team
                    "
                />
              </SelectTrigger>

              <SelectContent>
                {AVAILABLE_POSITIONS.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formErrors.position && (
              <p className="text-sm text-google-blue">{formErrors.position}</p>
            )}
          </div>

          {/* =================================================
                SKILLS
               ================================================= */}

          <div className="space-y-2">
            <Label htmlFor="skills" className="application-field-label">
              {getDynamicFieldLabels(formData.position).skills}
            </Label>

            <Textarea
              id="skills"
              value={formData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              placeholder="
                  e.g., Web Development,
                  Mobile Apps, AI/ML,
                  Cloud Computing, etc.
                "
              className={`scan-effect min-h-[80px] ${
                formErrors.skills
                  ? "border-google-blue focus-visible:ring-google-blue"
                  : ""
              }`}
            />

            {formErrors.skills && (
              <p className="text-sm text-google-blue">{formErrors.skills}</p>
            )}
          </div>

          {/* =================================================
                EXPERIENCE
               ================================================= */}

          <div className="space-y-2">
            <Label htmlFor="experience" className="application-field-label">
              {getDynamicFieldLabels(formData.position).experience}
            </Label>

            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              placeholder="
                  Tell us about your
                  projects, internships,
                  or relevant experience
                "
              className={`scan-effect min-h-[80px] ${
                formErrors.experience
                  ? "border-google-blue focus-visible:ring-google-blue"
                  : ""
              }`}
            />

            {formErrors.experience && (
              <p className="text-sm text-google-blue">
                {formErrors.experience}
              </p>
            )}
          </div>

          {/* =================================================
                MOTIVATION
               ================================================= */}

          <div className="space-y-2">
            <Label htmlFor="motivation" className="application-field-label">
              {getDynamicFieldLabels(formData.position).motivation} *
            </Label>

            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => handleInputChange("motivation", e.target.value)}
              placeholder="
                  Share your motivation
                  and what you hope to
                  achieve
                "
              required
              className={`scan-effect min-h-[100px] ${
                formErrors.motivation
                  ? "border-google-blue focus-visible:ring-google-blue"
                  : ""
              }`}
            />

            {formErrors.motivation && (
              <p className="text-sm text-google-blue">
                {formErrors.motivation}
              </p>
            )}
          </div>

          {/* =================================================
                ACTIONS
               ================================================= */}

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsFormOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="
                  google-button
                  flex-1
                  bg-google-blue
                  hover:bg-google-blue/90
                  text-white
                  gdg-glow
                "
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
