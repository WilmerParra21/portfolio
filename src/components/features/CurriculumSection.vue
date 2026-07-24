<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const curriculumPath = '/doc/cv.pdf';
const showPdfModal = ref(false);

// Interactive tilt for the illustration card
const tiltX = ref(0);
const tiltY = ref(0);
const active = ref(false);

function handleMove(event: MouseEvent) {
  const el = event.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;
  const py = (event.clientY - rect.top) / rect.height - 0.5;
  tiltY.value = px * 12;
  tiltX.value = -py * 12;
  active.value = true;
}

function handleLeave() {
  tiltX.value = 0;
  tiltY.value = 0;
  active.value = false;
}

function openPdfModal() {
  showPdfModal.value = true;
}

function closePdfModal() {
  showPdfModal.value = false;
}
</script>

<template>
  <section id="curriculum" class="relative overflow-hidden py-12 sm:py-14">
    <!-- Ambient glow -->
    <div class="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div class="cv-orb cv-orb-1" />
      <div class="cv-orb cv-orb-2" />
    </div>

    <div class="section-shell relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
      <!-- Left: CV download call to action -->
      <div>
        <div class="section-label mb-7">
          <span class="tech-label">// CV</span>
          <div class="section-label-line" />
          <span class="muted-label">Currículum</span>
        </div>

        <h2 class="font-display text-[36px] font-black leading-[1.08] tracking-[-0.02em] text-offWhite sm:text-[46px]">
          Experiencia y <span class="gradient-volt">trayectoria</span>
        </h2>

        <p class="mt-5 max-w-md text-[16px] leading-[1.7] text-offWhite/65 sm:text-[17px]">
          Perfil profesional con foco en arquitectura, producto y entrega continua. Disponible para revisar o descargar.
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            @click="openPdfModal"
            class="inline-flex items-center justify-center gap-2.5 rounded-full bg-volt px-7 py-3.5 font-mono text-[12px] font-black uppercase tracking-[0.12em] text-obsidian shadow-[0_0_30px_rgba(204,255,0,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(204,255,0,0.55)]"
          >
            {{ t('curriculum.view') }}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
          </button>
          <a
            class="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 font-mono text-[12px] font-black uppercase tracking-[0.12em] text-offWhite transition-all hover:-translate-y-0.5 hover:border-volt hover:text-volt"
            :href="curriculumPath"
            download
          >
            {{ t('curriculum.download') }}
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
          </a>
        </div>

        <p class="mt-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-offWhite/40">
          <span class="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_8px_rgba(204,255,0,0.7)]" />
          PDF · Actualizado 2026
        </p>
      </div>

      <!-- Right: interactive illustration -->
      <div class="flex justify-center lg:justify-end">
        <div
          class="cv-card"
          :class="{ 'cv-card-active': active }"
          :style="{ transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }"
          @mousemove="handleMove"
          @mouseleave="handleLeave"
        >
          <div class="cv-card-glow" />

          <div class="cv-image-stack">
            <img
              src="/images/avatar2.jpg"
              alt=""
              class="cv-card-img cv-card-img-secondary"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/images/avatar.jpg"
              alt="Ilustración de desarrollo de software"
              class="cv-card-img cv-card-img-primary"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- PDF Modal -->
    <div
      v-if="showPdfModal"
      class="pdf-modal-overlay"
      @click.self="closePdfModal"
    >
      <div class="pdf-modal">
        <div class="pdf-modal-header">
          <span class="font-mono text-sm font-bold uppercase tracking-[0.18em] text-offWhite">Currículum</span>
          <button
            type="button"
            class="pdf-modal-close"
            @click="closePdfModal"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="pdf-modal-body">
          <iframe :src="curriculumPath" class="pdf-iframe" title="CV PDF" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cv-orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
  opacity: 0.26;
}

.cv-orb-1 {
  top: -6%;
  left: -4%;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(204, 255, 0, 0.16), transparent 70%);
}

.cv-orb-2 {
  bottom: -12%;
  right: 4%;
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, rgba(120, 200, 90, 0.12), transparent 70%);
}

.cv-card {
  position: relative;
  width: clamp(260px, 32vw, 380px);
  aspect-ratio: 4 / 5;
  border-radius: 1.75rem;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  transform-style: preserve-3d;
  transition: transform 0.2s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.cv-card-active {
  border-color: rgba(204, 255, 0, 0.35);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.45), 0 0 40px rgba(204, 255, 0, 0.12);
}

.cv-card-glow {
  position: absolute;
  inset: -1px;
  border-radius: 1.75rem;
  background: radial-gradient(circle at 30% 20%, rgba(204, 255, 0, 0.18), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.cv-card-active .cv-card-glow {
  opacity: 1;
}

.cv-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.35rem;
  transform: translateZ(30px);
}

.cv-image-stack {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1.35rem;
  overflow: hidden;
}

.cv-card-img-secondary {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.35rem;
  transform: translateZ(30px);
}

.cv-card-img-primary {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.35rem;
  transform: translateZ(30px);
  transition: opacity 0.5s ease;
  opacity: 1;
}

.cv-card:hover .cv-card-img-primary {
  opacity: 0;
}

.pdf-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 5, 5, 0.85);
  backdrop-filter: blur(6px);
  padding: 1.5rem;
}

.pdf-modal {
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(20, 20, 15, 0.95);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pdf-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.pdf-modal-close {
  display: inline-flex;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(245, 245, 247, 0.8);
  transition: all 0.2s ease;
}

.pdf-modal-close:hover {
  border-color: rgba(204, 255, 0, 0.45);
  color: #ccff00;
  background: rgba(204, 255, 0, 0.08);
}

.pdf-modal-body {
  flex: 1;
  min-height: 0;
  background: rgba(0, 0, 0, 0.35);
}

.pdf-iframe {
  width: 100%;
  height: 70vh;
  border: 0;
  display: block;
}

@media (max-width: 1024px) {
  .cv-card {
    width: min(320px, 100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cv-card {
    transform: none !important;
    transition: none;
  }
}
</style>
