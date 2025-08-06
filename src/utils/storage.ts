import type { Technology } from '../types/Technology';

const STORAGE_KEY = 'cv-offers-technologies';

export const getTechnologiesFromStorage = (): Technology[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const technologies = JSON.parse(stored);
    return technologies.map((tech: any) => ({
      ...tech,
      createdAt: new Date(tech.createdAt),
      updatedAt: new Date(tech.updatedAt)
    }));
  } catch (error) {
    console.error('Error reading from session storage:', error);
    return [];
  }
};

export const saveTechnologiesToStorage = (technologies: Technology[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(technologies));
  } catch (error) {
    console.error('Error saving to session storage:', error);
  }
};

export const addTechnologyToStorage = (technology: Technology): Technology[] => {
  const technologies = getTechnologiesFromStorage();
  const updatedTechnologies = [...technologies, technology];
  saveTechnologiesToStorage(updatedTechnologies);
  return updatedTechnologies;
};

export const updateTechnologyInStorage = (id: string, count: number): Technology[] => {
  const technologies = getTechnologiesFromStorage();
  const updatedTechnologies = technologies.map(tech => 
    tech.id === id 
      ? { ...tech, count, updatedAt: new Date() }
      : tech
  );
  saveTechnologiesToStorage(updatedTechnologies);
  return updatedTechnologies;
};

export const removeTechnologyFromStorage = (id: string): Technology[] => {
  const technologies = getTechnologiesFromStorage();
  const updatedTechnologies = technologies.filter(tech => tech.id !== id);
  saveTechnologiesToStorage(updatedTechnologies);
  return updatedTechnologies;
}; 