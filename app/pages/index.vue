<script setup lang="ts">
import { Blocks, FileOutput, Image, Layers } from '@lucide/vue'

const previewTileSources = [
  '/tilesets/Tileset/Slice 1.png',
  '/tilesets/Tileset/Slice 2.png',
  '/tilesets/Tileset/Slice 3.png',
  '/tilesets/Tileset/Slice 4.png',
  '/tilesets/Tileset/Slice 7.png',
  '/tilesets/Tileset/Slice 13.png',
  '/tilesets/Tileset/Slice 14.png',
  '/tilesets/Tileset/Slice 16.png',
  '/tilesets/Tileset/Slice 17.png',
  '/tilesets/Tileset/Slice 27.png',
  '/tilesets/Tileset/Slice 29.png',
  '/tilesets/Tileset/Slice 89.png'
]

const sceneSliceLayout = [
  1, 2, 3, 29, 13, 17,
  2, 3, 29, 7, 4, 1,
  3, 29, 7, 14, 27, 2,
  16, 7, 14, 27, 2, 3,
  14, 17, 27, 2, 3, 29,
  4, 1, 2, 3, 29, 89
]

const sceneTiles = sceneSliceLayout.map((slice, index) => ({
  id: index,
  source: `/tilesets/Tileset/Slice ${slice}.png`,
  left: `${((index % 6) - Math.floor(index / 6)) * 16}px`,
  top: `${((index % 6) + Math.floor(index / 6)) * 8}px`
}))

const expandedAssets = ref({ metatiles: true, tilesets: true })
const previewLayers = [
  { name: 'Trees' },
  { name: 'Rocks' },
  { name: 'Ground' },
  { name: 'Path', indent: true },
  { name: 'Foliage' }
]
const activeLayer = ref('Trees')
</script>

