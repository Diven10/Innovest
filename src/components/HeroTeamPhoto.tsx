import {
  useMemo,
  useState,
  type CSSProperties,
} from "react";

const BAR_COUNT = 12;

const floatingElements = [
  {
    shape: "circle",
    color: "blue",
    x: 8,
    y: 18,
    size: 7,
    rotate: 0,
    duration: 7,
    delay: "-1s",
  },
  {
    shape: "ribbon",
    color: "red",
    x: 16,
    y: 55,
    size: 8,
    rotate: 24,
    duration: 8,
    delay: "-3s",
  },
  {
    shape: "square",
    color: "yellow",
    x: 86,
    y: 22,
    size: 9,
    rotate: 18,
    duration: 8,
    delay: "-2s",
  },
  {
    shape: "circle",
    color: "green",
    x: 95,
    y: 45,
    size: 8,
    rotate: 0,
    duration: 7,
    delay: "-4s",
  },
  {
    shape: "triangle",
    color: "blue",
    x: 91,
    y: 78,
    size: 10,
    rotate: -15,
    duration: 9,
    delay: "-2s",
  },
  {
    shape: "ribbon",
    color: "green",
    x: 9,
    y: 84,
    size: 7,
    rotate: -18,
    duration: 8,
    delay: "-4s",
  },
  {
    shape: "circle",
    color: "yellow",
    x: 64,
    y: 91,
    size: 6,
    rotate: 0,
    duration: 9,
    delay: "-2s",
  },
  {
    shape: "square",
    color: "red",
    x: 49,
    y: 9,
    size: 7,
    rotate: -20,
    duration: 8,
    delay: "-5s",
  },
];

function getSliceStyle(
  index: number,
): CSSProperties {
  const position =
    (index /
      (BAR_COUNT - 1)) *
    100;

  return {
    left:
      `${(index * 100) / BAR_COUNT}%`,

    width:
      `${100 / BAR_COUNT + 0.6}%`,

    backgroundImage:
      "url('/core26.png')",

    backgroundSize:
      `${BAR_COUNT * 100}% 100%`,

    backgroundPosition:
      `${position}% 0`,

    transitionDelay:
      `${0.035 * index}s`,
  };
}

