<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSupabase } from '@/composables/useSupabase';

const { t } = useI18n();
const { portfolioState } = useSupabase();

const preferredHeroStack = ['Flutter', 'Astro', 'Supabase', 'PHP', 'MySQL'];

const heroStack = computed(() =>
  preferredHeroStack
    .map((name) => portfolioState.technologies.find((technology) => technology.name === name))
    .filter((technology): technology is NonNullable<typeof technology> => Boolean(technology))
    .map((technology) => ({
      name: technology.name,
      icon: technology.icon_url,
    })),
);

const brandIcons: Record<string, string> = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  github:
    'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  instagram:
    'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
};

const brandColors: Record<string, string> = {
  linkedin: '#0A66C2',
  github: '#F0F6FC',
  instagram: '#DD2A7B',
};

const socialLinks = computed(() =>
  portfolioState.social_links
    .filter((link) => !String(link.url).startsWith('mailto:'))
    .filter((link) => link.status === undefined || link.status === 'active')
    .map((link) => {
      const key = String(link.name).toLowerCase().trim();
      const iconPath =
        brandIcons[key] ??
        Object.entries(brandIcons).find(([k]) => key.includes(k) || k.includes(key))?.[1];

      return {
        ...link,
        iconPath,
        brandColor: brandColors[key] ?? '#CCFF00',
      };
    }),
);
</script>

<template>
  <section id="top" class="relative flex min-h-[100svh] flex-col overflow-hidden bg-obsidian">
    <!-- Background texture: metallic marble -->
    <div class="absolute inset-0">
      <div class="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-center bg-no-repeat opacity-[0.42]" />
      <div class="absolute inset-0 bg-[radial-gradient(90%_80%_at_28%_45%,transparent_0%,rgba(5,5,5,0.45)_55%,rgba(5,5,5,0.88)_100%)]" />
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-obsidian/35 to-obsidian/75" />
      <div class="absolute inset-0 bg-gradient-to-b from-obsidian/75 via-transparent to-obsidian" />
    </div>

    <div class="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-1 flex-col px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-2 lg:px-10">
      <!-- Main hero content - centered -->
      <div class="mt-20 mb-2 items-center">
        <div class="flex w-full flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:gap-14">

          <!-- Left: Profile photo -->
          <div class="flex w-full max-w-[160px] shrink-0 sm:max-w-[220px] md:max-w-[300px] lg:max-w-[340px]">
            <div class="relative w-full">
              <!-- Ambient green glow, biased to the right / bottom -->
              <div class="absolute inset-0 -m-6 rounded-full bg-[radial-gradient(60%_60%_at_72%_65%,rgba(204,255,0,0.35)_0%,rgba(204,255,0,0.08)_45%,transparent_75%)] blur-[45px]" />

              <!-- Green gradient ring: bright arc on the right/bottom, dark on the left -->
              <div class="relative aspect-square w-full rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(204,255,0,0.3)_0deg,#CCFF00_85deg,#CCFF00_170deg,rgba(204,255,0,0.28)_235deg,rgba(255,255,255,0.03)_290deg,rgba(204,255,0,0.14)_335deg,rgba(204,255,0,0.3)_360deg)] p-[3px] shadow-[0_0_40px_rgba(204,255,0,0.22)]">
                <!-- Inner dark border -->
                <div class="h-full w-full rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black p-[5px]">
                  <img
                    src="/images/profile.png"
                    alt="Wilmer Parra Gómez"
                    class="h-full w-full rounded-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Content -->
          <div class="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
            <!-- Eyebrow -->
            <p class="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-volt">
              DESARROLLADOR DE SOFTWARE | INGENIERO EN INFORMÁTICA
            </p>

            <!-- Name -->
            <h1 class="mb-4 font-display text-[32px] font-black leading-[1.08] tracking-tight text-offWhite sm:text-[44px] md:text-[52px] lg:text-[58px] xl:text-[64px]">
              Wilmer Parra Gómez
            </h1>

            <!-- Description -->
            <p class="mb-5 max-w-2xl text-[14px] leading-[1.6] text-offWhite/65 sm:text-[16px]">
              Desarrollo productos digitales, sistemas internos y aplicaciones con enfoque en arquitectura limpia, rendimiento y experiencia de usuario.
            </p>

            <!-- Social + Buttons -->
            <div class="flex w-full flex-col items-center gap-6 md:w-auto md:flex-row md:items-end md:gap-8">
              <!-- Left: Sígueme label + social icons -->
              <div class="flex flex-col items-center md:items-start">
                <div class="flex items-center gap-2.5">
                  <a
                    v-for="link in socialLinks"
                    :key="link.id"
                    :href="link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-offWhite/85 backdrop-blur-sm transition-all duration-300 hover:border-volt/40 hover:bg-volt/10 hover:text-volt hover:-translate-y-0.5"
                    :title="link.name"
                    :aria-label="link.name"
                  >
                    <svg v-if="link.iconPath" viewBox="0 0 24 24" class="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
                      <path :d="link.iconPath" />
                    </svg>
                    <img v-else-if="link.image_url" :src="link.image_url" :alt="link.name" class="h-5 w-5 object-contain" loading="lazy" />
                  </a>
                </div>
              </div>

              <!-- Right: Buttons -->
              <div class="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                <a
                  href="#projects"
                  class="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-volt px-8 py-3.5 text-[12px] font-black uppercase tracking-[0.12em] text-obsidian shadow-[0_0_35px_rgba(204,255,0,0.4)] transition-all hover:bg-volt/90 hover:shadow-[0_0_50px_rgba(204,255,0,0.6)] hover:-translate-y-0.5 sm:w-auto"
                >
                  Ver proyectos
                  <span class="text-[13px]">↗</span>
                </a>

                <a
                  href="#contact"
                  class="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/25 bg-white/[0.03] px-8 py-3.5 font-mono text-[12px] font-black uppercase tracking-[0.12em] text-offWhite transition-all hover:border-volt hover:bg-volt/5 hover:-translate-y-0.5 sm:w-auto"
                >
                  Contacto
                  <span class="text-[13px]">✕</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Stack - Bottom (much closer) -->
      <div class="mt-5 border-t border-white/5 pt-5">
        <div class="mb-3 flex items-center gap-3">
          <span class="font-mono text-[9px] font-semibold uppercase tracking-[0.25em] text-offWhite/30">TECH STACK</span>
          <div class="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <div
            v-for="item in heroStack"
            :key="item.name"
            class="group flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm transition-all hover:border-volt/40 hover:bg-volt/5 hover:shadow-[0_0_20px_rgba(204,255,0,0.12)]"
          >
            <img
              :src="item.icon"
              :alt="item.name"
              class="h-[18px] w-[18px] object-contain"
              loading="lazy"
            />
            <span class="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-offWhite/85 transition-colors group-hover:text-volt">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>

      <div class="absolute right-5 bottom-8 hidden flex-col items-center gap-1 lg:flex lg:right-10">
        <span class="font-mono text-[7px] uppercase tracking-[0.28em] text-offWhite/25">SCROLL</span>
        <svg class="h-5 w-3 animate-bounce text-volt opacity-80" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>
