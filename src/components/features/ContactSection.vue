<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useSupabase } from '../../composables/useSupabase';
import type { ContactForm } from '../../types/portfolio';

const { t } = useI18n();
const { submitContactForm } = useSupabase();

const serviceTypes = [
  { key: 'web', label: 'Desarrollo Web' },
  { key: 'erp', label: 'Sistema / ERP' },
  { key: 'mobile', label: 'Desarrollo Móvil' },
  { key: 'ai', label: 'Integración con IA' },
  { key: 'consulting', label: 'Consultoría Técnica' },
  { key: 'stores', label: 'Gestión de Apps en las tiendas' },
  { key: 'other', label: 'Otro' },
];

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const selectedServiceType = ref<string>('');
const status = ref<'idle' | 'success' | 'error'>('idle');
const isSubmitting = ref(false);

function selectService(key: string) {
  selectedServiceType.value = selectedServiceType.value === key ? '' : key;
  form.subject = serviceTypes.find((s) => s.key === key)?.label ?? '';
}

async function handleSubmit() {
  status.value = 'idle';
  isSubmitting.value = true;

  try {
    await submitContactForm({ ...form, service_type: selectedServiceType.value || undefined });
    form.name = '';
    form.email = '';
    form.subject = '';
    form.message = '';
    selectedServiceType.value = '';
    status.value = 'success';
  } catch {
    status.value = 'error';
  } finally {
    isSubmitting.value = false;
  }
}

const fieldTips = {
  name: 'Como quieras que te llame — no comparto tus datos con nadie.',
  email: 'Para responderte. Reviso este correo todos los días.',
  service: 'Elige lo que mejor describa tu necesidad. Puedes marcar varios.',
  message: 'Cuéntame objetivo, alcance y plazos. Mientras más contexto, mejor propuesta.',
};

const obscuredEmail = 'd2lsbWVycGFycmFnb21lekBnbWFpbC5jb20=';
const decodedEmail = typeof atob === 'function' ? atob(obscuredEmail) : obscuredEmail;

const isFormComplete = () =>
  form.name.length >= 2 && form.email.includes('@') && form.message.length >= 10;
</script>

