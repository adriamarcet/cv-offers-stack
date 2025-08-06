import { c as createComponent, a as createAstro, b as addAttribute, e as renderHead, f as renderSlot, r as renderTemplate } from './astro/server_BGMPX5oY.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                        */
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Track technologies from job postings and monitor their frequency" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><!-- Preconnect to external domains for performance --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Load Mozilla Protocol CSS --><link rel="stylesheet" href="/css/protocol.css"><link rel="stylesheet" href="/css/protocol-components.css">${renderHead()}</head> <body> <div id="app"> ${renderSlot($$result, $$slots["default"])} </div> <!-- Skip to main content link for accessibility --> <a href="#main-content" class="skip-link">
Skip to main content
</a> </body></html>`;
}, "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/layouts/Layout.astro", void 0);

const NotificationBar = ({
  type,
  message,
  onClose,
  isVisible
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible]);
  if (!isVisible && !isAnimating) return null;
  const getNotificationClasses = () => {
    const baseClass = "mzp-c-notification-bar";
    const typeClass = `mzp-t-${type}`;
    return `${baseClass} ${typeClass}`;
  };
  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✗";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "";
    }
  };
  const handleClose = () => {
    if (onClose) {
      setIsAnimating(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };
  return /* @__PURE__ */ jsxs(
    "aside",
    {
      className: getNotificationClasses(),
      role: "status",
      "aria-live": "polite",
      style: {
        animation: isVisible ? "notification-slide-in 0.3s ease-out forwards" : "notification-slide-out 0.3s ease-out forwards"
      },
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "mzp-c-notification-bar-button",
            type: "button",
            onClick: handleClose,
            "aria-label": "Close notification",
            style: {
              position: "absolute",
              right: "0",
              top: "0",
              width: "20px",
              height: "20px",
              background: 'url("/img/icons/close.svg") 50% / 20px 20px no-repeat',
              border: "none",
              cursor: "pointer",
              textIndent: "-9999px",
              overflow: "hidden",
              padding: "0",
              margin: "8px"
            },
            children: "Close notification"
          }
        ),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("span", { style: { marginRight: "8px" }, children: getIcon() }),
          message
        ] })
      ]
    }
  );
};

export { $$Layout as $, NotificationBar as N };
