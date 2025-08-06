import React from 'react';
import type { Technology } from '../types/Technology';

interface TechnologyItemProps {
  technology: Technology;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TechnologyItem: React.FC<TechnologyItemProps> = ({
  technology,
  onIncrement,
  onDecrement,
  onDelete
}) => {
  const handleIncrement = () => {
    onIncrement(technology.id);
  };

  const handleDecrement = () => {
    if (technology.count > 0) {
      onDecrement(technology.id);
    }
  };

  const handleDelete = () => {
    onDelete(technology.id);
  };

  return (
    <div className={`technology-item technology-${technology.category}`} role="listitem">
      <div className="technology-content">
            <div className="technology-header">
               <h3 className="technology-name" id={`tech-${technology.id}`}>
                 {technology.name} ({technology.count})
               </h3>
             </div>
             <div className="technology-controls">
        <button
          type="button"
          className="btn btn-action btn-increment"
          onClick={handleIncrement}
          aria-label={`Add 1 to ${technology.name} count`}
          aria-describedby={`tech-${technology.id}`}
        >
          Add 1
        </button>
        
        <button
          type="button"
          className="btn btn-action btn-decrement"
          onClick={handleDecrement}
          disabled={technology.count <= 1}
          aria-label={`Decrease 1 from ${technology.name} count`}
          aria-describedby={`tech-${technology.id}`}
        >
          Decrease 1
        </button>
        
        <button
          type="button"
          className="btn btn-action btn-delete"
          onClick={handleDelete}
          aria-label={`Remove ${technology.name}`}
          aria-describedby={`tech-${technology.id}`}
        >
          Remove
        </button>
      </div>
      </div>
    </div>
  );
}; 