<template>
  <main id="top">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow"><i /> Experimental toolset <span>v0.3.0</span></p>
        <h1>Shape <em>big</em> worlds<br />for a <em>small</em> machine.</h1>
        <p class="intro">
          Bonka is a browser-based editor for designing isometric Game Boy
          Advance scenes, from the first tile to Butano-ready build inputs.
        </p>
        <div class="hero-actions">
          <a
            class="button button-primary"
            href="https://github.com/bonka-dev/studio/releases/latest"
            target="_blank"
            rel="noreferrer"
            >Download latest <span>↓</span></a
          >
          <NuxtLink class="button button-quiet" to="/getting-started"
            >Get started <span>→</span></NuxtLink
          >
        </div>
        <p class="requirement">
          For Chromium-based desktop browsers · Open source under
          GPL-3.0-or-later
        </p>
      </div>

      <figure
        class="editor-preview"
        role="img"
        aria-label="Illustrated Bonka editor preview showing tiles, an isometric scene and layers"
      >
        <div class="preview-topbar">
          <div class="preview-name"><b>B</b><strong>Bonka Starter Project</strong></div>
          <div class="preview-tools">
            <span class="preview-dot" /><span /><span />
          </div>
        </div>
        <div class="preview-body">
          <div class="preview-assets">
            <p>Metatiles <small>12</small></p>
            <button class="asset-folder" type="button" :aria-expanded="expandedAssets.metatiles" @click="expandedAssets.metatiles = !expandedAssets.metatiles"><svg v-if="expandedAssets.metatiles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" /></svg><svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" /></svg> METATILES</button>
            <div v-if="expandedAssets.metatiles" class="tile-set"><img v-for="(tile, index) in previewTileSources" :key="tile" :src="tile" :alt="`Tileset tile ${index + 1}`" /></div>
            <button class="asset-folder" type="button" :aria-expanded="expandedAssets.tilesets" @click="expandedAssets.tilesets = !expandedAssets.tilesets"><svg v-if="expandedAssets.tilesets" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" /></svg><svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" /></svg> TILESETS</button>
            <div v-if="expandedAssets.tilesets" class="mini-tile">
              <img src="/tilesets/Atlas_files/Tileset_Atlas.png" alt="Metatile preview" />
              <!-- <img :src="previewTileSources[0]" alt="Metatile preview" />
              <img :src="previewTileSources[1]" alt="Metatile preview" />
              <img :src="previewTileSources[2]" alt="Metatile preview" /> -->
            </div>
          </div>
          <div class="preview-canvas">
            <div class="canvas-meta">
              <span>Scene: <b>old_road</b></span
              ><span>100%</span>
            </div>
            <div class="iso-world" aria-hidden="true">
              <img v-for="tile in sceneTiles" :key="tile.id" class="scene-tile" :src="tile.source" :style="{ '--left': tile.left, '--top': tile.top }" alt="" />
              <img class="scene-tree scene-tree-a" src="/tilesets/Trees/Tree_1.png" alt="" />
              <img class="scene-tree scene-tree-b" src="/tilesets/Trees/Tree_2.png" alt="" />
              <img class="scene-rock" src="/tilesets/Rocks/Slice 1.png" alt="" />
              <img class="scene-leaves" src="/tilesets/Leaves/Slice 1.png" alt="" />
            </div>
            <div class="canvas-status">
              <span>{{ activeLayer }} layer</span><span>X: 14 &nbsp; Y: 09</span>
            </div>
          </div>
          <div class="preview-layers">
            <p>Outliner</p>
            <button v-for="layer in previewLayers" :key="layer.name" class="layer" :class="{ active: activeLayer === layer.name, indent: layer.indent }" type="button" @click="activeLayer = layer.name"><i>◉</i> {{ layer.name }}</button>
          </div>
        </div>
        <div class="preview-bottom">
          <span><b /> Saved</span><span>ISO / 32 × 64</span><span>⌘ S</span>
        </div>
      </figure>
    </section>

    <section class="capabilities-strip" aria-label="Bonka capabilities">
      <p>
        <span>Isometric scenes</span><b>✦</b><span>Open project format</span><b>✦</b
        ><span>Butano build inputs</span><b>✦</b><span>Game Boy Advance</span>
      </p>
    </section>

    <section class="workflow">
      <div class="section-heading">
        <p class="eyebrow"><i /> The workflow</p>
        <h2>From loose pixels<br />to a living <em>place.</em></h2>
        <p>
          Bonka keeps the creative loop close: compose your tiles, paint a
          scene, then bring clean data to your GBA build.
        </p>
      </div>
      <div class="steps">
        <article>
          <div class="step-icon tiles-icon"><Image :size="27" :stroke-width="1.4" aria-hidden="true" /></div>
          <h3>Import tiles</h3>
          <p>
            Bring in your PNG tilesets and browse a searchable palette built for
            small, deliberate assets.
          </p>
        </article>
        <article>
          <div class="step-icon meta-icon"><Blocks :size="27" :stroke-width="1.4" aria-hidden="true" /></div>
          <h3>Compose metatiles</h3>
          <p>
            Build reusable pieces, choose their size, and mark collision
            directly where it matters.
          </p>
        </article>
        <article>
          <div class="step-icon paint-icon"><Layers :size="27" :stroke-width="1.4" aria-hidden="true" /></div>
          <h3>Paint a scene</h3>
          <p>
            Lay down isometric worlds with drag painting, layers, offsets,
            groups, objects, and entities.
          </p>
        </article>
        <article>
          <div class="step-icon output-icon"><FileOutput :size="27" :stroke-width="1.4" aria-hidden="true" /></div>
          <h3>Generate output</h3>
          <p>
            Turn your project into disposable Butano build inputs, ready for
            your GBA development workflow.
          </p>
        </article>
      </div>
    </section>

    <section class="features">
      <div class="feature-lead">
        <p class="eyebrow"><i /> Made for making</p>
        <h2>Tools with a point<br />of <em>view.</em></h2>
      </div>
      <div class="feature-list">
        <article>
          <span class="feature-number">01</span>
          <div>
            <h3>See the whole scene</h3>
            <p>
              Zoom, pan, fit-to-viewport and grid controls keep a 32 × 64
              isometric canvas comfortably under your hand.
            </p>
          </div>
          <span class="feature-arrow">↘</span>
        </article>
        <article>
          <span class="feature-number">02</span>
          <div>
            <h3>Build with structure</h3>
            <p>
              Organise tiles, objects and entities into groups. Reorder, hide,
              offset and tune opacity without losing your place.
            </p>
          </div>
          <span class="feature-arrow">↘</span>
        </article>
        <article>
          <span class="feature-number">03</span>
          <div>
            <h3>Keep the experiments</h3>
            <p>
              Undo and redo history, keyboard commands and saved-state feedback
              let you push an idea without fear.
            </p>
          </div>
          <span class="feature-arrow">↘</span>
        </article>
        <article>
          <span class="feature-number">04</span>
          <div>
            <h3>Work in the open</h3>
            <p>
              Projects are clear, versionable JSON files with schemas that
              validate resources and their relationships.
            </p>
          </div>
          <span class="feature-arrow">↘</span>
        </article>
      </div>
    </section>

    <section class="format">
      <div class="format-card">
        <div class="format-copy">
          <p class="eyebrow"><i /> Project Format v1</p>
          <h2>Your project<br />stays <em>yours.</em></h2>
          <p>
            Bonka projects are readable files, not a black box. Scenes,
            tilesets, metatiles, sprites and entities each live in their own
            JSON document, ready for source control and future tools.
          </p>
          <NuxtLink class="text-link" to="/docs/project-format"
            >Read the format specification <span>→</span></NuxtLink
          >
        </div>
        <div
          class="code-window"
          role="region"
          aria-label="Example Bonka project manifest"
        >
          <div class="code-tabs"><span>bonka.config.json</span><i /><i /></div>
          <pre><code><b>{</b>
  <span class="key">"formatVersion"</span>: <span class="value">1</span>,
  <span class="key">"name"</span>: <span class="string">"old_road"</span>,
  <span class="key">"resources"</span>: <b>{</b>
    <span class="key">"scenes"</span>: [<span class="string">"scenes/old_road.json"</span>],
    <span class="key">"tilesets"</span>: [<span class="string">"tiles/forest.json"</span>]
  <b>}</b>
<b>}</b></code></pre>
          <div class="code-valid"><i /> Schema valid</div>
        </div>
      </div>
    </section>

    <section class="cta">
      <p class="eyebrow"><i /> Start building</p>
      <h2>A small tool for<br />your next <em>world.</em></h2>
      <p>Bonka is experimental, open source, and growing in public.</p>
      <div class="hero-actions">
        <a
          class="button button-primary"
          href="https://github.com/bonka-dev/studio/releases/latest"
          target="_blank"
          rel="noreferrer"
          >Download v0.3.0 <span>↓</span></a
        ><NuxtLink class="button button-quiet" to="/docs/introduction"
          >Read the docs <span>→</span></NuxtLink
        >
      </div>
    </section>
  </main>
</template>
