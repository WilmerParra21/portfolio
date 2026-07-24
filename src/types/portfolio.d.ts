export interface Project {
  id: string | number;
  title: string;
  description_es?: string;
  description_en?: string;
  tech_stack: string[];
  repo_url?: string;
  live_demo?: string;
}

export interface Technology {
  id: string | number;
  name: string;
  category?: string;
}

export type TechnologyCategory = string;

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export { };

