<script setup lang="ts">
import type { Component } from 'vue'
import { Container, FileCode2, FileCog, FileText, Folder, FolderOpen } from '@lucide/vue'
import { codeToHtml } from 'shiki'

const activeFile = ref('src/main.cpp')
const editorWidth = ref(100)
const workbench = ref<HTMLElement | null>(null)
const folders = ref({ root: true, src: true })

function resizePanels(event: PointerEvent) {
  const bounds = workbench.value?.getBoundingClientRect()
  if (!bounds) return

  editorWidth.value = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100))
}

function beginResize(event: PointerEvent) {
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  resizePanels(event)
}

function adjustPanels(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    editorWidth.value = Math.max(0, editorWidth.value - 5)
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    editorWidth.value = Math.min(100, editorWidth.value + 5)
  }
}

const files = {
  'README.md': {
    language: 'Markdown',
    content: `# Bonka

Bonka is an experimental browser-based editor and GBA  development toolkit.

It provides a browser-hosted editor, Project Format v1 validation and a
GBA-focused generator for Butano.

## Build a GBA ROM

\`\`\`bash
docker compose exec -T gba make
\`\`\`

The generated ROM is \`.bonka/build/bonka_welcome.gba.\`
`
  },
  'src/main.cpp': {
    language: 'C++',
    content: `#include "bn_core.h"
#include "bn_sprite_ptr.h"
#include "bn_sprite_text_generator.h"
#include "bn_vector.h"

#include "common_variable_8x16_sprite_font.h"

int main()
{
    bn::core::init();

    bn::sprite_text_generator text_generator(common::variable_8x16_sprite_font);
    text_generator.set_center_alignment();

    bn::vector<bn::sprite_ptr, 32> text_sprites;
    text_generator.generate(0, -8, "Welcome to", text_sprites);
    text_generator.generate(0, 8, "- bonka.dev -", text_sprites);

    while(true)
    {
        bn::core::update();
    }
}
`
  },
  Makefile: {
    language: 'Make',
    content: `TARGET       :=  .bonka/build/bonka_welcome
BUILD        :=  .bonka/build
BUTANO_ROOT  ?=  vendor/butano
LIBBUTANO    ?=  $(BUTANO_ROOT)/butano
PYTHON       :=  python3
SOURCES      :=  src $(BUTANO_ROOT)/common/src
INCLUDES     :=  include $(BUTANO_ROOT)/common/include
ROMTITLE     :=  BONKA START
ROMCODE      :=  BNKA

BONKA_GENERATED := .bonka/generated.mk

$(BONKA_GENERATED): $(BONKA_INPUTS) $(BONKA_GENERATOR_INPUTS)
	node packages/target-gba/src/cli.mjs --project bonka.config.json

include $(LIBBUTANOABS)/butano.mak
`
  },
  'docker-compose.yml': {
    language: 'YAML',
    content: `name: bonka

services:
  gba:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - .:/workspace
      - bonka_node_modules:/workspace/node_modules
    working_dir: /workspace
    command: sh -c "npm ci && npm run build --workspace @bonka/editor && node apps/editor/server.mjs"
    ports:
      - "8000:8000"
    environment:
      - HOST=0.0.0.0
      - DEVKITPRO=/opt/devkitpro
      - DEVKITARM=/opt/devkitpro/devkitARM
      - BUTANO_ROOT=../opt/butano

volumes:
  bonka_node_modules:
`
  },
  Dockerfile: {
    language: 'Dockerfile',
    content: `FROM devkitpro/devkitarm:latest

RUN apt-get update && apt-get install -y \
    git \
    make \
    nodejs \
    npm \
    python3 \
    python3-pip \
    libpng-dev \
    unzip \
    xz-utils \
    && rm -rf /var/lib/apt/lists/*

# Install Bonka's Node dependencies outside /workspace, because the workspace
# is bind-mounted when the development container starts.
COPY devtools/bonka/package.json devtools/bonka/package-lock.json /opt/bonka/
RUN npm ci --omit=dev --prefix /opt/bonka \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_PATH=/opt/bonka/node_modules
ENV DEVKITPRO=/opt/devkitpro
ENV DEVKITARM=/opt/devkitpro/devkitARM

WORKDIR /workspace

CMD ["/bin/bash"]
`
  }
} as const

const fileIcons: Record<keyof typeof files, Component> = {
  'README.md': FileText,
  'src/main.cpp': FileCode2,
  Makefile: FileCog,
  'docker-compose.yml': FileCode2,
  Dockerfile: Container
}

const fileIconClasses: Record<keyof typeof files, string> = {
  'README.md': 'file-doc',
  'src/main.cpp': 'file-cpp',
  Makefile: 'file-make',
  'docker-compose.yml': 'file-yaml',
  Dockerfile: 'file-docker'
}

const fileLanguages: Record<keyof typeof files, string> = {
  'README.md': 'markdown',
  'src/main.cpp': 'cpp',
  Makefile: 'makefile',
  'docker-compose.yml': 'yaml',
  Dockerfile: 'dockerfile'
}

