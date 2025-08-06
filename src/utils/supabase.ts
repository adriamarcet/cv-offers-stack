import { createClient } from '@supabase/supabase-js';
import type { Technology } from '../types/Technology';

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      technologies: {
        Row: Technology;
        Insert: Omit<Technology, 'id' | 'createdAt' | 'updatedAt'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Technology, 'id' | 'createdAt' | 'updatedAt'>> & {
          updated_at?: string;
        };
      };
    };
  };
}

// Create Supabase client
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using fallback storage.');
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Helper functions for technology operations
export const technologyApi = {
  async getAll(): Promise<Technology[]> {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching technologies:', error);
        return [];
      }

      return data?.map(tech => ({
        ...tech,
        createdAt: new Date(tech.created_at),
        updatedAt: new Date(tech.updated_at)
      })) || [];
    } catch (error) {
      console.error('Error in getAll:', error);
      return [];
    }
  },

  async create(technology: Omit<Technology, 'id' | 'createdAt' | 'updatedAt'>): Promise<Technology | null> {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .insert({
          name: technology.name,
          count: technology.count,
          category: technology.category
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating technology:', error);
        return null;
      }

      return data ? {
        ...data,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      } : null;
    } catch (error) {
      console.error('Error in create:', error);
      return null;
    }
  },

  async update(id: string, updates: Partial<Technology>): Promise<Technology | null> {
    try {
      const { data, error } = await supabase
        .from('technologies')
        .update({
          count: updates.count,
          category: updates.category,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating technology:', error);
        return null;
      }

      return data ? {
        ...data,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      } : null;
    } catch (error) {
      console.error('Error in update:', error);
      return null;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('technologies')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting technology:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in delete:', error);
      return false;
    }
  },

  async sync(technologies: Technology[]): Promise<boolean> {
    try {
      // Delete all existing technologies
      const { error: deleteError } = await supabase
        .from('technologies')
        .delete()
        .neq('id', ''); // Delete all records

      if (deleteError) {
        console.error('Error clearing technologies:', deleteError);
        return false;
      }

      // Insert all technologies
      const technologiesToInsert = technologies.map(tech => ({
        id: tech.id,
        name: tech.name,
        count: tech.count,
        category: tech.category,
        created_at: tech.createdAt.toISOString(),
        updated_at: tech.updatedAt.toISOString()
      }));

      const { error: insertError } = await supabase
        .from('technologies')
        .insert(technologiesToInsert);

      if (insertError) {
        console.error('Error syncing technologies:', insertError);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in sync:', error);
      return false;
    }
  }
}; 