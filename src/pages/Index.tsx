// @ts-nocheck

import { useEffect, useMemo, useRef, useState } from "react";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import gdgLogo from "../assets/gdg-logo2.png";

import { ApplicationForm } from "../components/ApplicationForm";
import { GOOGLE_FORM_URL } from "../lib/constants";



gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  /* =====================================================
     STATE
     ===================================================== */

  const [navOpen, setNavOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const [countdown, setCountdown] = useState("—");

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [preSelectedPosition, setPreSelectedPosition] = useState<
    string | undefined
  >(undefined);

  const currentYear = new Date().getFullYear();

  /* =====================================================
     NAVBAR SCROLL
     ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =====================================================
     APPLICATION FORM
     ===================================================== */

  const openApplication = (position?: string) => {
    setPreSelectedPosition(position);

    setIsFormOpen(true);

    setNavOpen(false);
  };

  const clearPreSelectedPosition = () => {
    setPreSelectedPosition(undefined);
  };

  /* =====================================================
     REFS
     ===================================================== */

  const wipeLayerRef = useRef(null);

  const customCursorRef = useRef(null);

  /* =====================================================
     COUNTDOWN
     
     APPLICATION DEADLINE:
     26 AUGUST 2026 — 11:59 PM IST
     ===================================================== */

  useEffect(() => {
    // October is month 9 in JavaScript Date.
    // 11 October 2026, 23:59:59.999 IST
    const APPLY_DEADLINE = new Date("2026-10-11T23:59:59.999+05:30");

    const updateCountdown = () => {
      const diff = APPLY_DEADLINE.getTime() - Date.now();

      if (diff <= 0) {
        setCountdown("CLOSED");

        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      const minutes = Math.floor((diff / (1000 * 60)) % 60);

      setCountdown(`${days}D ${hours}H ${minutes}M`);
    };

    updateCountdown();

    // Update every minute.
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  /* =====================================================
     CUSTOM CURSOR
     ===================================================== */

  useEffect(() => {
    const cursor = customCursorRef.current;

    if (!cursor) return;

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
    });

    const xMove = gsap.quickTo(cursor, "x", {
      duration: 0.15,
      ease: "power3",
    });

    const yMove = gsap.quickTo(cursor, "y", {
      duration: 0.15,
      ease: "power3",
    });

    const onMouseMove = (event) => {
      xMove(event.clientX);

      yMove(event.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactives = document.querySelectorAll(
      `
        a,
        button,
        .acc-trigger,
        .nav-toggle,
        .hero-team-photo
        `,
    );

    const onEnter = () => {
      cursor.classList.add("hover");
    };

    const onLeave = () => {
      cursor.classList.remove("hover");
    };

    interactives.forEach((element) => {
      element.addEventListener("mouseenter", onEnter);

      element.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);

      interactives.forEach((element) => {
        element.removeEventListener("mouseenter", onEnter);

        element.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  /* =====================================================
     PIXEL WIPE
     ===================================================== */

  useEffect(() => {
    if (!wipeLayerRef.current) {
      return;
    }

    const blocks = wipeLayerRef.current.children;

    if (!blocks) {
      return;
    }

    gsap.set(blocks, {
      opacity: 0,
      scale: 0.5,
    });

    gsap.to(blocks, {
      opacity: 1,
      scale: 1.05,

      ease: "power2.out",

      stagger: {
        amount: 1,

        grid: [10, 15],

        from: [0.5, 1],
      },

      scrollTrigger: {
        trigger: "#why",

        start: "top bottom",

        end: "top 10%",

        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  /* =====================================================
     ACCORDION
     ===================================================== */

  useEffect(() => {
    const items = document.querySelectorAll(".acc-item");

    items.forEach((item) => {
      const panel = item.querySelector(".acc-panel");

      if (!panel) {
        return;
      }

      item.onmouseenter = () => {
        items.forEach((current) => {
          current.classList.remove("open");

          const currentPanel = current.querySelector(".acc-panel");

          if (currentPanel) {
            currentPanel.style.maxHeight = null;
          }
        });

        item.classList.add("open");

        panel.style.maxHeight = panel.scrollHeight + "px";
      };
    });

    const firstPanel = document.querySelector(".acc-item.open .acc-panel");

    if (firstPanel) {
      firstPanel.style.maxHeight = firstPanel.scrollHeight + "px";
    }
  }, []);

  /* =====================================================
     PIXEL BLOCKS
     ===================================================== */

  const pixelBlocks = useMemo(() => {
    return Array.from({
      length: 150,
    }).map((_, index) => {
      const column = index % 15;

      const shift = Math.floor(Math.random() * 3) - 1;

      const jaggedColumn = column + shift;

      let blockColor = "";

      if (jaggedColumn < 4) {
        blockColor = "#eef0eb"; // Light Stone
      } else if (jaggedColumn < 8) {
        blockColor = "#1f3027"; // Dark Ink
      } else if (jaggedColumn < 12) {
        blockColor = "#7c8780"; // Grey Green
      } else {
        blockColor = "#c0c4ba"; // Mid Sand
      }

      return (
        <div
          key={index}
          className="wipe-block"
          style={{
            backgroundColor: blockColor,
          }}
        />
      );
    });
  }, []);

  /* =====================================================
     PAGE
     ===================================================== */

  return (
    <>
      {/* =================================================
          CUSTOM CURSOR
         ================================================= */}

      <div className="custom-cursor" ref={customCursorRef} />

      {/* =================================================
          NAVBAR
         ================================================= */}

      <header
        className={`corners site-header ${isScrolled ? "is-scrolled" : ""}`}
      >
        <a href="#hero" className="nav-logo" aria-label="GDG Home">
          <img src={gdgLogo} alt="GDG Logo" className="logo-image" />
        </a>

        <button
          type="button"
          className="nav-toggle eyebrow"
          onClick={() => setNavOpen(!navOpen)}
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
        >
          MENU ≡
        </button>

        <nav>
          <ul
            className={navOpen ? "open" : ""}
            onClick={() => setNavOpen(false)}
          >
            <li>
              <a href="#why">Why INNOVEST</a>
            </li>


            <li>
              <a href="#process">Process</a>
            </li>

            <li>
              <button
                type="button"
                className="nav-cta diven-action-button"
                onClick={() => window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer")}
              >
                Apply
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* =================================================
          PIXEL WIPE
         ================================================= */}

      <div className="fixed-wipe-layer" ref={wipeLayerRef}>
        {pixelBlocks}
      </div>

      {/* =================================================
          HERO
         ================================================= */}

      <section className="hero corners" id="hero">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none"
          }}
        >
          <picture>
            <source media="(max-width: 900px)" srcSet="/shark-cash-mobile.jpg" />
            <source media="(orientation: portrait)" srcSet="/shark-cash-mobile.jpg" />
            <img src="/shark-cash.jpg" alt="Shark Fin and Cash" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'bottom', filter: 'contrast(1.15) saturate(1.2) brightness(1.05)', transform: 'translateZ(0)' }} />
          </picture>
          {/* Gradient overlay to ensure text readability at the top and bottom */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, var(--stone) 0%, transparent 30%, transparent 60%, var(--stone) 95%)' }} />
        </div>

        <div className="hero-top-row" style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "6vh" }}>
          <h1 className="hero-head" style={{ margin: 0, whiteSpace: "nowrap" }}>
            INNOVATION &times;
          </h1>
          <h1 className="hero-head" style={{ margin: 0, whiteSpace: "nowrap" }}>
            INDUSTRY &times;
          </h1>
        </div>

        <div className="hero-mid" style={{ pointerEvents: "none", zIndex: 10 }}></div>

        {/* =================================================
            HERO FOOTER
           ================================================= */}

        <div className="hero-bottom-row" style={{ position: "relative", zIndex: 10, alignItems: "flex-end" }}>
          <div className="hero-about" style={{ maxWidth: "450px" }}>
            <div className="eyebrow" style={{ marginBottom: "12px", color: "var(--ink)" }}>NOT JUST ANOTHER PROJECT PRESENTATION.</div>

            <p style={{ margin: 0, color: "var(--ink)" }}>
              INNOVEST is a platform for student innovators to take their ideas beyond the classroom.<br />
              Showcase your project, prototype, product or early-stage venture and get direct interaction with people from industry, entrepreneurship, investment and the regulatory ecosystem.<br />
              The goal isn't to judge your idea.<br />
              The goal is to discover what comes next.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6vh" }}>
            <h1 className="hero-head row2" style={{ margin: 0, lineHeight: 1 }}>
              INVESTMENT
            </h1>

            <div className="hero-meta">
              <div>
                <div className="eyebrow" style={{ color: "var(--ink)" }}>Applications</div>
                <div className="val clock-live" style={{ color: "var(--ink)" }}>
                  {countdown === "CLOSED" ? "CLOSED" : "OPEN"}
                </div>
              </div>

              <div>
                <div className="eyebrow" style={{ color: "var(--ink)" }}>Closes in</div>
                <div className="val" style={{ color: "var(--ink)" }}>{countdown}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          WHY JOIN
         ================================================= */}

                  <section className="why corners" id="why">
        <div className="why-head">
          <h2 style={{ color: "var(--ink)" }}>Why INNOVEST</h2>
        </div>

        <div className="accordion">
          <div className="acc-item open">
            <button className="acc-trigger" type="button">
              <span className="idx">[01]</span>
              <span className="title">What is INNOVEST?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                INNOVEST is a non-competitive innovation showcase where students can present projects, prototypes, products and early-stage ventures to industry experts, entrepreneurs, investors and regulatory officials.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[02]</span>
              <span className="title">Who can participate?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                Students of Vidyalankar Institute of Technology, Vidyalankar Polytechnic and Vidyalankar School of Information Technology.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[03]</span>
              <span className="title">Is INNOVEST a competition?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                No. There will be no ranking and no winner. The purpose is to connect promising innovations with the right guidance and opportunities.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[04]</span>
              <span className="title">What can I showcase?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                Projects, prototypes, products and early-stage ventures.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[05]</span>
              <span className="title">Do I need a fully working product?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                The showcase is intended for promising innovations at different stages of development. Participants should be able to clearly explain their problem, solution and current development stage.
              </div>
            </div>
          </div>

          <div className="acc-item">
            <button className="acc-trigger" type="button">
              <span className="idx">[06]</span>
              <span className="title">What will experts look at?</span>
              <span className="plus">+</span>
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                Problem relevance, innovation, prototype/product readiness, real-world potential, team preparedness and the value your project can derive from expert interaction.
              </div>
            </div>
          </div>
        </div>
      </section>

      

            {/* =================================================
          PROCESS
         ================================================= */}

      <section className="process corners" id="process">
        <h2>How to apply</h2>

        <div className="process-grid">
          <div className="steps">
            <div className="step">
              <div className="n">01</div>
              <div>
                <h4>Registration</h4>
                <p>Register your project, prototype, product or early-stage venture through the common registration form.</p>
              </div>
            </div>

            <div className="step">
              <div className="n">02</div>
              <div>
                <h4>Internal Scrutiny</h4>
                <p>An internal scrutiny will be conducted on Oct 13 to shortlist showcase-ready projects.</p>
              </div>
            </div>

            <div className="step">
              <div className="n">03</div>
              <div>
                <h4>Main Event Showcase</h4>
                <p>Selected teams will present to industry experts, entrepreneurs, investors and regulatory officials on Oct 16.</p>
              </div>
            </div>

            <div className="step">
              <div className="n">04</div>
              <div>
                <h4>Feedback &amp; Opportunities</h4>
                <p>Receive practical guidance, mentoring, and potential opportunities for incubation, pilot deployment or further investment.</p>
              </div>
            </div>
          </div>

          <div className="mockup">
            <div className="mockup-bar">
              <span />
              <span />
              <span />
            </div>

            <div className="mockup-body">
              <div className="m-eyebrow">INNOVEST Registration</div>

              <h3>Tell us about your project</h3>

              <div className="m-field">
                <label>Team/Project Name</label>
                <div className="bar" />
              </div>

              <div className="m-field">
                <label>Current Stage</label>
                <div className="bar" />
              </div>

              <div className="m-tags">
                <span>Idea</span>
                <span>Prototype</span>
                <span>Working Product</span>
                <span>Early Venture</span>
              </div>

              <button
                type="button"
                className="m-submit diven-action-button"
                onClick={() => window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer")}
              >
                Register Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          FOOTER
         ================================================= */}

      <footer id="apply">
        <div className="cta-block corners">
          <div className="cta-left">
            <h2>
              YOU BUILT IT.<br />
              NOW LET'S SEE<br />
              WHERE IT CAN GO.
            </h2>

            <p>
              Applications close soon — register your project and get ready to showcase your innovation to industry leaders.
            </p>

            <button
              type="button"
              className="apply-btn diven-action-button"
              onClick={() => window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer")}
            >
              Apply now →
            </button>

            <div className="deadline-box">
              Applications close
              <div className="count">{countdown}</div>
            </div>
          </div>

          <div className="cta-col">
            <h5>Links</h5>
            <ul>
              <li>
                <a href="https://www.instagram.com/gdg_vit" target="_blank" rel="noopener noreferrer">Instagram</a>
              </li>
              <li>
                <a href="https://gdg.community.dev/gdg-on-campus-vidyalankar-institute-of-technology-mumbai-india/" target="_blank" rel="noopener noreferrer">GDG on Campus</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/gdg-vit-mumbai/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
              <li>
                <a href="https://github.com/gdg-vit" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
            </ul>
          </div>

          <div className="cta-col">
            <h5>Navigation</h5>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#why">Why INNOVEST</a></li>
              <li><a href="#process">Process</a></li>
            </ul>
          </div>
        </div>

        <div className="wordmark">INNOVEST</div>

        <div className="fine-print">
          <span>© {currentYear} VIT, VP, VSIT</span>
          <span>MADE FOR INNOVEST 2026</span>
        </div>
      </footer>

      {/* =================================================
          EXISTING SUPABASE APPLICATION FORM
         ================================================= */}

      <ApplicationForm
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        preSelectedPosition={preSelectedPosition}
        clearPreSelectedPosition={clearPreSelectedPosition}
        trigger={
          <span aria-hidden="true" className="application-form-anchor" />
        }
      />
    </>
  );
}
