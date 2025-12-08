import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  specs: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}