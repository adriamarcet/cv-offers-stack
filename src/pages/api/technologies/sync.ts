import type { APIRoute } from 'astro';
import type { Technology } from '../../../types/Technology';

// In-memory storage for demo purposes
// In production, this would be replaced with a real database
let technologies: Technology[] = [];

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

    // Merge with existing technologies
    const existingIds = new Set(technologies.map(tech => tech.id));
    const newTechnologies = body.technologies.filter(tech => !existingIds.has(tech.id));
    
    // Update existing technologies
    const updatedTechnologies = technologies.map(existingTech => {
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
    technologies = [...updatedTechnologies, ...newTechnologies];

    return new Response(JSON.stringify({ 
      success: true, 
      synced: body.technologies.length,
      total: technologies.length 
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