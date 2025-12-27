<script lang="ts">
  export let categories;
  export let active = 'all';
</script>

<div class="flex justify-center gap-6 border-b border-black pb-2 mb-6 overflow-x-auto">
  <button
    class="font-semibold"
    on:click={() => (active = 'all')}
  >
    All
  </button>

  {#each categories as c}
    <button
      class="font-semibold capitalize"
      on:click={() => (active = c.id)}
    >
      {c.title}
    </button>
  {/each}
</div>
