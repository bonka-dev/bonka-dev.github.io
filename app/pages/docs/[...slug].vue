<script setup lang="ts">
const route = useRoute();

const { data: document } = await useAsyncData(`docs-${route.path}`, () =>
  queryCollection("docs").path(route.path).first(),
);

if (!document.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Documentation page not found",
  });
}

useSeoMeta({
  title: () => `${document.value?.title ?? "Docs"} | Bonka`,
  description: () => document.value?.description,
});
</script>

<template>
  <main class="docs-shell">
    <DocsSidebar />
    <article class="docs-content">
      <ContentRenderer v-if="document" :value="document" />
    </article>
  </main>
</template>
