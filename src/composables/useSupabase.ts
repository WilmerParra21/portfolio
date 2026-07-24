import type { ContactForm, Project, Technology } from '@/types/portfolio';
import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { reactive, readonly, ref } from 'vue';

const isLoading = ref(false);
const realtimeEnabled = import.meta.env.VITE_ENABLE_REALTIME === 'true';
let realtimeChannels: RealtimeChannel[] = [];

const portfolioState = reactive({
  projects: [] as Project[],
  technologies: [] as Technology[],
  social_links: [] as SocialLink[],
  tools: [] as ToolItem[],
});

type SocialLink = {
  id: string | number;
  url: string;
  name: string;
  image_url?: string;
  status?: string;
  updated_at?: string;
};

type ToolItem = {
  id: string | number;
  name: string;
  icon_url: string;
};

let supabaseClient: SupabaseClient | null = null;

async function createSupabase(): Promise<SupabaseClient | null> {
  if (supabaseClient) return supabaseClient;

  const enabled = import.meta.env.VITE_ENABLE_SUPABASE === 'true';
  if (!enabled) return null;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const { createClient } = await import('@supabase/supabase-js');
  supabaseClient = createClient(url, key);
  return supabaseClient;
}

async function fetchFromSupabase<T>(
  table: string,
  options?: {
    orderBy?: Array<{ column: string; ascending?: boolean }>;
    limit?: number;
  }
): Promise<T[] | null> {
  const client = await createSupabase();
  if (!client) return null;

  try {
    let query = client.from(table).select('*');
    if (options?.orderBy) {
      for (const order of options.orderBy) {
        query = query.order(order.column, { ascending: order.ascending ?? true });
      }
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    const { data, error } = await query;
    if (error) throw error;
    return data as T[];
  } catch (error) {
    console.warn(`[Supabase] Failed to fetch ${table}:`, error);
    return null;
  }
}

async function subscribeToRealtime() {
  const client = await createSupabase();
  if (!client || !realtimeEnabled) return;

  try {
    const channel = client
      .channel('portfolio-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => handleRealtimePayload('projects', payload)
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'technologies' },
        (payload) => handleRealtimePayload('technologies', payload)
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'social_links' },
        (payload) => handleRealtimePayload('social_links', payload)
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tools' },
        (payload) => handleRealtimePayload('tools', payload)
      )
      .subscribe();

    realtimeChannels.push(channel);
  } catch (error) {
    console.warn('[Supabase] Realtime subscription failed:', error);
  }
}

function handleRealtimePayload<T>(
  table: 'projects' | 'technologies' | 'social_links' | 'tools',
  payload: { eventType: string; new: T; old: T }
) {
  const collection = portfolioState[table];
  const id = payload.new && (payload.new as { id?: string | number }).id;

  if (payload.eventType === 'INSERT' && id !== undefined) {
    const exists = collection.some((item) => (item as { id?: string | number }).id === id);
    if (!exists) {
      collection.push(payload.new as never);
    }
  } else if (payload.eventType === 'UPDATE' && id !== undefined) {
    const index = collection.findIndex((item) => (item as { id?: string | number }).id === id);
    if (index !== -1) {
      collection[index] = payload.new as never;
    } else {
      collection.push(payload.new as never);
    }
  } else if (payload.eventType === 'DELETE' && id !== undefined) {
    const index = collection.findIndex((item) => (item as { id?: string | number }).id === id);
    if (index !== -1) {
      collection.splice(index, 1);
    }
  }
}

