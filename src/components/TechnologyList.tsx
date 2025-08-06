import React from 'react';
import type { Technology } from '../types/Technology';
import { TechnologyItem } from './TechnologyItem';

interface TechnologyListProps {
  technologies: Technology[];
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  isInitialLoad?: boolean;
}

export const TechnologyList: React.FC<TechnologyListProps> = ({
  technologies,
  onIncrement,
  onDecrement,
  onDelete,
  isLoading = false,
  isInitialLoad = false
}) => {
  if (isLoading || isInitialLoad) {
    return (
      <div className="technology-list-loading" role="status" aria-live="polite">
        <div className="loading-spinner" aria-hidden="true"></div>
        <p>{isInitialLoad ? 'Loading from database...' : 'Loading technologies...'}</p>
      </div>
    );
  }

  if (technologies.length === 0) {
    return (
      <div className="technology-list-empty" role="status">
        <p>No technologies added yet. Add your first technology to get started!</p>
      </div>
    );
  }

  // Group technologies by category
  const requiredTechnologies = technologies
    .filter(tech => tech.category === 'required')
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

  const desirableTechnologies = technologies
    .filter(tech => tech.category === 'desirable')
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });

  const totalRequired = requiredTechnologies.reduce((sum, tech) => sum + tech.count, 0);
  const totalDesirable = desirableTechnologies.reduce((sum, tech) => sum + tech.count, 0);

  return (
    <div className="technology-list-container">
                   <h2 className="technology-list-title">
               📊 Technology Stack ({technologies.length})
             </h2>
      
      <div className="technology-categories">
        {/* Required Technologies Section */}
        <div className="technology-category required-category">
          <h3 className="category-title required-title">
            Required Skills
          </h3>
          <div 
            className="technology-list" 
            role="list"
            aria-label="List of required technologies"
          >
            {requiredTechnologies.map((technology) => (
              <TechnologyItem
                key={technology.id}
                technology={technology}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onDelete={onDelete}
              />
            ))}
          </div>
          {requiredTechnologies.length === 0 && (
            <div className="category-empty">
              <p>No required skills added yet</p>
            </div>
          )}
        </div>

        {/* Desirable Technologies Section */}
        <div className="technology-category desirable-category">
          <h3 className="category-title desirable-title">
            Desirable Skills
          </h3>
          <div 
            className="technology-list" 
            role="list"
            aria-label="List of desirable technologies"
          >
            {desirableTechnologies.map((technology) => (
              <TechnologyItem
                key={technology.id}
                technology={technology}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onDelete={onDelete}
              />
            ))}
          </div>
          {desirableTechnologies.length === 0 && (
            <div className="category-empty">
              <p>No desirable skills added yet</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="technology-list-summary" role="status" aria-live="polite">
        <p>
          Total: {technologies.length} | 
          Required: {requiredTechnologies.length} ({totalRequired}) | 
          Desirable: {desirableTechnologies.length} ({totalDesirable})
        </p>
      </div>
    </div>
  );
}; 