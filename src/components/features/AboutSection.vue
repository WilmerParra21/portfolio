<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const professionalPoints = [
  {
    title: 'Experiencia',
    description: 'Más de 5 años desarrollando aplicaciones web y móviles.',
  },
  {
    title: 'Enfoque',
    description: 'Arquitectura limpia, enfocado en mejorar la experiencia del usuario y hacer código escalable como base de cada entrega.',
  },
  {
    title: 'Metodología',
    description: 'Agile/Scrum o Kanban, con comunicación clara y entregas continuas medibles.',
  },
  {
    title: 'Stack',
    description: 'Uso tecnologías en base a la mejor solución, no a la tendencia.',
  },
];
</script>

<template>
  <section id="about" class="relative overflow-hidden py-10 sm:py-12">
    <div class="section-shell">
      <div class="mb-6 section-label">
        <span class="tech-label">// 01</span>
        <div class="section-label-line" />
        <span class="muted-label">Acerca de mí</span>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8 items-start">
        <div>
          <h2 class="mb-5 font-display text-[40px] font-black leading-[1.08] tracking-[-0.02em] text-offWhite lg:text-[52px]">
            Enfoque <span class="gradient-volt">profesional</span> y filosofía de desarrollo
          </h2>

          <p class="max-w-md text-[16px] leading-[1.75] text-offWhite/65">
            Desarrollo productos digitales con arquitectura limpia y escalable, priorizando la satisfacción del usuario y realizando entregas sostenibles en el periodos de tiempo establecidos. Cada proyecto es una decisión técnica alineada al negocio.
          </p>
        </div>

        <div class="flex flex-col">
          <div
            v-for="(point, index) in professionalPoints"
            :key="index"
            class="group flex items-start gap-6 border-t border-white/10 py-5 first:border-t-0 first:pt-0"
          >
            <span class="mt-1 font-mono text-[13px] font-bold tracking-[0.1em] text-volt/70">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div class="flex-1">
              <h3 class="mb-1 text-[18px] font-black text-offWhite transition-colors group-hover:text-volt">{{ point.title }}</h3>
              <p class="text-[15px] leading-[1.65] text-offWhite/60">{{ point.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
