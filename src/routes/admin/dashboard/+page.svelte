<script lang="ts">
import Container from '$lib/components/Container.svelte';
  // import { categories } from '$lib/data/menu';
  // This receives the data returned from +page.server.ts `load` function
  export let data: { categories: typeof import('$lib/data/menu').categories };

  // Use this variable inside your page
  let categories = data.categories;

  // Optional: for new item form
  let newItem = {
    name: '',
    price: '',
    category: categories[0]?.id
  };
</script>
<Container>
  <h1 class="text-2xl font-bold text-center mb-6">Admin Menu Editor</h1>

  <!-- Add New Item form -->
  <form method="POST" class="border border-black p-4 mb-8 space-y-3">
    <h2 class="font-semibold">Add New Item</h2>

    <input name="name" placeholder="Item name" class="w-full border px-2 py-1" required />
    <input name="price" type="number" placeholder="Price" class="w-full border px-2 py-1" required />

    <select name="category" class="w-full border px-2 py-1">
      {#each categories as c}
        <option value={c.id}>{c.title}</option>
      {/each}
    </select>

    <button name="action" value="add" class="bg-black text-white px-4 py-2">
      Add Item
    </button>
  </form>

  <!-- Existing items below -->


  <!-- EXISTING ITEMS -->
  
 {#each categories as category}
  <section class="mb-8">
    <h2 class="font-semibold border-b border-black mb-3">{category.title}</h2>

    {#each category.items as item, index}
      <div class="flex gap-3 mb-2 items-center">
        <!-- Item name -->
        <input
          type="text"
          bind:value={item.name}
          class="flex-1 border px-2 py-1"
        />

        <!-- Item price -->
        <input
          type="number"
          bind:value={item.price}
          class="w-24 border px-2 py-1"
        />

        <!-- Edit button -->
        <button
          type="submit"
          name="action"
          value="edit"
          class="bg-yellow-500 text-white px-3 py-1"
          formmethod="post"
          formaction="?categoryId={category.id}&itemIndex={index}"
        >
          Edit
        </button>

        <!-- Delete button -->
        <button
          type="submit"
          name="action"
          value="delete"
          class="bg-red-500 text-white px-3 py-1"
          formmethod="post"
          formaction="?categoryId={category.id}&itemIndex={index}"
        >
          Delete
        </button>
      </div>
    {/each}
  </section>
{/each}
</Container>

