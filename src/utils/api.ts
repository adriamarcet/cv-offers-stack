import type { Technology, TechnologyFormData, TechnologyUpdateData } from '../types/Technology';

const API_BASE_URL = '/api/technologies';

export const apiClient = {
  async getTechnologies(): Promise<Technology[]> {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch technologies');
      return await response.json();
    } catch (error) {
      console.error('Error fetching technologies:', error);
      return [];
    }
  },

  async createTechnology(data: TechnologyFormData): Promise<Technology | null> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to create technology');
      return await response.json();
    } catch (error) {
      console.error('Error creating technology:', error);
      return null;
    }
  },

  async updateTechnology(data: TechnologyUpdateData): Promise<Technology | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: data.count }),
      });
      
      if (!response.ok) throw new Error('Failed to update technology');
      return await response.json();
    } catch (error) {
      console.error('Error updating technology:', error);
      return null;
    }
  },

  async deleteTechnology(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete technology');
      return true;
    } catch (error) {
      console.error('Error deleting technology:', error);
      return false;
    }
  },

  async syncTechnologies(technologies: Technology[]): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ technologies }),
      });
      
      if (!response.ok) throw new Error('Failed to sync technologies');
      return true;
    } catch (error) {
      console.error('Error syncing technologies:', error);
      return false;
    }
  }
}; 