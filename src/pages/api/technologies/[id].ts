import type { APIRoute } from 'astro';
import type { Technology } from '../../../types/Technology';

// In-memory storage for demo purposes
// In production, this would be replaced with a real database
let technologies: Technology[] = [];

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

    const body = await request.json() as { count: number };
    
    if (typeof body.count !== 'number' || body.count < 0) {
      return new Response(JSON.stringify({ error: 'Count must be a non-negative number' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const technologyIndex = technologies.findIndex(tech => tech.id === id);
    
    if (technologyIndex === -1) {
      return new Response(JSON.stringify({ error: 'Technology not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const updatedTechnology: Technology = {
      ...technologies[technologyIndex],
      count: body.count,
      updatedAt: new Date(),
    };

    technologies[technologyIndex] = updatedTechnology;

    return new Response(JSON.stringify(updatedTechnology), {
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

    const technologyIndex = technologies.findIndex(tech => tech.id === id);
    
    if (technologyIndex === -1) {
      return new Response(JSON.stringify({ error: 'Technology not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    technologies.splice(technologyIndex, 1);

    return new Response(null, {
      status: 204,
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