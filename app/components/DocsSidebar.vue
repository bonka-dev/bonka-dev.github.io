<script setup lang="ts">
const sections = [
  {
    title: "Start here",
    links: [
      { to: "/docs/introduction", label: "Introduction" },
      { to: "/docs/installation", label: "Installation" },
      { to: "/docs/configuration", label: "Configuration" },
    ],
  },
  {
    title: "Reference",
    links: [
      { to: "/docs/project-format", label: "Project Format v1" },
      { to: "/docs/gba-pipeline", label: "GBA pipeline" },
    ],
  },
];
</script>

<template>
  <aside class="docs-sidebar">
    <div
      v-for="section in sections"
      :key="section.title"
      class="docs-nav-group"
    >
      <p>{{ section.title }}</p>
      <NuxtLink v-for="link in section.links" :key="link.to" :to="link.to">{{
        link.label
      }}</NuxtLink>
    </div>
  </aside>
</template>
