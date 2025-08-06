import { c as createComponent, d as renderComponent, r as renderTemplate } from '../chunks/astro/server_BGMPX5oY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { N as NotificationBar, $ as $$Layout } from '../chunks/NotificationBar_14xnGsk0.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../renderers.mjs';

const NotificationTest = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState("success");
  const handleShowNotification = (type) => {
    setNotificationType(type);
    setShowNotification(true);
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
    console.log("Notification closed manually!");
  };
  return /* @__PURE__ */ jsxs("div", { style: { padding: "20px", maxWidth: "600px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx("h1", { children: "Notification X Button Test" }),
    /* @__PURE__ */ jsx("p", { children: "This test verifies that the X button is visible and functional." }),
    /* @__PURE__ */ jsxs("div", { style: { marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleShowNotification("success"),
          style: {
            padding: "10px 20px",
            backgroundColor: "#008000",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          },
          children: "Test Success Notification"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleShowNotification("error"),
          style: {
            padding: "10px 20px",
            backgroundColor: "#d70022",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px"
          },
          children: "Test Error Notification"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleShowNotification("warning"),
          style: {
            padding: "10px 20px",
            backgroundColor: "#ff9400",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          },
          children: "Test Warning Notification"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      NotificationBar,
      {
        type: notificationType,
        message: `This is a ${notificationType} notification. Look for the X button in the top-right corner!`,
        isVisible: showNotification,
        onClose: handleCloseNotification
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: {
      marginTop: "20px",
      padding: "15px",
      backgroundColor: "#e8f4fd",
      border: "1px solid #0060df",
      borderRadius: "4px"
    }, children: [
      /* @__PURE__ */ jsx("h3", { children: "Instructions:" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: "Click any test button above" }),
        /* @__PURE__ */ jsx("li", { children: "Look for the notification that appears" }),
        /* @__PURE__ */ jsx("li", { children: "Find the X button in the top-right corner of the notification" }),
        /* @__PURE__ */ jsx("li", { children: "Click the X button to close the notification" }),
        /* @__PURE__ */ jsx("li", { children: "Check the browser console for confirmation" })
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Note:" }),
        " The X button should be visible as a small icon in the top-right corner of each notification."
      ] })
    ] })
  ] });
};

const $$Test = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Notification X Button Test" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NotificationTest", NotificationTest, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/components/NotificationTest", "client:component-export": "NotificationTest" })} ` })}`;
}, "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/pages/test.astro", void 0);

const $$file = "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Test,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