export default function HeroTeamPhoto() {
  const [active, setActive] =
    useState(false);

  const slices = useMemo(
    () =>
      Array.from(
        {
          length:
            BAR_COUNT,
        },
        (_, index) =>
          index,
      ),
    [],
  );

  return (
    <>
      {/* =====================================================
          FLOATING GOOGLE ELEMENTS
         ===================================================== */}

      <div
        className="hero-floating-elements"
        aria-hidden="true"
      >
        {floatingElements.map(
          (
            item,
            index,
          ) => {
            const style =
              {
                left:
                  `${item.x}%`,

                top:
                  `${item.y}%`,

                width:
                  item.shape ===
                  "ribbon"
                    ? `${item.size * 0.65}px`
                    : `${item.size}px`,

                height:
                  item.shape ===
                  "ribbon"
                    ? `${item.size * 1.8}px`
                    : `${item.size}px`,

                transform:
                  `rotate(${item.rotate}deg)`,

                animationDuration:
                  `${item.duration}s`,

                animationDelay:
                  item.delay,
              } as CSSProperties;

            return (
              <span
                key={
                  index
                }
                className={`
                  hero-floating-shape
                  shape-${item.shape}
                  color-${item.color}
                `}
                style={
                  style
                }
              />
            );
          },
        )}
      </div>

      {/* =====================================================
          PHOTO
         ===================================================== */}

      <div
        className={`
          hero-team-visual
          ${active ? "active" : ""}
        `}
      >
        <div
          className="hero-team-photo"
          onPointerEnter={() =>
            setActive(
              true,
            )
          }
          onPointerLeave={() =>
            setActive(
              false,
            )
          }
          onPointerDown={() =>
            setActive(
              (value) =>
                !value,
            )
          }
          role="img"
          aria-label="GDG On Campus VIT Mumbai Core Team"
        >
          <div
            className="hero-team-photo-glow"
            aria-hidden="true"
          />

          <img
            src="/core26.png"
            alt="GDG On Campus VIT Mumbai Core Team"
            className="hero-team-photo-grayscale"
          />

          <div
            className="hero-team-photo-color"
            aria-hidden="true"
          >
            {slices.map(
              (
                index,
              ) => (
                <span
                  key={
                    index
                  }
                  className="hero-team-photo-slice"
                  style={getSliceStyle(
                    index,
                  )}
                />
              ),
            )}
          </div>

          <div
            className="hero-team-photo-overlay"
            aria-hidden="true"
          />
        </div>

        <div
          className="hero-team-photo-hint"
          aria-hidden="true"
        >
          HOVER TO REVEAL
        </div>
      </div>

      {/* =====================================================
          STYLES
         ===================================================== */}

      <style>{`

        /* =====================================================
           DESKTOP
         ===================================================== */

        .hero-team-visual {
          position: absolute;

          left: 50%;
          top: 52%;

          width:
            min(72vw, 760px);

          height:
            min(52vh, 500px);

          transform:
            translate(-50%, -50%);

          display: flex;

          align-items: center;
          justify-content: center;

          pointer-events:
            none;

          z-index:
            1;
        }

        .hero-team-photo {
          position: relative;

          width:
            min(58vw, 600px);

          aspect-ratio:
            3 / 2;

          border-radius:
            26px;

          overflow:
            hidden;

          pointer-events:
            auto;

          cursor:
            pointer;

          z-index:
            1;

          background:
            #ededed;

          box-shadow:
            0 26px 60px
            rgba(
              32,
              33,
              36,
              0.12
            ),

            0 10px 26px
            rgba(
              66,
              133,
              244,
              0.08
            );

          transform:
            translateZ(0);

          transition:
            transform
            0.45s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            ),

            box-shadow
            0.45s ease;
        }

        .hero-team-photo:hover,
        .hero-team-visual.active
          .hero-team-photo {
          transform:
            translateY(-8px)
            scale(1.012);

          box-shadow:
            0 32px 76px
            rgba(
              66,
              133,
              244,
              0.16
            ),

            0 12px 28px
            rgba(
              234,
              67,
              53,
              0.08
            );
        }

        /* =====================================================
           PHOTO GLOW
         ===================================================== */

        .hero-team-photo-glow {
          position:
            absolute;

          inset:
            -28px;

          border-radius:
            44px;

          z-index:
            -1;

          background:
            radial-gradient(
              circle at 32% 34%,
              rgba(
                66,
                133,
                244,
                0.13
              ),
              transparent 45%
            ),

            radial-gradient(
              circle at 70% 28%,
              rgba(
                234,
                67,
                53,
                0.10
              ),
              transparent 44%
            ),

            radial-gradient(
              circle at 55% 78%,
              rgba(
                52,
                168,
                83,
                0.09
              ),
              transparent 48%
            ),

            radial-gradient(
              circle at 80% 72%,
              rgba(
                251,
                188,
                4,
                0.09
              ),
              transparent 45%
            );

          filter:
            blur(28px);

          opacity:
            0.85;
        }

        /* =====================================================
           IMAGE
         ===================================================== */

        .hero-team-photo-grayscale,
        .hero-team-photo-color,
        .hero-team-photo-overlay {
          position:
            absolute;

          inset:
            0;

          width:
            100%;

          height:
            100%;

          border-radius:
            inherit;
        }

        .hero-team-photo-grayscale {
          display:
            block;

          object-fit:
            cover;

          filter:
            grayscale(100%)
            contrast(116%)
            brightness(0.97);

          transform:
            scale(1.002);
        }

        /* =====================================================
           COLOUR REVEAL
         ===================================================== */

        .hero-team-photo-color {
          overflow:
            hidden;

          pointer-events:
            none;

          z-index:
            2;
        }

        .hero-team-photo-slice {
          position:
            absolute;

          top:
            0;

          bottom:
            0;

          opacity:
            0;

          transform:
            scaleY(0.96);

          background-repeat:
            no-repeat;

          transition:
            opacity
            0.42s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            ),

            transform
            0.42s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            );
        }

        .hero-team-photo:hover
          .hero-team-photo-slice,
        .hero-team-visual.active
          .hero-team-photo-slice {
          opacity:
            1;

          transform:
            scaleY(1);
        }

        /* =====================================================
           OVERLAY
         ===================================================== */

        .hero-team-photo-overlay {
          pointer-events:
            none;

          z-index:
            4;

          background:
            linear-gradient(
              180deg,
              rgba(
                255,
                255,
                255,
                0.04
              ),
              transparent 22%,
              transparent 78%,
              rgba(
                32,
                33,
                36,
                0.05
              )
            );
        }

        /* =====================================================
           HOVER TEXT
         ===================================================== */

        .hero-team-photo-hint {
          position:
            absolute;

          right:
            34px;

          bottom:
            24px;

          z-index:
            5;

          font-family:
            var(--mono);

          font-size:
            10px;

          letter-spacing:
            0.12em;

          text-transform:
            uppercase;

          color:
            rgba(
              32,
              33,
              36,
              0.48
            );

          pointer-events:
            none;

          transition:
            opacity
            0.25s ease;
        }

        .hero-team-visual:hover
          .hero-team-photo-hint {
          opacity:
            0;
        }

        /* =====================================================
           FLOATING ELEMENTS
         ===================================================== */

        .hero-floating-elements {
          position:
            fixed;

          inset:
            0;

          width:
            100vw;

          height:
            100vh;

          pointer-events:
            none;

          overflow:
            hidden;

          z-index:
            2;
        }

        .hero-floating-shape {
          position:
            absolute;

          display:
            block;

          pointer-events:
            none;

          opacity:
            0.68;

          animation:
            heroFloatingShape
            7s
            ease-in-out
            infinite
            alternate;

          will-change:
            transform,
            margin-top;

          filter:
            drop-shadow(
              0 3px 7px
              rgba(
                32,
                33,
                36,
                0.08
              )
            );
        }

        .shape-circle {
          border-radius:
            50%;
        }

        .shape-square {
          border-radius:
            2px;
        }

        .shape-ribbon {
          border-radius:
            999px;
        }

        .shape-triangle {
          width:
            0 !important;

          height:
            0 !important;

          background:
            transparent !important;

          border-left:
            6px solid
            transparent;

          border-right:
            6px solid
            transparent;

          border-bottom:
            11px solid
            currentColor;
        }

        .color-blue {
          background:
            #4285f4;

          color:
            #4285f4;
        }

        .color-red {
          background:
            #ea4335;

          color:
            #ea4335;
        }

        .color-yellow {
          background:
            #fbbc04;

          color:
            #fbbc04;
        }

        .color-green {
          background:
            #34a853;

          color:
            #34a853;
        }

        @keyframes heroFloatingShape {
          0% {
            margin-top:
              0;

            transform:
              translate3d(
                0,
                0,
                0
              )
              rotate(0deg);
          }

          100% {
            margin-top:
              10px;

            transform:
              translate3d(
                4px,
                0,
                0
              )
              rotate(8deg);
          }
        }

        /* =====================================================
           MOBILE — IMPORTANT
           
           The photo becomes part of the normal document flow.
           This prevents SHIP from overlapping it.
         ===================================================== */

        @media (max-width: 600px) {

          .hero-team-visual {
            position:
              relative;

            left:
              auto;

            top:
              auto;

            width:
              100%;

            height:
              auto;

            min-height:
              0;

            transform:
              none;

            display:
              flex;

            align-items:
              center;

            justify-content:
              center;

            pointer-events:
              none;

            z-index:
              1;

            padding:
              0;
          }

          .hero-team-photo {
            width:
              calc(
                100vw - 48px
              );

            max-width:
              661px;

            aspect-ratio:
              3 / 2;

            border-radius:
              20px;

            box-shadow:
              0 18px 40px
              rgba(
                32,
                33,
                36,
                0.13
              );
          }

          .hero-team-photo:hover {
            transform:
              none;

            box-shadow:
              0 18px 40px
              rgba(
                32,
                33,
                36,
                0.13
              );
          }

          .hero-team-photo-hint {
            display:
              none;
          }

          .hero-team-photo-glow {
            inset:
              -15px;

            border-radius:
              30px;

            filter:
              blur(18px);
          }

          /*
           * Keep the floating elements tiny.
           */

          .hero-floating-shape {
            opacity:
              0.55;

            transform:
              scale(0.8);
          }

          /*
           * Hide the least important elements on phones.
           */

          .hero-floating-shape:nth-child(
            n + 6
          ) {
            display:
              none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-floating-shape {
            animation:
              none !important;
          }

          .hero-team-photo {
            transition:
              none;
          }
        }

      `}</style>
    </>
  );
}
