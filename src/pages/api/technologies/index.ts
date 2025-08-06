import type { APIRoute } from 'astro';
import type { Technology, TechnologyFormData } from '../../../types/Technology';
import { technologyApi } from '../../../utils/supabase';

// Fallback in-memory storage for demo purposes
// This will be used if Supabase is not configured
let fallbackTechnologies: Technology[] = [];

export const GET: APIRoute = async () => {
  try {
    // Try to get data from Supabase first
    const technologies = await technologyApi.getAll();
    
    if (technologies.length > 0 || import.meta.env.PUBLIC_SUPABASE_URL) {
      // Use Supabase data or return empty array if Supabase is configured
      return new Response(JSON.stringify(technologies), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
    } else {
      // Fallback to in-memory storage
      return new Response(JSON.stringify(fallbackTechnologies), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
    }
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

    // Try to create in Supabase first
    if (import.meta.env.PUBLIC_SUPABASE_URL) {
      // Check if technology already exists in Supabase
      const existingTechnologies = await technologyApi.getAll();
      const existingTechnology = existingTechnologies.find(
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

      const newTechnology = await technologyApi.create({
        name: trimmedName,
        count: 1,
        category: body.category || 'required',
      });

      if (newTechnology) {
        return new Response(JSON.stringify(newTechnology), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    }

    // Fallback to in-memory storage
    const existingTechnology = fallbackTechnologies.find(
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
      count: 1,
      category: body.category || 'required',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    fallbackTechnologies.push(newTechnology);

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