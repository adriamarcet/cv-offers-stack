import { t as technologyApi } from '../../../chunks/supabase_D5vsTZNy.mjs';
export { renderers } from '../../../renderers.mjs';

let fallbackTechnologies = [];
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    if (!Array.isArray(body.technologies)) {
      return new Response(JSON.stringify({ error: "Technologies must be an array" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
    for (const tech of body.technologies) {
      if (!tech.id || !tech.name || typeof tech.count !== "number" || tech.count < 0) {
        return new Response(JSON.stringify({ error: "Invalid technology data" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }
    if ("https://lujriqenfmzocgwbxsyg.supabase.co") {
      const success = await technologyApi.sync(body.technologies);
      if (success) {
        return new Response(JSON.stringify({
          success: true,
          synced: body.technologies.length,
          total: body.technologies.length
        }), {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }
    }
    const existingIds = new Set(fallbackTechnologies.map((tech) => tech.id));
    const newTechnologies = body.technologies.filter((tech) => !existingIds.has(tech.id));
    const updatedTechnologies = fallbackTechnologies.map((existingTech) => {
      const incomingTech = body.technologies.find((tech) => tech.id === existingTech.id);
      if (incomingTech) {
        return {
          ...existingTech,
          count: incomingTech.count,
          updatedAt: /* @__PURE__ */ new Date()
        };
      }
      return existingTech;
    });
    fallbackTechnologies = [...updatedTechnologies, ...newTechnologies];
    return new Response(JSON.stringify({
      success: true,
      synced: body.technologies.length,
      total: fallbackTechnologies.length
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error syncing technologies:", error);
    return new Response(JSON.stringify({ error: "Failed to sync technologies" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
