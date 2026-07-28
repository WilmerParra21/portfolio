<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSupabase } from '@/composables/useSupabase';
import type { Project } from '@/types/portfolio';

const { locale, t } = useI18n();
const { portfolioState } = useSupabase();

const projects = computed(() => portfolioState.projects.slice(0, 3));
const currentIndex = ref(0);
const isTransitioning = ref(false);

function projectDescription(project: Pick<Project, 'description_es' | 'description_en'>) {
  return locale.value === 'es' ? project.description_es : project.description_en;
}

function isPrivateRepo(project: Pick<Project, 'repo_url'>) {
  return !project.repo_url || String(project.repo_url).toLowerCase().includes('privado');
}

function goTo(index: number) {
  if (isTransitioning.value || projects.value.length <= 1) return;
  if (index < 0 || index >= projects.value.length) return;
  isTransitioning.value = true;
  currentIndex.value = index;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 500);
}

function previous() {
  goTo(currentIndex.value === 0 ? projects.value.length - 1 : currentIndex.value - 1);
}

function next() {
  goTo(currentIndex.value === projects.value.length - 1 ? 0 : currentIndex.value + 1);
}
</script>

<template>
  <section id="projects" class="relative overflow-hidden py-10 sm:py-12">
    <div class="section-shell">
      <div class="mb-4 section-label">
        <span class="tech-label">// 02</span>
        <div class="section-label-line" />
        <span class="muted-label">{{ t('sections.projects') }}</span>
      </div>

      <div class="mb-3 flex flex-wrap items-start justify-between gap-6">
        <div class="max-w-2xl">
          <h2 class="mb-3 font-display text-[40px] font-black leading-[1.05] tracking-[-0.02em] text-offWhite lg:text-[48px]">
            Proyectos <span class="gradient-volt">destacados</span>
          </h2>
          <p class="text-[16px] leading-[1.65] text-offWhite/65">
            {{ t('projects.intro') }}
          </p>
        </div>
        <a
          href="#contact"
          class="inline-flex shrink-0 items-center gap-2 rounded-full bg-volt px-6 py-3 font-mono text-[11px] font-black uppercase tracking-[0.12em] text-obsidian shadow-[0_0_28px_rgba(204,255,0,0.32)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(204,255,0,0.5)]"
        >
          {{ t('projects.quickBrief') }}
          <span class="text-[13px]">↗</span>
        </a>
      </div>

      <div class="mb-4 flex items-center justify-between gap-6">
        <div class="flex items-center gap-2" aria-hidden="true">
          <button
            type="button"
            class="project-nav-btn"
            :aria-label="t('projects.previousProject')"
            :disabled="projects.length <= 1 || isTransitioning"
            @click="previous"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            class="project-nav-btn"
            :aria-label="t('projects.nextProject')"
            :disabled="projects.length <= 1 || isTransitioning"
            @click="next"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
        <div class="flex items-center gap-2" v-if="projects.length > 1">
          <button
            v-for="(_, index) in projects"
            :key="index"
            type="button"
            class="project-dot"
            :class="currentIndex === index ? 'project-dot-active' : ''"
            :aria-label="t('projects.goToProject', { index: index + 1 })"
            @click="goTo(index)"
          />
        </div>
      </div>

      <div class="relative overflow-hidden">
        <transition name="project-slide" mode="out-in">
          <article
            v-if="projects.length"
            :key="projects[currentIndex].id"
            class="project-card group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-volt/40 hover:shadow-[0_24px_60px_-15px_rgba(204,255,0,0.2)]"
          >
            <div class="grid lg:grid-cols-[1.4fr_1fr]">
              <div class="relative overflow-hidden rounded-3xl border border-white/20 bg-obsidian p-1.5 transition-all duration-500 group-hover:border-volt/40 group-hover:shadow-[0_0_30px_rgba(204,255,0,0.15)]">
                <div class="relative overflow-hidden rounded-[1.85rem]">
                  <img
                    v-if="projects[currentIndex].image_url"
                    :src="projects[currentIndex].image_url"
                    :alt="projects[currentIndex].title"
                    class="h-auto w-full max-h-[520px] rounded-[1.85rem] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-obsidian/30 to-obsidian/20 md:from-obsidian/90 md:via-obsidian/70 md:to-obsidian/50 md:transition-opacity md:duration-500 md:group-hover:opacity-0" />
                  <div class="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:via-volt/40" />
                  <div class="absolute inset-0 hidden items-center justify-center opacity-100 transition-opacity duration-500 md:flex md:group-hover:opacity-0">
                    <span class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-obsidian/60 px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-offWhite/85 backdrop-blur-sm transition-colors group-hover:border-volt/40 group-hover:text-volt">
                      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Ver proyecto
                    </span>
                  </div>
                  <a
                    v-if="projects[currentIndex].live_demo"
                    :href="projects[currentIndex].live_demo"
                    target="_blank"
                    rel="noreferrer"
                    class="absolute inset-0 z-10"
                    :aria-label="projects[currentIndex].title"
                  />
                </div>
              </div>

              <div class="flex flex-1 flex-col p-7 sm:p-8">
                <p class="mt-3 text-[14px] leading-[1.7] text-offWhite/65 sm:text-[15px]">
                  {{ projectDescription(projects[currentIndex]) }}
                </p>

                <span
                  v-if="projects[currentIndex].category"
                  class="mt-4 inline-flex items-center gap-2.5 text-[11px] font-mono font-medium uppercase tracking-[0.22em] text-offWhite/55"
                >
                  <span class="h-1 w-1 rounded-full bg-volt shadow-[0_0_6px_rgba(204,255,0,0.7)]" />
                  {{ projects[currentIndex].category }}
                </span>

                <div class="mt-5 flex flex-wrap gap-2">
                  <span
                    v-for="tech in projects[currentIndex].tech_stack"
                    :key="tech"
                    class="tech-chip"
                  >
                    {{ tech }}
                  </span>
                </div>

                <div class="mt-auto flex flex-wrap gap-3 pt-6">
                  <a
                    :href="isPrivateRepo(projects[currentIndex]) ? '#' : (projects[currentIndex].repo_url || '#')"
                    target="_blank"
                    rel="noreferrer"
                    class="repo-button"
                    :class="{ 'repo-button-disabled': isPrivateRepo(projects[currentIndex]) }"
                  >
                    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                    <span>Ver repositorio</span>
                    <span
                      v-if="isPrivateRepo(projects[currentIndex])"
                      class="lock-badge"
                    >
                      <svg viewBox="0 0 24 24" class="h-2.5 w-2.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4" />
                      </svg>
                      <span class="lock-tooltip">Repositorio Privado</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </transition>
      </div>

      <div v-if="!projects.length" class="py-20 text-center">
        <p class="text-lg text-offWhite/50">No hay proyectos disponibles</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-nav-btn {
  display: inline-flex;
  height: 44px;
  width: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(245, 245, 247, 0.75);
  transition: all 0.2s ease;
}

