import React, { useState } from 'react';
import type { TechnologyFormData } from '../types/Technology';

interface AddTechnologyFormProps {
  onAddTechnology: (data: TechnologyFormData) => void;
  isLoading?: boolean;
}

export const AddTechnologyForm: React.FC<AddTechnologyFormProps> = ({
  onAddTechnology,
  isLoading = false
}) => {
  const [technologyName, setTechnologyName] = useState('');
  const [category, setCategory] = useState<'required' | 'desirable'>('required');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedName = technologyName.trim();
    
    if (!trimmedName) {
      setError('Please enter a technology name');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('Technology name must be at least 2 characters long');
      return;
    }
    
    if (trimmedName.length > 50) {
      setError('Technology name must be less than 50 characters');
      return;
    }
    
    setError('');
    onAddTechnology({ name: trimmedName, category });
    setTechnologyName('');
    setCategory('required'); // Reset to required for next entry
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechnologyName(e.target.value);
    if (error) setError('');
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value as 'required' | 'desirable');
  };



  return (
    <form 
      className="add-technology-form" 
      onSubmit={handleSubmit}
      aria-labelledby="form-title"
    >
      <h2 id="form-title" className="form-title">Add New Technology</h2>
      
      <div className="form-group">
        <label htmlFor="technology-name" className="form-label">
          Technology Name
        </label>
        <input
          type="text"
          id="technology-name"
          name="technologyName"
          value={technologyName}
          onChange={handleInputChange}
          className={`form-input ${error ? 'error' : ''}`}
          placeholder="e.g., React, TypeScript, Node.js"
          aria-describedby={error ? 'error-message' : undefined}
          aria-invalid={error ? 'true' : 'false'}
          disabled={isLoading}
          required
        />
        {error && (
          <div id="error-message" className="error-message" role="alert">
            {error}
          </div>
        )}
      </div>

      <div className="form-group">
        <fieldset className="category-fieldset">
          <legend className="form-label" id="category-legend">Category</legend>
          <div className="category-options" role="radiogroup" aria-labelledby="category-legend">
            <label className="category-option" id="required-option">
              <input
                type="radio"
                name="category"
                value="required"
                checked={category === 'required'}
                onChange={handleCategoryChange}
                disabled={isLoading}
                aria-describedby="required-option"
              />
              <span className="radio-custom required-radio" aria-hidden="true"></span>
              <span className="category-label">Required</span>
            </label>
            
            <label className="category-option" id="desirable-option">
              <input
                type="radio"
                name="category"
                value="desirable"
                checked={category === 'desirable'}
                onChange={handleCategoryChange}
                disabled={isLoading}
                aria-describedby="desirable-option"
              />
              <span className="radio-custom desirable-radio" aria-hidden="true"></span>
              <span className="category-label">Desirable</span>
            </label>
          </div>
        </fieldset>
      </div>
      
      <button
        type="submit"
        className="btn btn-primary"
        disabled={isLoading || !technologyName.trim()}
        aria-describedby="submit-help"
        style={{ width: '100%' }}
      >
        {isLoading ? 'Adding...' : 'Add Technology'}
      </button>
      
      <div id="submit-help" className="help-text">
        Tab: Input → Required → Desirable → Add Technology. Press Enter or click to add (starts with count 1)
      </div>
    </form>
  );
}; 