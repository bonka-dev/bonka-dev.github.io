<script setup lang="ts">
useSeoMeta({ title: "Getting started | Bonka" });
</script>

<template>
  <main class="resource-page">
    <p class="eyebrow"><i /> First session</p>
    <h1>Start with a<br /><em>small scene.</em></h1>
    <p class="resource-intro">
      Bonka is designed for a short loop: prepare your GBA toolchain, open the
      editor, then take a scene from a PNG tileset to generated build inputs.
    </p>
    <div class="resource-grid">
      <NuxtLink class="resource-card" to="/docs/installation"
        ><span>01</span>
        <h2>Install Bonka</h2>
        <p>Set up the editor, Docker and a local Butano checkout.</p>
        <b>Read installation →</b></NuxtLink
      >
      <NuxtLink class="resource-card" to="/docs/configuration"
        ><span>02</span>
        <h2>Open a project</h2>
        <p>Create a Project Format v1 workspace and understand its files.</p>
        <b>Configure a project →</b></NuxtLink
      >
      <NuxtLink class="resource-card" to="/examples"
        ><span>03</span>
        <h2>Follow an example</h2>
        <p>
          Walk through the essential editor workflow before building your own
          world.
        </p>
        <b>Browse examples →</b></NuxtLink
      >
    </div>
  </main>
</template>
