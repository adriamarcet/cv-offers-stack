import { t as technologyApi } from '../../chunks/supabase_D5vsTZNy.mjs';
export { renderers } from '../../renderers.mjs';

let fallbackTechnologies = [];
const GET = async () => {
  try {
    const technologies = await technologyApi.getAll();
    if (technologies.length > 0 || "https://lujriqenfmzocgwbxsyg.supabase.co") {
      return new Response(JSON.stringify(technologies), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        }
      });
    }
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch technologies" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!body.name || typeof body.name !== "string") {
      return new Response(JSON.stringify({ error: "Technology name is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const trimmedName = body.name.trim();
    if (trimmedName.length < 2) {
      return new Response(JSON.stringify({ error: "Technology name must be at least 2 characters" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    if ("https://lujriqenfmzocgwbxsyg.supabase.co") {
      const existingTechnologies = await technologyApi.getAll();
      const existingTechnology2 = existingTechnologies.find(
        (tech) => tech.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (existingTechnology2) {
        return new Response(JSON.stringify({ error: "Technology already exists" }), {
          status: 409,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
      const newTechnology2 = await technologyApi.create({
        name: trimmedName,
        count: 1,
        category: body.category || "required"
      });
      if (newTechnology2) {
        return new Response(JSON.stringify(newTechnology2), {
          status: 201,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }
    const existingTechnology = fallbackTechnologies.find(
      (tech) => tech.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (existingTechnology) {
      return new Response(JSON.stringify({ error: "Technology already exists" }), {
        status: 409,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    const newTechnology = {
      id: crypto.randomUUID(),
      name: trimmedName,
      count: 1,
      category: body.category || "required",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    fallbackTechnologies.push(newTechnology);
    return new Response(JSON.stringify(newTechnology), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error creating technology:", error);
    return new Response(JSON.stringify({ error: "Failed to create technology" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
