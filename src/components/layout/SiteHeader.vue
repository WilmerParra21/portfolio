<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}
</script>

<template>
  <header class="site-header">
    <div class="site-header-inner">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <a href="#top" class="flex items-center gap-2 font-mono text-[12px] font-black uppercase tracking-[0.1em] text-offWhite transition-colors hover:text-volt">
          <div class="h-[6px] w-[6px] rounded-full bg-volt shadow-[0_0_12px_rgba(204,255,0,0.8)]" />
          DevsParra
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden items-center gap-10 md:flex lg:gap-12">
          <a href="#about" class="relative font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-offWhite/80 transition-colors hover:text-offWhite">
            SOBRE MÍ
          </a>
          <a href="#services" class="relative font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-offWhite/80 transition-colors hover:text-offWhite">
            SERVICIOS
          </a>
          <a href="#projects" class="relative font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-offWhite/80 transition-colors hover:text-offWhite">
            PROYECTOS
          </a>
          <a href="#technologies" class="relative font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-offWhite/80 transition-colors hover:text-offWhite">
            STACK
          </a>
        </nav>

        <!-- Right side: CTA -->
        <div class="flex items-center gap-4">
          <!-- CTA Button -->
          <a
            href="#contact"
            class="hidden items-center gap-2 rounded-full border border-volt/70 bg-transparent px-5 py-2.5 font-mono text-[10px] font-black uppercase tracking-[0.1em] text-volt backdrop-blur-sm transition-all hover:bg-volt hover:text-obsidian hover:shadow-[0_0_25px_rgba(204,255,0,0.3)] sm:inline-flex"
          >
            INICIAR PROYECTO
            <span class="text-[12px]">→</span>
          </a>

          <!-- Mobile menu button -->
          <button
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-volt/40 hover:bg-volt/10 md:hidden"
            @click="toggleMobileMenu"
            :aria-expanded="mobileMenuOpen"
            aria-label="Toggle menu"
          >
            <svg v-if="!mobileMenuOpen" class="h-5 w-5 text-offWhite" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="h-5 w-5 text-volt" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="mobile-menu">
        <nav v-if="mobileMenuOpen" class="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-carbon/50 p-6 backdrop-blur-xl md:hidden">
          <a href="#about" class="font-mono text-sm uppercase tracking-wider text-offWhite/70 transition-colors hover:text-volt" @click="toggleMobileMenu">
            Sobre mí
          </a>
          <a href="#projects" class="font-mono text-sm uppercase tracking-wider text-offWhite/70 transition-colors hover:text-volt" @click="toggleMobileMenu">
            Proyectos
          </a>
          <a href="#technologies" class="font-mono text-sm uppercase tracking-wider text-offWhite/70 transition-colors hover:text-volt" @click="toggleMobileMenu">
            Stack
          </a>
        </nav>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
