export interface NavItem {
  label: string;
  href: string;
  isNew?: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  fullDetails: string;
  iconName: string;
  status: 'Development' | 'Alpha' | 'Beta' | 'Active';
}

export interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  points: string[];
}

export interface SystemUpdate {
  id: string;
  title: string;
  date: string;
  category: 'system' | 'quantum' | 'features';
  description: string;
}
