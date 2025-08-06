import type { APIRoute } from 'astro';
import type { Technology } from '../../../types/Technology';
import { technologyApi } from '../../../utils/supabase';

// Fallback in-memory storage for demo purposes
let fallbackTechnologies: Technology[] = [];

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as { technologies: Technology[] };
    
    if (!Array.isArray(body.technologies)) {
      return new Response(JSON.stringify({ error: 'Technologies must be an array' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Validate each technology
    for (const tech of body.technologies) {
      if (!tech.id || !tech.name || typeof tech.count !== 'number' || tech.count < 0) {
        return new Response(JSON.stringify({ error: 'Invalid technology data' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // Try to sync with Supabase first
    if (import.meta.env.PUBLIC_SUPABASE_URL) {
      const success = await technologyApi.sync(body.technologies);
      
      if (success) {
        return new Response(JSON.stringify({ 
          success: true, 
          synced: body.technologies.length,
          total: body.technologies.length 
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // Fallback to in-memory storage
    const existingIds = new Set(fallbackTechnologies.map(tech => tech.id));
    const newTechnologies = body.technologies.filter(tech => !existingIds.has(tech.id));
    
    // Update existing technologies
    const updatedTechnologies = fallbackTechnologies.map(existingTech => {
      const incomingTech = body.technologies.find(tech => tech.id === existingTech.id);
      if (incomingTech) {
        return {
          ...existingTech,
          count: incomingTech.count,
          updatedAt: new Date(),
        };
      }
      return existingTech;
    });

    // Add new technologies
    fallbackTechnologies = [...updatedTechnologies, ...newTechnologies];

    return new Response(JSON.stringify({ 
      success: true, 
      synced: body.technologies.length,
      total: fallbackTechnologies.length 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error syncing technologies:', error);
    return new Response(JSON.stringify({ error: 'Failed to sync technologies' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 