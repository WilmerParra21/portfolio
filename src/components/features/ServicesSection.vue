<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const services = [
  {
    id: 'mobile',
    icon: 'M12 18h.01M8 18h.01M12 14h.01M16 18h.01M7.5 6.5a2.121 2.121 0 113 3L12 10l1 1 2 2-4 4-2-2-1-1-4.5-4.5z',
    title: 'Desarrollo de aplicaciones móviles',
    description: 'Apps nativas y multiplataforma optimizadas para rendimiento, offline y experiencia móvil real.',
  },
  {
    id: 'web',
    icon: 'M12 21a9 9 0 100-18 9 9 0 000 18zm0 0v-6m0 6h.01M8.5 14.5l7-7',
    title: 'Aplicaciones y sitios web',
    description: 'Landing pages, dashboards, portales y apps web responsivas enfocadas en conversión.',
  },
  {
    id: 'apis',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'APIs REST e integraciones',
    description: 'Diseño y despliegue de APIs, webhooks y conectores entre servicios para automatizar flujos.',
  },
  {
    id: 'stores',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    title: 'Gestión de Play Store y App Store',
    description: 'Publicación, mantenimiento y optimización de listings en tiendas para apps móviles.',
  },
  {
    id: 'analytics',
    icon: 'M18 20V10M12 20V4M6 20v-6',
    title: 'Análisis de datos',
    description: 'Transformación de datos en información útil para decisiones y seguimiento de producto.',
  },
  {
    id: 'databases',
    icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4',
    title: 'Gestor de Bases de Datos',
    description: 'Diseño, administración y optimización de bases de datos para aplicaciones y sistemas.',
  },
];
</script>

<template>
  <section id="services" class="relative overflow-hidden py-10 sm:py-12">
    <div class="section-shell">
      <div class="mb-6 section-label justify-center">
        <span class="tech-label">// 08</span>
        <div class="section-label-line" />
        <span class="muted-label">{{ t('sections.services') }}</span>
      </div>

      <div class="mb-8 text-center">
        <h2 class="font-display text-[36px] font-black leading-[1.08] tracking-[-0.02em] text-offWhite md:text-[42px]">
          Servicios
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-[16px] leading-[1.7] text-offWhite/65 sm:text-[17px]">
          Transforma ideas en productos listos para escalar.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="service in services"
          :key="service.id"
          class="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-volt/40 hover:bg-white/[0.04] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
          <div class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-volt/10 text-volt transition-colors duration-300 group-hover:bg-volt/20">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path :d="service.icon" />
            </svg>
          </div>

          <h3 class="mt-4 text-[15px] font-black leading-tight text-offWhite transition-colors duration-300 group-hover:text-volt">
            {{ service.title }}
          </h3>
          <p class="mt-2 text-[13px] leading-relaxed text-offWhite/60">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