function loadSampleTechnologies(): Technology[] {
  return [
    { id: 't-vue', name: 'Vue.js', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', category: 'web', description: 'Framework progresivo para interfaces de usuario', emissive_color: '#42b883', rotation_speed: 0.3, is_3d_model: false },
    { id: 't-supabase', name: 'Supabase', icon_url: 'https://supabase.com/favicon/favicon-32x32.png', category: 'web', description: 'Backend as a Service con PostgreSQL', emissive_color: '#3ecf8e', rotation_speed: 0.25, is_3d_model: false },
    { id: 't-astro', name: 'Astro', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg', category: 'web', description: 'Framework web moderno y rápido', emissive_color: '#ff5d01', rotation_speed: 0.35, is_3d_model: false },
    { id: 't-laravel', name: 'Laravel', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg', category: 'web', description: 'Framework PHP elegante', emissive_color: '#ff2d20', rotation_speed: 0.4, is_3d_model: false },
    { id: 't-php', name: 'PHP', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg', category: 'web', description: 'Lenguaje de servidor web', emissive_color: '#777bb4', rotation_speed: 0.2, is_3d_model: false },
    { id: 't-bootstrap', name: 'Bootstrap', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', category: 'web', description: 'Framework CSS responsive', emissive_color: '#7952b3', rotation_speed: 0.28, is_3d_model: false },
    { id: 't-flutter', name: 'Flutter', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', category: 'mobile', description: 'Framework multiplataforma de Google', emissive_color: '#02569b', rotation_speed: 0.32, is_3d_model: false },
    { id: 't-electron', name: 'Electron', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg', category: 'desktop', description: 'Apps de escritorio con web tech', emissive_color: '#47848f', rotation_speed: 0.22, is_3d_model: false },
    { id: 't-nodejs', name: 'Node.js', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'automation', description: 'Runtime JavaScript para backend', emissive_color: '#339933', rotation_speed: 0.26, is_3d_model: false },
    { id: 't-python', name: 'Python', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'automation', description: 'Lenguaje para automatización', emissive_color: '#3776ab', rotation_speed: 0.24, is_3d_model: false },
    { id: 't-typescript', name: 'TypeScript', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', category: 'web', description: 'JavaScript con tipos', emissive_color: '#3178c6', rotation_speed: 0.29, is_3d_model: false },
    { id: 't-mysql', name: 'MySQL', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'web', description: 'Base de datos relacional', emissive_color: '#00758f', rotation_speed: 0.21, is_3d_model: false },
    { id: 't-tailwind', name: 'Tailwind', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'web', description: 'Framework CSS utility-first', emissive_color: '#38bdf8', rotation_speed: 0.33, is_3d_model: false },
    { id: 't-javascript', name: 'JavaScript', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'web', description: 'Lenguaje de la web', emissive_color: '#f7df1e', rotation_speed: 0.27, is_3d_model: false },
    { id: 't-html5', name: 'HTML5', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'web', description: 'Estructura de la web', emissive_color: '#e34f26', rotation_speed: 0.19, is_3d_model: false },
    { id: 't-css3', name: 'CSS3', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'web', description: 'Estilos de la web', emissive_color: '#1572b6', rotation_speed: 0.23, is_3d_model: false },
    { id: 't-nuxt', name: 'Nuxt', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg', category: 'web', description: 'Framework Vue full-stack', emissive_color: '#00dc82', rotation_speed: 0.31, is_3d_model: false },
  ];
}

function loadSampleSocialLinks(): SocialLink[] {
  return [
    { id: 's-linkedin', name: 'LinkedIn', url: 'https://linkedin.com', image_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg', status: 'active' },
    { id: 's-github', name: 'GitHub', url: 'https://github.com', image_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', status: 'active' },
    { id: 's-instagram', name: 'Instagram', url: 'https://instagram.com', image_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png', status: 'active' },
  ];
}

function loadSampleTools(): ToolItem[] {
  return [
    { id: 'tool-git', name: 'Git', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { id: 'tool-docker', name: 'Docker', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { id: 'tool-figma', name: 'Figma', icon_url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  ];
}

function loadSampleProjects(): Project[] {
  return [
    {
      id: 'sample-1',
      title: 'ERP Automation Suite',
      category: 'Caso de estudio · 2026',
      description_es: 'Panel modular para automatizar reportes, flujos administrativos y auditoría operativa en equipos técnicos.',
      description_en: 'Modular dashboard to automate reports, administrative flows and operational auditing for technical teams.',
      tech_stack: ['Vue', 'TypeScript', 'Supabase', 'Edge Functions'],
      repo_url: 'https://github.com',
      live_demo: '#',
      image_url: '/images/cover-erp.svg',
    },
    {
      id: 'sample-2',
      title: 'Field Operations Mobile',
      category: 'Caso de estudio · 2026',
      description_es: 'Aplicación móvil para capturar datos en campo con sincronización progresiva y experiencia offline-first.',
      description_en: 'Mobile app to capture field data with progressive sync and an offline-first experience.',
      tech_stack: ['Ionic', 'Vue', 'SQLite', 'Capacitor'],
      repo_url: 'https://github.com',
      live_demo: '#',
      image_url: '/images/cover-mobile.svg',
    },
    {
      id: 'sample-3',
      title: 'RAG Knowledge Base',
      category: 'Caso de estudio · 2026',
      description_es: 'Arquitectura lista para búsqueda semántica, trazabilidad de fuentes y asistencia técnica multilingüe.',
      description_en: 'Architecture ready for semantic search, source traceability and multilingual technical assistance.',
      tech_stack: ['PostgreSQL', 'pgvector', 'TypeScript', 'OpenAI'],
      repo_url: 'https://github.com',
      live_demo: '#',
      image_url: '/images/cover-rag.svg',
    }
  ];
}

async function loadSocialLinks() {
  if (portfolioState.social_links.length > 0) return;

  const data = await fetchFromSupabase<SocialLink>('social_links', {
    orderBy: [{ column: 'name', ascending: true }],
  });

  if (data && data.length > 0) {
    portfolioState.social_links.push(...data);
    return;
  }

  portfolioState.social_links.push(...loadSampleSocialLinks());
}

async function loadTechnologies() {
  if (portfolioState.technologies.length > 0) return;

  const data = await fetchFromSupabase<Technology>('technologies', {
    orderBy: [
      { column: 'category', ascending: true },
      { column: 'name', ascending: true },
    ],
  });

  if (data && data.length > 0) {
    portfolioState.technologies.push(...data);
    return;
  }

  portfolioState.technologies.push(...loadSampleTechnologies());
}

function loadTools() {
  if (portfolioState.tools.length > 0) return;
  portfolioState.tools.push(...loadSampleTools());
}

async function loadProjects() {
  if (portfolioState.projects.length > 0) return;

  const data = await fetchFromSupabase<Project>('projects', {
    orderBy: [{ column: 'created_at', ascending: false }],
  });

  if (data && data.length > 0) {
    portfolioState.projects.push(...data);
    return;
  }

  portfolioState.projects.push(...loadSampleProjects());
}

async function submitContactForm(payload: ContactForm): Promise<void> {
  const client = await createSupabase();
  if (client) {
    try {
      const { error } = await client.from('contact_form').insert([
        {
          name: payload.name,
          email: payload.email,
          subject: payload.subject,
          message: payload.message,
          service_type: payload.service_type,
        },
      ]);
      if (error) throw error;
      return;
    } catch (error) {
      console.warn('[Supabase] Contact form submission failed:', error);
    }
  }
}

loadSocialLinks();
loadTechnologies();
loadTools();
loadProjects();
subscribeToRealtime();

export function useSupabase() {
  return {
    isLoading: readonly(isLoading),
    portfolioState,
    submitContactForm,
  };
}
