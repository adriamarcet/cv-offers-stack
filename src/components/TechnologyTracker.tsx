import React, { useState, useEffect, useCallback } from 'react';
import type { Technology, TechnologyFormData } from '../types/Technology';
import { TechnologyList } from './TechnologyList';
import { AddTechnologyForm } from './AddTechnologyForm';
import { getTechnologiesFromStorage, addTechnologyToStorage, updateTechnologyInStorage, removeTechnologyFromStorage, saveTechnologiesToStorage } from '../utils/storage';
import { apiClient } from '../utils/api';

export const TechnologyTracker: React.FC = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Load technologies from session storage on mount
  useEffect(() => {
    const storedTechnologies = getTechnologiesFromStorage();
    setTechnologies(storedTechnologies);
  }, []);

  // Sync with database periodically
  useEffect(() => {
    const syncWithDatabase = async () => {
      if (technologies.length === 0) return;
      
      setSyncStatus('syncing');
      try {
        const success = await apiClient.syncTechnologies(technologies);
        setSyncStatus(success ? 'success' : 'error');
      } catch (error) {
        console.error('Sync failed:', error);
        setSyncStatus('error');
      }
    };

    const interval = setInterval(syncWithDatabase, 30000); // Sync every 30 seconds
    return () => clearInterval(interval);
  }, [technologies]);

  const handleAddTechnology = useCallback(async (data: TechnologyFormData) => {
    setIsLoading(true);
    
    try {
      // Create new technology object with initial count of 1
      const newTechnology: Technology = {
        id: crypto.randomUUID(),
        name: data.name,
        count: 1, // Start with 1 since finding a technology is the first occurrence
        category: data.category,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Add to session storage immediately
      const updatedTechnologies = addTechnologyToStorage(newTechnology);
      setTechnologies(updatedTechnologies);

      // Try to sync with database
      const savedTechnology = await apiClient.createTechnology(data);
      if (savedTechnology) {
        // Update with server-generated ID if available
        const finalTechnologies = updatedTechnologies.map(tech => 
          tech.id === newTechnology.id ? { ...tech, id: savedTechnology.id } : tech
        );
        setTechnologies(finalTechnologies);
        saveTechnologiesToStorage(finalTechnologies);
      }
    } catch (error) {
      console.error('Error adding technology:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleIncrement = useCallback(async (id: string) => {
    const technology = technologies.find(tech => tech.id === id);
    if (!technology) return;

    const newCount = technology.count + 1;
    
    // Update session storage immediately
    const updatedTechnologies = updateTechnologyInStorage(id, newCount);
    setTechnologies(updatedTechnologies);

    // Try to sync with database
    try {
      await apiClient.updateTechnology({ id, count: newCount });
    } catch (error) {
      console.error('Error updating technology:', error);
    }
  }, [technologies]);

  const handleDecrement = useCallback(async (id: string) => {
    const technology = technologies.find(tech => tech.id === id);
    if (!technology || technology.count <= 0) return;

    const newCount = technology.count - 1;
    
    // Update session storage immediately
    const updatedTechnologies = updateTechnologyInStorage(id, newCount);
    setTechnologies(updatedTechnologies);

    // Try to sync with database
    try {
      await apiClient.updateTechnology({ id, count: newCount });
    } catch (error) {
      console.error('Error updating technology:', error);
    }
  }, [technologies]);

  const handleDelete = useCallback(async (id: string) => {
    // Remove from session storage immediately
    const updatedTechnologies = removeTechnologyFromStorage(id);
    setTechnologies(updatedTechnologies);

    // Try to sync with database
    try {
      await apiClient.deleteTechnology(id);
    } catch (error) {
      console.error('Error deleting technology:', error);
    }
  }, []);

  return (
    <div className="technology-tracker">
      <header className="app-header">
        <h1 className="app-title">Job Search Technology Tracker</h1>
        <p className="app-description">
          Track technologies from job postings and monitor their frequency
        </p>
        
        {syncStatus !== 'idle' && (
          <div className={`sync-status sync-${syncStatus}`} role="status" aria-live="polite">
            {syncStatus === 'syncing' && 'Syncing with database...'}
            {syncStatus === 'success' && 'Data synced successfully'}
            {syncStatus === 'error' && 'Sync failed - data saved locally'}
          </div>
        )}
      </header>

      <main className="app-main">
        <AddTechnologyForm 
          onAddTechnology={handleAddTechnology}
          isLoading={isLoading}
        />
        
        <TechnologyList
          technologies={technologies}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}; 