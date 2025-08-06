import type { APIRoute } from 'astro';
import type { Technology, TechnologyFormData } from '../../../types/Technology';

// In-memory storage for demo purposes
// In production, this would be replaced with a real database
let technologies: Technology[] = [];

export const GET: APIRoute = async () => {
  try {
    return new Response(JSON.stringify(technologies), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch technologies' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as TechnologyFormData;
    
    if (!body.name || typeof body.name !== 'string') {
      return new Response(JSON.stringify({ error: 'Technology name is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const trimmedName = body.name.trim();
    if (trimmedName.length < 2) {
      return new Response(JSON.stringify({ error: 'Technology name must be at least 2 characters' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Check if technology already exists
    const existingTechnology = technologies.find(
      tech => tech.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingTechnology) {
      return new Response(JSON.stringify({ error: 'Technology already exists' }), {
        status: 409,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const newTechnology: Technology = {
      id: crypto.randomUUID(),
      name: trimmedName,
      count: 1, // Start with 1 since finding a technology is the first occurrence
      category: body.category || 'required', // Default to required if not specified
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    technologies.push(newTechnology);

    return new Response(JSON.stringify(newTechnology), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating technology:', error);
    return new Response(JSON.stringify({ error: 'Failed to create technology' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 