.project-nav-btn:hover:not(:disabled) {
  border-color: rgba(204, 255, 0, 0.45);
  background: rgba(204, 255, 0, 0.08);
  color: #ccff00;
}

.project-nav-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.project-dot {
  height: 10px;
  width: 10px;
  border-radius: 9999px;
  border: none;
  background: rgba(255, 255, 255, 0.18);
  transition: all 0.25s ease;
}

.project-dot-active {
  width: 26px;
  background: #ccff00;
  box-shadow: 0 0 12px rgba(204, 255, 0, 0.6);
}

.project-slide-enter-active,
.project-slide-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.project-slide-enter-from {
  opacity: 0;
  transform: translateX(28px);
}

.project-slide-leave-to {
  opacity: 0;
  transform: translateX(-28px);
}

.tech-chip {
  display: inline-flex;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.375rem 0.75rem;
  font-family: ui-monospace, monospace;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(245, 245, 247, 0.8);
  transition: all 0.2s ease;
}

.tech-chip:hover {
  border-color: rgba(204, 255, 0, 0.45);
  background: rgba(204, 255, 0, 0.08);
  color: #ccff00;
  transform: translateY(-1px);
}

.repo-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.625rem 1.25rem;
  font-family: ui-monospace, monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(245, 245, 247, 0.85);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.repo-button:hover:not(.repo-button-disabled) {
  transform: translateY(-0.125rem);
  border-color: rgba(204, 255, 0, 0.5);
  color: #ccff00;
}

.repo-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.lock-badge {
  position: relative;
  display: inline-flex;
  height: 16px;
  width: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(5, 5, 5, 0.9);
  color: rgba(245, 245, 247, 0.85);
  margin-left: 4px;
}

.lock-tooltip {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  white-space: nowrap;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(20, 20, 15, 0.95);
  padding: 4px 10px;
  font-family: ui-monospace, monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(245, 245, 247, 0.85);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
  pointer-events: none;
}

.lock-badge:hover .lock-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
</style>
