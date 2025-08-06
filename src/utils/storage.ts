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
  
  // Check if a technology with the same name already exists
  const existingTechnology = technologies.find(tech => 
    tech.name.toLowerCase() === technology.name.toLowerCase()
  );
  
  if (existingTechnology) {
    // If technology exists, increment its count instead of creating a new instance
    const updatedTechnologies = technologies.map(tech => 
      tech.id === existingTechnology.id 
        ? { ...tech, count: tech.count + 1, updatedAt: new Date() }
        : tech
    );
    saveTechnologiesToStorage(updatedTechnologies);
    return updatedTechnologies;
  } else {
    // If technology doesn't exist, add it as a new instance
    const updatedTechnologies = [...technologies, technology];
    saveTechnologiesToStorage(updatedTechnologies);
    return updatedTechnologies;
  }
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

export const consolidateDuplicateTechnologies = (): Technology[] => {
  const technologies = getTechnologiesFromStorage();
  const consolidatedMap = new Map<string, Technology>();
  
  technologies.forEach(tech => {
    const normalizedName = tech.name.toLowerCase();
    
    if (consolidatedMap.has(normalizedName)) {
      // Technology exists, increment count
      const existing = consolidatedMap.get(normalizedName)!;
      existing.count += tech.count;
      existing.updatedAt = new Date();
    } else {
      // New technology
      consolidatedMap.set(normalizedName, { ...tech });
    }
  });
  
  const consolidatedTechnologies = Array.from(consolidatedMap.values());
  saveTechnologiesToStorage(consolidatedTechnologies);
  return consolidatedTechnologies;
}; 