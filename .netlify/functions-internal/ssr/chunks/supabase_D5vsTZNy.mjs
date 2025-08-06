import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lujriqenfmzocgwbxsyg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1anJpcWVuZm16b2Nnd2J4c3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NzA4NTgsImV4cCI6MjA3MDA0Njg1OH0.Vo3UzsUaxyI1fYUE7BJsf0Db-33W0sySK9EekK5iKPk";
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
const technologyApi = {
  async getAll() {
    try {
      const { data, error } = await supabase.from("technologies").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching technologies:", error);
        return [];
      }
      return data?.map((tech) => ({
        ...tech,
        createdAt: new Date(tech.created_at),
        updatedAt: new Date(tech.updated_at)
      })) || [];
    } catch (error) {
      console.error("Error in getAll:", error);
      return [];
    }
  },
  async create(technology) {
    try {
      const { data, error } = await supabase.from("technologies").insert({
        name: technology.name,
        count: technology.count,
        category: technology.category
      }).select().single();
      if (error) {
        console.error("Error creating technology:", error);
        return null;
      }
      return data ? {
        ...data,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      } : null;
    } catch (error) {
      console.error("Error in create:", error);
      return null;
    }
  },
  async update(id, updates) {
    try {
      const { data, error } = await supabase.from("technologies").update({
        count: updates.count,
        category: updates.category,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", id).select().single();
      if (error) {
        console.error("Error updating technology:", error);
        return null;
      }
      return data ? {
        ...data,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at)
      } : null;
    } catch (error) {
      console.error("Error in update:", error);
      return null;
    }
  },
  async delete(id) {
    try {
      const { error } = await supabase.from("technologies").delete().eq("id", id);
      if (error) {
        console.error("Error deleting technology:", error);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error in delete:", error);
      return false;
    }
  },
  async sync(technologies) {
    try {
      const { error: deleteError } = await supabase.from("technologies").delete().neq("id", "");
      if (deleteError) {
        console.error("Error clearing technologies:", deleteError);
        return false;
      }
      const technologiesToInsert = technologies.map((tech) => ({
        id: tech.id,
        name: tech.name,
        count: tech.count,
        category: tech.category,
        created_at: tech.createdAt.toISOString(),
        updated_at: tech.updatedAt.toISOString()
      }));
      const { error: insertError } = await supabase.from("technologies").insert(technologiesToInsert);
      if (insertError) {
        console.error("Error syncing technologies:", insertError);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error in sync:", error);
      return false;
    }
  }
};

export { technologyApi as t };
