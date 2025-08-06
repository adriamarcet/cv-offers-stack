export interface Technology {
  id: string;
  name: string;
  count: number;
  category: 'required' | 'desirable';
  createdAt: Date;
  updatedAt: Date;
}

export interface TechnologyFormData {
  name: string;
  category: 'required' | 'desirable';
}

export interface TechnologyUpdateData {
  id: string;
  count: number;
} 