const currentFile = computed(() => files[activeFile.value as keyof typeof files])
const highlightedCode = shallowRef('')

async function highlightCode(fileName: keyof typeof files) {
  const html = await codeToHtml(files[fileName].content, { lang: fileLanguages[fileName], theme: 'github-dark' })
  if (activeFile.value === fileName) highlightedCode.value = html
}

await highlightCode(activeFile.value as keyof typeof files)
watch(activeFile, (fileName) => void highlightCode(fileName as keyof typeof files))

useSeoMeta({ title: 'Examples | Bonka' })
</script>

<template>
  <main class="examples-page">
    <div class="examples-heading">
      <div>
        <p class="eyebrow"><i /> Example project</p>
        <h1>One source file.<br /><em>One GBA ROM.</em></h1>
      </div>
      <div class="examples-intro">
        <p>The Bonka Welcome Screen is the smallest complete GBA build: a Butano entry point, a sprite-based welcome screen and a ROM running directly in this browser.</p>
        <a class="button button-primary" href="https://editor.bonka.dev" target="_blank" rel="noreferrer">Open Bonka editor <span>↗</span></a>
      </div>
    </div>

    <div class="example-showcase">
      <section class="example-notes" aria-label="How the example works">
        <div class="example-note-list">
          <p><span>01</span> Everything needed to build the ROM is here: <code>source</code>, <code>Makefile</code> and container setup.</p>
          <p><span>02</span> <code>main.cpp</code> boots Butano, then updates the GBA once per frame.</p>
          <p><span>03</span> The compiled <code>bonka_welcome.gba</code> runs in mGBA beside the source.</p>
        </div>
        <NuxtLink to="/docs/gba-pipeline">Read the GBA pipeline docs →</NuxtLink>
      </section>

      <section class="example-workbench" aria-label="Bonka Welcome Screen example project">
        <div class="workbench-titlebar"><span><b>B</b> examples / welcome-screen</span><span>GBA · Butano</span></div>
        <div ref="workbench" class="workbench-main" :style="{ '--editor-width': `${editorWidth}%` }">
          <div class="workbench-editor">
          <aside class="file-explorer" aria-label="Project files">
            <p>Explorer</p>
            <button class="file-root" type="button" :aria-expanded="folders.root" @click="folders.root = !folders.root"><FolderOpen v-if="folders.root" class="folder-svg" :size="16" aria-hidden="true" /><Folder v-else class="folder-svg" :size="16" aria-hidden="true" /> bonka-studio</button>
            <div v-if="folders.root" class="tree-children">
              <button class="file-entry" :class="{ active: activeFile === 'README.md' }" type="button" @click="activeFile = 'README.md'"><FileText class="file-icon file-doc" :size="14" aria-hidden="true" /> README.md</button>
              <button class="folder-entry" type="button" :aria-expanded="folders.src" @click="folders.src = !folders.src"><FolderOpen v-if="folders.src" class="folder-svg" :size="16" aria-hidden="true" /><Folder v-else class="folder-svg" :size="16" aria-hidden="true" /> src</button>
              <div v-if="folders.src" class="tree-children nested-tree"><button class="file-entry" :class="{ active: activeFile === 'src/main.cpp' }" type="button" @click="activeFile = 'src/main.cpp'"><FileCode2 class="file-icon file-cpp" :size="14" aria-hidden="true" /> main.cpp</button></div>
              <button class="file-entry" :class="{ active: activeFile === 'Makefile' }" type="button" @click="activeFile = 'Makefile'"><FileCog class="file-icon file-make" :size="14" aria-hidden="true" /> Makefile</button>
              <button class="file-entry" :class="{ active: activeFile === 'docker-compose.yml' }" type="button" @click="activeFile = 'docker-compose.yml'"><FileCode2 class="file-icon file-yaml" :size="14" aria-hidden="true" /> docker-compose.yml</button>
              <button class="file-entry" :class="{ active: activeFile === 'Dockerfile' }" type="button" @click="activeFile = 'Dockerfile'"><Container class="file-icon file-docker" :size="14" aria-hidden="true" /> Dockerfile</button>
            </div>
          </aside>

          <div class="file-viewer">
            <div class="file-tab"><component :is="fileIcons[activeFile as keyof typeof files]" :class="['file-icon', fileIconClasses[activeFile as keyof typeof files]]" :size="14" aria-hidden="true" /> {{ activeFile }} <span>{{ currentFile.language }}</span></div>
            <div class="source-code" aria-label="Code preview" v-html="highlightedCode" />
          </div>
          </div>

          <div class="emulator-resizer" role="separator" aria-orientation="vertical" :aria-valuenow="editorWidth" aria-valuemin="0" aria-valuemax="100" tabindex="0" @pointerdown="beginResize" @pointermove="(event) => event.buttons && resizePanels(event)" @keydown="adjustPanels"><span>↔</span></div>

          <div class="emulator-panel">
            <ClientOnly><WelcomeEmulator /><template #fallback><div class="emulator-fallback">Preparing emulator…</div></template></ClientOnly>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
