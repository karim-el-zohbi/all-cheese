<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import CategoryNav from '$lib/components/CategoryNav.svelte';
  import { categories } from '$lib/data/menu';

  let active = 'all';
</script>

<Container>
  <h1 class="text-3xl font-bold text-center mb-6">ALL CHEESE</h1>
    <!-- <img
          src=""
          alt="ALL CHEESE"
          class="w-full rounded-md mb-4"
        /> -->
 
  <CategoryNav {categories} bind:active />

  {#each categories as category}
    {#if active === 'all' || active === category.id}
      <section class="mb-10">
        <div class="border-t border-black pt-4 mb-4">
          <h2 class="text-xl font-semibold">{category.title}</h2>
        </div>

        <img
          src={category.image}
          alt={category.title}
          class="w-full rounded-md mb-4"
        />

        <ul class="space-y-2">
          {#each category.items as item}
            <li class="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </li>
          {/each}
        </ul>
      </section>
    {/if}
  {/each}
</Container>
