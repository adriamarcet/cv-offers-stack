import React, { useState, useEffect, useCallback } from 'react';
import type { Technology, TechnologyFormData } from '../types/Technology';
import { TechnologyList } from './TechnologyList';
import { AddTechnologyForm } from './AddTechnologyForm';
import { NotificationBar, type NotificationType } from './NotificationBar';
import { getTechnologiesFromStorage, addTechnologyToStorage, updateTechnologyInStorage, removeTechnologyFromStorage, saveTechnologiesToStorage, consolidateDuplicateTechnologies } from '../utils/storage';
import { apiClient } from '../utils/api';

export const TechnologyTracker: React.FC = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
    isVisible: boolean;
  }>({
    type: 'info',
    message: '',
    isVisible: false
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load technologies from database first, then session storage as fallback
  useEffect(() => {
    const loadTechnologies = async () => {
      setIsLoading(true);
      try {
        // Try to load from database first
        const dbTechnologies = await apiClient.getTechnologies();
        
        if (dbTechnologies.length > 0) {
          // Database has data, use it
          setTechnologies(dbTechnologies);
          saveTechnologiesToStorage(dbTechnologies);
          console.log('Loaded technologies from database:', dbTechnologies.length);
        } else {
          // No database data, try session storage
          const storedTechnologies = getTechnologiesFromStorage();
          // Consolidate any duplicate technologies that might exist
          const consolidatedTechnologies = consolidateDuplicateTechnologies();
          setTechnologies(consolidatedTechnologies);
          console.log('Loaded and consolidated technologies from session storage:', consolidatedTechnologies.length);
        }
      } catch (error) {
        console.error('Error loading technologies:', error);
        // Fallback to session storage
        const storedTechnologies = getTechnologiesFromStorage();
        // Consolidate any duplicate technologies that might exist
        const consolidatedTechnologies = consolidateDuplicateTechnologies();
        setTechnologies(consolidatedTechnologies);
        console.log('Fallback to session storage (consolidated):', consolidatedTechnologies.length);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    loadTechnologies();
  }, []);

  // Sync with database periodically
  useEffect(() => {
    const syncWithDatabase = async () => {
      if (technologies.length === 0) return;
      
      setSyncStatus('syncing');
      try {
        const success = await apiClient.syncTechnologies(technologies);
        if (success) {
          setSyncStatus('success');
          setNotification({
            type: 'success',
            message: 'Data synced successfully',
            isVisible: true
          });
        } else {
          setSyncStatus('error');
          setNotification({
            type: 'error',
            message: 'Sync failed - data saved locally',
            isVisible: true
          });
        }
      } catch (error) {
        console.error('Sync failed:', error);
        setSyncStatus('error');
        setNotification({
          type: 'error',
          message: 'Sync failed - data saved locally',
          isVisible: true
        });
      }
    };

    const interval = setInterval(syncWithDatabase, 30000); // Sync every 30 seconds
    return () => clearInterval(interval);
  }, [technologies]);

  const handleAddTechnology = useCallback(async (data: TechnologyFormData) => {
    setIsLoading(true);
    
    try {
      // Check if technology already exists
      const existingTechnology = technologies.find(tech => 
        tech.name.toLowerCase() === data.name.toLowerCase()
      );

      if (existingTechnology) {
        // Technology exists, increment its count
        const newCount = existingTechnology.count + 1;
        const updatedTechnologies = updateTechnologyInStorage(existingTechnology.id, newCount);
        setTechnologies(updatedTechnologies);

        // Try to sync with database
        try {
          await apiClient.updateTechnology({ id: existingTechnology.id, count: newCount });
          setNotification({
            type: 'success',
            message: `"${data.name}" incremented to ${newCount}`,
            isVisible: true
          });
        } catch (error) {
          console.error('Error updating technology:', error);
          setNotification({
            type: 'warning',
            message: 'Update failed - changes saved locally',
            isVisible: true
          });
        }
      } else {
        // Technology doesn't exist, create new instance
        const newTechnology: Technology = {
          id: crypto.randomUUID(),
          name: data.name,
          count: 1,
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
        
        // Show success notification
        setNotification({
          type: 'success',
          message: `"${data.name}" added successfully`,
          isVisible: true
        });
      }
    } catch (error) {
      console.error('Error adding technology:', error);
      // Show error notification
      setNotification({
        type: 'error',
        message: 'Failed to add technology - saved locally',
        isVisible: true
      });
    } finally {
      setIsLoading(false);
    }
  }, [technologies]);

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
      // Show success notification
      setNotification({
        type: 'success',
        message: `"${technology.name}" incremented to ${newCount}`,
        isVisible: true
      });
    } catch (error) {
      console.error('Error updating technology:', error);
      // Show warning notification
      setNotification({
        type: 'warning',
        message: 'Update failed - changes saved locally',
        isVisible: true
      });
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
      // Show success notification
      setNotification({
        type: 'success',
        message: `"${technology.name}" decremented to ${newCount}`,
        isVisible: true
      });
    } catch (error) {
      console.error('Error updating technology:', error);
      // Show warning notification
      setNotification({
        type: 'warning',
        message: 'Update failed - changes saved locally',
        isVisible: true
      });
    }
  }, [technologies]);

  const handleDelete = useCallback(async (id: string) => {
    const technology = technologies.find(tech => tech.id === id);
    if (!technology) return;

    // Remove from session storage immediately
    const updatedTechnologies = removeTechnologyFromStorage(id);
    setTechnologies(updatedTechnologies);

    // Try to sync with database
    try {
      await apiClient.deleteTechnology(id);
      // Show success notification
      setNotification({
        type: 'success',
        message: `"${technology.name}" deleted successfully`,
        isVisible: true
      });
    } catch (error) {
      console.error('Error deleting technology:', error);
      // Show warning notification
      setNotification({
        type: 'warning',
        message: 'Delete failed - removed locally',
        isVisible: true
      });
    }
  }, [technologies]);

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  // Auto-hide notification after delay
  useEffect(() => {
    if (notification.isVisible) {
      const timer = setTimeout(() => {
        setNotification(prev => ({ ...prev, isVisible: false }));
      }, notification.type === 'success' ? 3000 : 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification.isVisible, notification.type]);

  return (
    <div className="technology-tracker">
      <NotificationBar
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={handleCloseNotification}
      />
      
      <header className="app-header">
        <h1 className="app-title">Job Search Technology Tracker</h1>
        <p className="app-description">
          Track technologies from job postings and monitor their frequency
        </p>
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
          isInitialLoad={isInitialLoad}
        />
      </main>
    </div>
  );
}; 