<template>
  <section id="contact" class="relative overflow-hidden py-12 sm:py-14">
    <div class="section-shell relative z-10">
      <!-- Section header label -->
      <div class="mb-8 section-label">
        <span class="tech-label">// 05</span>
        <div class="section-label-line" />
        <span class="muted-label">{{ t('sections.contact') }}</span>
      </div>

      <!-- Compact two-column layout -->
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:items-start">
        <!-- Left: copy -->
        <div>
          <h2 class="font-display text-[36px] font-black leading-[1.12] tracking-[-0.02em] text-offWhite sm:text-[44px]">
            {{ t('contact.titleLine1') }}
            {{ t('contact.titleLine2') }}
            <span class="gradient-volt">{{ t('contact.titleHighlight') }}</span>
          </h2>

          <p class="mt-5 text-[15px] leading-[1.65] text-offWhite/70 max-w-sm">
            {{ t('contact.helper') }}
          </p>

          <!-- Contact info -->
          <div class="mt-6 flex flex-col gap-2.5">
            <div class="flex items-center gap-3">
              <span class="status-dot-xs" />
              <a
                :href="'mailto:' + decodedEmail"
                class="font-mono text-sm text-offWhite/70 hover:text-volt transition-colors tracking-[0.05em]"
              >
                {{ decodedEmail }}
              </a>
            </div>
            <div class="flex items-center gap-3">
              <span class="status-dot-xs" />
              <span class="font-mono text-sm text-offWhite/70 tracking-[0.05em]">
                Venezuela · Remoto global
              </span>
            </div>
            <div class="ml-5 mt-1 flex items-center gap-2 border-l border-volt/30 pl-3">
              <span class="font-mono text-[11px] tracking-[0.1em] text-volt/80">
                {{ t('contact.responseTime') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right: colorful card form -->
        <div>
          <div class="contact-card contact-card-glow">
            <form class="grid gap-4" @submit.prevent="handleSubmit">
              <!-- Name + Email inline -->
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="contact-field">
                  <div class="contact-label-row">
                    <label for="contact-name">{{ t('contact.name') }}</label>
                    <span class="tooltip" tabindex="0" :aria-label="fieldTips.name">?</span>
                    <span class="tooltip-pop">{{ fieldTips.name }}</span>
                  </div>
                  <input
                    id="contact-name"
                    v-model.trim="form.name"
                    class="contact-input"
                    name="name"
                    type="text"
                    :placeholder="t('contact.name')"
                    required
                    minlength="2"
                    autocomplete="name"
                  />
                </div>

                <div class="contact-field">
                  <div class="contact-label-row">
                    <label for="contact-email">{{ t('contact.email') }}</label>
                    <span class="tooltip" tabindex="0" :aria-label="fieldTips.email">?</span>
                    <span class="tooltip-pop">{{ fieldTips.email }}</span>
                  </div>
                  <input
                    id="contact-email"
                    v-model.trim="form.email"
                    class="contact-input"
                    name="email"
                    type="email"
                    :placeholder="t('contact.email')"
                    required
                    autocomplete="email"
                  />
                </div>
              </div>

              <!-- Service type chips -->
              <div class="contact-field">
                <div class="contact-label-row">
                  <span>{{ t('contact.serviceTypeAria') }}</span>
                  <span class="tooltip" tabindex="0" :aria-label="fieldTips.service">?</span>
                  <span class="tooltip-pop">{{ fieldTips.service }}</span>
                </div>
                <div class="mt-2.5 flex flex-wrap gap-2" role="group" :aria-label="t('contact.serviceTypeAria')">
                  <button
                    v-for="service in serviceTypes"
                    :key="service.key"
                    type="button"
                    class="service-chip"
                    :class="{ 'service-chip-active': selectedServiceType === service.key }"
                    @click="selectService(service.key)"
                  >
                    {{ service.label }}
                  </button>
                </div>
              </div>

              <!-- Message -->
              <div class="contact-field">
                <div class="contact-label-row">
                  <label for="contact-message">{{ t('contact.message') }}</label>
                  <span class="tooltip" tabindex="0" :aria-label="fieldTips.message">?</span>
                  <span class="tooltip-pop">{{ fieldTips.message }}</span>
                </div>
                <textarea
                  id="contact-message"
                  v-model.trim="form.message"
                  class="contact-input contact-textarea"
                  name="message"
                  :placeholder="t('contact.message')"
                  required
                  minlength="10"
                />
              </div>

              <!-- Footer row: status + submit -->
              <div class="flex items-center justify-between gap-4 pt-1">
                <div>
                  <span v-if="status === 'success'" class="font-mono text-xs text-volt tracking-[0.05em]">
                    ✓ {{ t('contact.success') }}
                  </span>
                  <span v-else-if="status === 'error'" class="font-mono text-xs text-coral tracking-[0.05em]">
                    ✕ {{ t('contact.error') }}
                  </span>
                  <span v-else class="font-mono text-xs text-offWhite/30 tracking-[0.05em]">
                    {{ isFormComplete() ? t('contact.ready') : t('contact.incomplete') }}
                  </span>
                </div>

                <button
                  class="btn-volt inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? t('contact.sending') : t('contact.send') }}
                  <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22l-4-9-9-4 19-7Z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.status-dot-xs {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #CCFF00;
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-card {
  position: relative;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(155deg, rgba(204, 255, 0, 0.05), rgba(255, 255, 255, 0.02));
  padding: 1.25rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.contact-field {
  display: flex;
  flex-direction: column;
}

.contact-label-row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 7px;
}

.contact-label-row label,
.contact-label-row > span:first-child {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: rgba(245, 245, 247, 0.7);
  text-transform: none;
}

.contact-input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(245, 245, 247, 0.92);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  padding: 11px 14px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  width: 100%;
}

.contact-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
}

.contact-input:focus {
  border-color: rgba(204, 255, 0, 0.55);
  background: rgba(204, 255, 0, 0.04);
  box-shadow: 0 0 0 3px rgba(204, 255, 0, 0.12);
}

.contact-textarea {
  min-height: 72px;
  resize: vertical;
}

.service-chip {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.03);
  color: rgba(245, 245, 247, 0.7);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-transform: none;
  padding: 7px 14px;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.service-chip:hover {
  border-color: rgba(204, 255, 0, 0.4);
  background: rgba(204, 255, 0, 0.06);
  color: rgba(245, 245, 247, 0.95);
}

.service-chip-active {
  border-color: rgba(204, 255, 0, 0.7);
  background: rgba(204, 255, 0, 0.14);
  color: #CCFF00;
}

/* Tooltip */
.tooltip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(245, 245, 247, 0.6);
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  cursor: help;
  user-select: none;
}

.tooltip-pop {
  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);
  z-index: 30;
  width: max-content;
  max-width: 220px;
  padding: 8px 11px;
  border-radius: 10px;
  background: #14140f;
  border: 1px solid rgba(204, 255, 0, 0.3);
  color: rgba(245, 245, 247, 0.85);
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
  pointer-events: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.tooltip:hover,
.tooltip:focus,
.tooltip:focus-visible {
  color: #CCFF00;
  border-color: rgba(204, 255, 0, 0.6);
  outline: none;
}

.tooltip:hover + .tooltip-pop,
.tooltip:focus + .tooltip-pop,
.tooltip:focus-visible + .tooltip-pop {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>
