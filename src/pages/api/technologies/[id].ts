import type { APIRoute } from 'astro';
import type { Technology, TechnologyUpdateData } from '../../../types/Technology';
import { technologyApi } from '../../../utils/supabase';

// Fallback in-memory storage for demo purposes
let fallbackTechnologies: Technology[] = [];

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'Technology ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const body = await request.json() as TechnologyUpdateData;
    
    if (typeof body.count !== 'number' || body.count < 0) {
      return new Response(JSON.stringify({ error: 'Count must be a non-negative number' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Try to update in Supabase first
    if (import.meta.env.PUBLIC_SUPABASE_URL) {
      const updatedTechnology = await technologyApi.update(id, { count: body.count });
      
      if (updatedTechnology) {
        return new Response(JSON.stringify(updatedTechnology), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // Fallback to in-memory storage
    const technologyIndex = fallbackTechnologies.findIndex(tech => tech.id === id);
    
    if (technologyIndex === -1) {
      return new Response(JSON.stringify({ error: 'Technology not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const existingTech = fallbackTechnologies[technologyIndex];
    if (!existingTech) {
      return new Response(JSON.stringify({ error: 'Technology not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    fallbackTechnologies[technologyIndex] = {
      id: existingTech.id,
      name: existingTech.name,
      category: existingTech.category,
      count: body.count,
      createdAt: existingTech.createdAt,
      updatedAt: new Date(),
    };

    return new Response(JSON.stringify(fallbackTechnologies[technologyIndex]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating technology:', error);
    return new Response(JSON.stringify({ error: 'Failed to update technology' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'Technology ID is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Try to delete from Supabase first
    if (import.meta.env.PUBLIC_SUPABASE_URL) {
      const success = await technologyApi.delete(id);
      
      if (success) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // Fallback to in-memory storage
    const technologyIndex = fallbackTechnologies.findIndex(tech => tech.id === id);
    
    if (technologyIndex === -1) {
      return new Response(JSON.stringify({ error: 'Technology not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    fallbackTechnologies.splice(technologyIndex, 1);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting technology:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete technology' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 