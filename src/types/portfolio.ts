export interface Project {
  id: string | number;
  title: string;
  category?: string;
  description_es?: string;
  description_en?: string;
  tech_stack: string[];
  repo_url?: string;
  live_demo?: string;
  image_url?: string;
}

export interface Technology {
  id: string | number;
  name: string;
  category?: string;
  icon_url?: string;
  description?: string | null;
  is_tool?: boolean;
  model_url?: string;
  emissive_color?: string;
  rotation_speed?: number;
  is_3d_model?: boolean;
}

export type TechnologyCategory = string;

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
  service_type?: string;
}
