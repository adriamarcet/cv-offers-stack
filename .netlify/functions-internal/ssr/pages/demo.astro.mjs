import { c as createComponent, d as renderComponent, r as renderTemplate } from '../chunks/astro/server_BGMPX5oY.mjs';
import 'kleur/colors';
import 'html-escaper';
import { N as NotificationBar, $ as $$Layout } from '../chunks/NotificationBar_14xnGsk0.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../renderers.mjs';

const NotificationDemo = () => {
  const [notification, setNotification] = useState({
    type: "info",
    message: "",
    isVisible: false
  });
  const showNotification = (type, message) => {
    setNotification({
      type,
      message,
      isVisible: true
    });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, isVisible: false }));
    }, 3e3);
  };
  const handleCloseNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };
  return /* @__PURE__ */ jsxs("div", { style: { padding: "20px", maxWidth: "800px", margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx("h1", { children: "Mozilla Protocol Notification Bar Demo" }),
    /* @__PURE__ */ jsx("p", { children: "Click the buttons below to see different notification types:" }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => showNotification("success", "Data synced successfully!"),
          style: { padding: "10px 20px", backgroundColor: "#008000", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
          children: "Success Notification"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => showNotification("error", "Sync failed - data saved locally"),
          style: { padding: "10px 20px", backgroundColor: "#d70022", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
          children: "Error Notification"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => showNotification("warning", "Update failed - changes saved locally"),
          style: { padding: "10px 20px", backgroundColor: "#ff9400", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
          children: "Warning Notification"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => showNotification("info", "Information message"),
          style: { padding: "10px 20px", backgroundColor: "#0060df", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
          children: "Info Notification"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      NotificationBar,
      {
        type: notification.type,
        message: notification.message,
        isVisible: notification.isVisible,
        onClose: handleCloseNotification
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: "40px", padding: "20px", backgroundColor: "#f9f9fa", borderRadius: "8px" }, children: [
      /* @__PURE__ */ jsx("h2", { children: "Notification Variants" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Success:" }),
          " Green background with checkmark icon - for successful operations"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Error:" }),
          " Red background with X icon - for error states"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Warning:" }),
          " Orange background with warning icon - for warnings"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Info:" }),
          " Blue background with info icon - for informational messages"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { children: "Features:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Auto-dismiss after 3-5 seconds" }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("strong", { children: "Manual close button (X) - Click the X button to close notifications" }) }),
        /* @__PURE__ */ jsx("li", { children: "Accessible with proper ARIA labels" }),
        /* @__PURE__ */ jsx("li", { children: "Responsive design" }),
        /* @__PURE__ */ jsx("li", { children: "Mozilla Protocol styling" })
      ] }),
      /* @__PURE__ */ jsx("h3", { children: "Testing Instructions:" }),
      /* @__PURE__ */ jsxs("ol", { children: [
        /* @__PURE__ */ jsx("li", { children: "Click any notification button above" }),
        /* @__PURE__ */ jsx("li", { children: "Look for the X button in the top-right corner of the notification" }),
        /* @__PURE__ */ jsx("li", { children: "Click the X button to manually close the notification" }),
        /* @__PURE__ */ jsx("li", { children: "Or wait for the auto-dismiss (3 seconds)" })
      ] })
    ] })
  ] });
};

const $$Demo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Notification Bar Demo" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "NotificationDemo", NotificationDemo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/components/NotificationDemo", "client:component-export": "NotificationDemo" })} ` })}`;
}, "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/pages/demo.astro", void 0);

const $$file = "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/pages/demo.astro";
const $$url = "/demo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Demo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
