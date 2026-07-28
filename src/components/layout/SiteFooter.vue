<script setup lang="ts">
import { useSupabase } from '@/composables/useSupabase';
import { computed } from 'vue';

const { portfolioState } = useSupabase();

const contactEmail = import.meta.env.PUBLIC_CONTACT_EMAIL;

const brandIcons: Record<string, string> = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
};

// Brand color used for each icon + its hover glow
const brandColors: Record<string, string> = {
  linkedin: '#0A66C2',
  github: '#F0F6FC',
  instagram: '#DD2A7B',
};

const socialLinks = computed(() =>
  portfolioState.social_links
    .filter((link) => link.status === undefined || link.status === 'active')
    .filter((link) => !String(link.url).startsWith('mailto:'))
    .map((link) => {
      const key = String(link.name).toLowerCase();
      return {
        ...link,
        key,
        iconPath: brandIcons[key],
        brandColor: brandColors[key] ?? '#CCFF00',
      };
    })
);

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="relative border-t border-white/10 bg-obsidian py-10">
    <!-- Decorative top line with gradient -->
    <div class="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-volt/50 to-transparent" />
    
    <div class="section-shell">
      <div class="grid gap-8 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-10">
        <!-- Left Column: Brand & Description -->
        <div>
           <a href="#top" class="mb-4 inline-flex items-center gap-2 font-mono text-lg font-bold tracking-wider text-offWhite transition-colors hover:text-volt">
             <div class="h-2.5 w-2.5 rounded-full bg-volt shadow-[0_0_10px_rgba(204,255,0,0.6)]" />
             DevsParra
           </a>
          <p class="mb-4 max-w-sm text-sm leading-relaxed text-offWhite/60">
            Software profesional, medible y mantenible.
          </p>
          
          <!-- Social Links (brand colors) -->
          <div class="flex items-center gap-2">
            <a
              v-for="link in socialLinks"
              :key="link.id"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:scale-110"
              :style="{ '--brand': link.brandColor }"
              :title="link.name"
              :aria-label="link.name"
            >
              <svg v-if="link.iconPath" viewBox="0 0 24 24" class="h-[18px] w-[18px]" aria-hidden="true">
                <defs v-if="link.key === 'instagram'">
                  <linearGradient :id="`ig-${link.id}`" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stop-color="#F58529" />
                    <stop offset="30%" stop-color="#DD2A7B" />
                    <stop offset="60%" stop-color="#8134AF" />
                    <stop offset="100%" stop-color="#515BD4" />
                  </linearGradient>
                </defs>
                <path
                  :d="link.iconPath"
                  :fill="link.key === 'instagram' ? `url(#ig-${link.id})` : link.brandColor"
                />
              </svg>
              <img
                v-else-if="link.image_url"
                :src="link.image_url"
                :alt="link.name"
                class="h-5 w-5"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <!-- Middle Column: Quick Links -->
        <div>
          <h3 class="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">
            Navegación
          </h3>
          <nav class="flex flex-col gap-2.5">
            <a href="#top" class="text-sm text-offWhite/70 transition-colors hover:text-volt hover:translate-x-1 inline-block">
              Inicio
            </a>
            <a href="#services" class="text-sm text-offWhite/70 transition-colors hover:text-volt hover:translate-x-1 inline-block">
              Servicios
            </a>
            <a href="#projects" class="text-sm text-offWhite/70 transition-colors hover:text-volt hover:translate-x-1 inline-block">
              Proyectos
            </a>
            <a href="#technologies" class="text-sm text-offWhite/70 transition-colors hover:text-volt hover:translate-x-1 inline-block">
              Tecnologías
            </a>
            <a href="#contact" class="text-sm text-offWhite/70 transition-colors hover:text-volt hover:translate-x-1 inline-block">
              Contacto
            </a>
          </nav>
        </div>

        <!-- Right Column: Connect -->
        <div>
          <h3 class="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-volt">
            Conectar
          </h3>
          <div class="flex flex-col gap-2.5">
             <a :href="`mailto:${contactEmail}`" class="group flex items-center gap-2 text-sm text-offWhite/70 transition-colors hover:text-volt">
               <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
               {{ contactEmail }}
            </a>
            <div class="mt-1 flex items-center gap-2 text-sm text-offWhite/60">
              <span class="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_8px_rgba(204,255,0,0.7)]" />
               Venezuela, Aragua · Remoto global
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center md:flex-row md:text-left">
        <div class="flex flex-col gap-1">
          <p class="font-mono text-[11px] tracking-[0.18em] text-offWhite/45">
            © {{ currentYear }}
            <span class="font-semibold text-offWhite/70">DevsParra</span>
          </p>
          <p class="font-mono text-[10px] tracking-[0.15em] text-offWhite/30">
            Todos los derechos reservados.
          </p>
        </div>
 
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: linear-gradient(to bottom, rgba(5, 5, 5, 0.95), #050505);
}

.social-icon:hover {
  border-color: color-mix(in srgb, var(--brand) 55%, transparent);
  background-color: color-mix(in srgb, var(--brand) 16%, transparent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--brand) 40%, transparent);
}
</style>
