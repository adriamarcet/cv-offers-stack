import { c as createComponent, a as createAstro, b as addAttribute, d as renderHead, e as renderSlot, r as renderTemplate, f as renderComponent } from '../chunks/astro/server_DHl_1lRw.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
/* empty css                                 */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useCallback } from 'react';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description = "Track technologies from job postings and monitor their frequency" } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><!-- Preconnect to external domains for performance --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><!-- Load Mozilla Protocol CSS --><link rel="stylesheet" href="/css/protocol.css"><link rel="stylesheet" href="/css/protocol-components.css">${renderHead()}</head> <body> <div id="app"> ${renderSlot($$result, $$slots["default"])} </div> <!-- Skip to main content link for accessibility --> <a href="#main-content" class="skip-link">
Skip to main content
</a> </body></html>`;
}, "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/layouts/Layout.astro", void 0);

const TechnologyItem = ({
  technology,
  onIncrement,
  onDecrement,
  onDelete
}) => {
  const handleIncrement = () => {
    onIncrement(technology.id);
  };
  const handleDecrement = () => {
    if (technology.count > 0) {
      onDecrement(technology.id);
    }
  };
  const handleDelete = () => {
    onDelete(technology.id);
  };
  return /* @__PURE__ */ jsx("div", { className: `technology-item technology-${technology.category}`, role: "listitem", children: /* @__PURE__ */ jsxs("div", { className: "technology-content", children: [
    /* @__PURE__ */ jsx("div", { className: "technology-header", children: /* @__PURE__ */ jsxs("h3", { className: "technology-name", id: `tech-${technology.id}`, children: [
      technology.name,
      " (",
      technology.count,
      ")"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "technology-controls", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn btn-action btn-increment",
          onClick: handleIncrement,
          "aria-label": `Add 1 to ${technology.name} count`,
          "aria-describedby": `tech-${technology.id}`,
          children: "Add 1"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn btn-action btn-decrement",
          onClick: handleDecrement,
          disabled: technology.count <= 1,
          "aria-label": `Decrease 1 from ${technology.name} count`,
          "aria-describedby": `tech-${technology.id}`,
          children: "Decrease 1"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "btn btn-action btn-delete",
          onClick: handleDelete,
          "aria-label": `Remove ${technology.name}`,
          "aria-describedby": `tech-${technology.id}`,
          children: "Remove"
        }
      )
    ] })
  ] }) });
};

const TechnologyList = ({
  technologies,
  onIncrement,
  onDecrement,
  onDelete,
  isLoading = false
}) => {
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "technology-list-loading", role: "status", "aria-live": "polite", children: [
      /* @__PURE__ */ jsx("div", { className: "loading-spinner", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx("p", { children: "Loading technologies..." })
    ] });
  }
  if (technologies.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "technology-list-empty", role: "status", children: /* @__PURE__ */ jsx("p", { children: "No technologies added yet. Add your first technology to get started!" }) });
  }
  const requiredTechnologies = technologies.filter((tech) => tech.category === "required").sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return a.name.localeCompare(b.name);
  });
  const desirableTechnologies = technologies.filter((tech) => tech.category === "desirable").sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return a.name.localeCompare(b.name);
  });
  const totalRequired = requiredTechnologies.reduce((sum, tech) => sum + tech.count, 0);
  const totalDesirable = desirableTechnologies.reduce((sum, tech) => sum + tech.count, 0);
  return /* @__PURE__ */ jsxs("div", { className: "technology-list-container", children: [
    /* @__PURE__ */ jsxs("h2", { className: "technology-list-title", children: [
      "📊 Technology Stack (",
      technologies.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "technology-categories", children: [
      /* @__PURE__ */ jsxs("div", { className: "technology-category required-category", children: [
        /* @__PURE__ */ jsx("h3", { className: "category-title required-title", children: "Required Skills" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "technology-list",
            role: "list",
            "aria-label": "List of required technologies",
            children: requiredTechnologies.map((technology) => /* @__PURE__ */ jsx(
              TechnologyItem,
              {
                technology,
                onIncrement,
                onDecrement,
                onDelete
              },
              technology.id
            ))
          }
        ),
        requiredTechnologies.length === 0 && /* @__PURE__ */ jsx("div", { className: "category-empty", children: /* @__PURE__ */ jsx("p", { children: "No required skills added yet" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "technology-category desirable-category", children: [
        /* @__PURE__ */ jsx("h3", { className: "category-title desirable-title", children: "Desirable Skills" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "technology-list",
            role: "list",
            "aria-label": "List of desirable technologies",
            children: desirableTechnologies.map((technology) => /* @__PURE__ */ jsx(
              TechnologyItem,
              {
                technology,
                onIncrement,
                onDecrement,
                onDelete
              },
              technology.id
            ))
          }
        ),
        desirableTechnologies.length === 0 && /* @__PURE__ */ jsx("div", { className: "category-empty", children: /* @__PURE__ */ jsx("p", { children: "No desirable skills added yet" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "technology-list-summary", role: "status", "aria-live": "polite", children: /* @__PURE__ */ jsxs("p", { children: [
      "Total: ",
      technologies.length,
      " | Required: ",
      requiredTechnologies.length,
      " (",
      totalRequired,
      ") | Desirable: ",
      desirableTechnologies.length,
      " (",
      totalDesirable,
      ")"
    ] }) })
  ] });
};

const AddTechnologyForm = ({
  onAddTechnology,
  isLoading = false
}) => {
  const [technologyName, setTechnologyName] = useState("");
  const [category, setCategory] = useState("required");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = technologyName.trim();
    if (!trimmedName) {
      setError("Please enter a technology name");
      return;
    }
    if (trimmedName.length < 2) {
      setError("Technology name must be at least 2 characters long");
      return;
    }
    if (trimmedName.length > 50) {
      setError("Technology name must be less than 50 characters");
      return;
    }
    setError("");
    onAddTechnology({ name: trimmedName, category });
    setTechnologyName("");
    setCategory("required");
  };
  const handleInputChange = (e) => {
    setTechnologyName(e.target.value);
    if (error) setError("");
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      className: "add-technology-form",
      onSubmit: handleSubmit,
      "aria-labelledby": "form-title",
      children: [
        /* @__PURE__ */ jsx("h2", { id: "form-title", className: "form-title", children: "Add New Technology" }),
        /* @__PURE__ */ jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "technology-name", className: "form-label", children: "Technology Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "technology-name",
              name: "technologyName",
              value: technologyName,
              onChange: handleInputChange,
              className: `form-input ${error ? "error" : ""}`,
              placeholder: "e.g., React, TypeScript, Node.js",
              "aria-describedby": error ? "error-message" : void 0,
              "aria-invalid": error ? "true" : "false",
              disabled: isLoading,
              required: true
            }
          ),
          error && /* @__PURE__ */ jsx("div", { id: "error-message", className: "error-message", role: "alert", children: error })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "form-group", children: /* @__PURE__ */ jsxs("fieldset", { className: "category-fieldset", children: [
          /* @__PURE__ */ jsx("legend", { className: "form-label", id: "category-legend", children: "Category" }),
          /* @__PURE__ */ jsxs("div", { className: "category-options", role: "radiogroup", "aria-labelledby": "category-legend", children: [
            /* @__PURE__ */ jsxs("label", { className: "category-option", id: "required-option", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "category",
                  value: "required",
                  checked: category === "required",
                  onChange: handleCategoryChange,
                  disabled: isLoading,
                  "aria-describedby": "required-option"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "radio-custom required-radio", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { className: "category-label", children: "Required" })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "category-option", id: "desirable-option", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "radio",
                  name: "category",
                  value: "desirable",
                  checked: category === "desirable",
                  onChange: handleCategoryChange,
                  disabled: isLoading,
                  "aria-describedby": "desirable-option"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "radio-custom desirable-radio", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { className: "category-label", children: "Desirable" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            className: "btn btn-primary",
            disabled: isLoading || !technologyName.trim(),
            "aria-describedby": "submit-help",
            style: { width: "100%" },
            children: isLoading ? "Adding..." : "Add Technology"
          }
        ),
        /* @__PURE__ */ jsx("div", { id: "submit-help", className: "help-text", children: "Tab: Input → Required → Desirable → Add Technology. Press Enter or click to add (starts with count 1)" })
      ]
    }
  );
};

const STORAGE_KEY = "cv-offers-technologies";
const getTechnologiesFromStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const technologies = JSON.parse(stored);
    return technologies.map((tech) => ({
      ...tech,
      createdAt: new Date(tech.createdAt),
      updatedAt: new Date(tech.updatedAt)
    }));
  } catch (error) {
    console.error("Error reading from session storage:", error);
    return [];
  }
};
const saveTechnologiesToStorage = (technologies) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(technologies));
  } catch (error) {
    console.error("Error saving to session storage:", error);
  }
};
const addTechnologyToStorage = (technology) => {
  const technologies = getTechnologiesFromStorage();
  const updatedTechnologies = [...technologies, technology];
  saveTechnologiesToStorage(updatedTechnologies);
  return updatedTechnologies;
};
const updateTechnologyInStorage = (id, count) => {
  const technologies = getTechnologiesFromStorage();
  const updatedTechnologies = technologies.map(
    (tech) => tech.id === id ? { ...tech, count, updatedAt: /* @__PURE__ */ new Date() } : tech
  );
  saveTechnologiesToStorage(updatedTechnologies);
  return updatedTechnologies;
};
const removeTechnologyFromStorage = (id) => {
  const technologies = getTechnologiesFromStorage();
  const updatedTechnologies = technologies.filter((tech) => tech.id !== id);
  saveTechnologiesToStorage(updatedTechnologies);
  return updatedTechnologies;
};

const API_BASE_URL = "/api/technologies";
const apiClient = {
  async getTechnologies() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Failed to fetch technologies");
      return await response.json();
    } catch (error) {
      console.error("Error fetching technologies:", error);
      return [];
    }
  },
  async createTechnology(data) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to create technology");
      return await response.json();
    } catch (error) {
      console.error("Error creating technology:", error);
      return null;
    }
  },
  async updateTechnology(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ count: data.count })
      });
      if (!response.ok) throw new Error("Failed to update technology");
      return await response.json();
    } catch (error) {
      console.error("Error updating technology:", error);
      return null;
    }
  },
  async deleteTechnology(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Failed to delete technology");
      return true;
    } catch (error) {
      console.error("Error deleting technology:", error);
      return false;
    }
  },
  async syncTechnologies(technologies) {
    try {
      const response = await fetch(`${API_BASE_URL}/sync`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ technologies })
      });
      if (!response.ok) throw new Error("Failed to sync technologies");
      return true;
    } catch (error) {
      console.error("Error syncing technologies:", error);
      return false;
    }
  }
};

const TechnologyTracker = () => {
  const [technologies, setTechnologies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle");
  useEffect(() => {
    const storedTechnologies = getTechnologiesFromStorage();
    setTechnologies(storedTechnologies);
  }, []);
  useEffect(() => {
    const syncWithDatabase = async () => {
      if (technologies.length === 0) return;
      setSyncStatus("syncing");
      try {
        const success = await apiClient.syncTechnologies(technologies);
        setSyncStatus(success ? "success" : "error");
      } catch (error) {
        console.error("Sync failed:", error);
        setSyncStatus("error");
      }
    };
    const interval = setInterval(syncWithDatabase, 3e4);
    return () => clearInterval(interval);
  }, [technologies]);
  const handleAddTechnology = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const newTechnology = {
        id: crypto.randomUUID(),
        name: data.name,
        count: 1,
        // Start with 1 since finding a technology is the first occurrence
        category: data.category,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      const updatedTechnologies = addTechnologyToStorage(newTechnology);
      setTechnologies(updatedTechnologies);
      const savedTechnology = await apiClient.createTechnology(data);
      if (savedTechnology) {
        const finalTechnologies = updatedTechnologies.map(
          (tech) => tech.id === newTechnology.id ? { ...tech, id: savedTechnology.id } : tech
        );
        setTechnologies(finalTechnologies);
        saveTechnologiesToStorage(finalTechnologies);
      }
    } catch (error) {
      console.error("Error adding technology:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleIncrement = useCallback(async (id) => {
    const technology = technologies.find((tech) => tech.id === id);
    if (!technology) return;
    const newCount = technology.count + 1;
    const updatedTechnologies = updateTechnologyInStorage(id, newCount);
    setTechnologies(updatedTechnologies);
    try {
      await apiClient.updateTechnology({ id, count: newCount });
    } catch (error) {
      console.error("Error updating technology:", error);
    }
  }, [technologies]);
  const handleDecrement = useCallback(async (id) => {
    const technology = technologies.find((tech) => tech.id === id);
    if (!technology || technology.count <= 0) return;
    const newCount = technology.count - 1;
    const updatedTechnologies = updateTechnologyInStorage(id, newCount);
    setTechnologies(updatedTechnologies);
    try {
      await apiClient.updateTechnology({ id, count: newCount });
    } catch (error) {
      console.error("Error updating technology:", error);
    }
  }, [technologies]);
  const handleDelete = useCallback(async (id) => {
    const updatedTechnologies = removeTechnologyFromStorage(id);
    setTechnologies(updatedTechnologies);
    try {
      await apiClient.deleteTechnology(id);
    } catch (error) {
      console.error("Error deleting technology:", error);
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "technology-tracker", children: [
    /* @__PURE__ */ jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ jsx("h1", { className: "app-title", children: "Job Search Technology Tracker" }),
      /* @__PURE__ */ jsx("p", { className: "app-description", children: "Track technologies from job postings and monitor their frequency" }),
      syncStatus !== "idle" && /* @__PURE__ */ jsxs("div", { className: `sync-status sync-${syncStatus}`, role: "status", "aria-live": "polite", children: [
        syncStatus === "syncing" && "Syncing with database...",
        syncStatus === "success" && "Data synced successfully",
        syncStatus === "error" && "Sync failed - data saved locally"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "app-main", children: [
      /* @__PURE__ */ jsx(
        AddTechnologyForm,
        {
          onAddTechnology: handleAddTechnology,
          isLoading
        }
      ),
      /* @__PURE__ */ jsx(
        TechnologyList,
        {
          technologies,
          onIncrement: handleIncrement,
          onDecrement: handleDecrement,
          onDelete: handleDelete,
          isLoading
        }
      )
    ] })
  ] });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Job Search Technology Tracker" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TechnologyTracker", TechnologyTracker, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/components/TechnologyTracker", "client:component-export": "TechnologyTracker" })} ` })}`;
}, "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/pages/index.astro", void 0);

const $$file = "/Users/adria/Sites/00.Spikes/cv-offers-stack/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
