<script lang="ts">
//   export let data;
   export let data: { error?: string };
</script>

<div class="min-h-screen flex items-center justify-center bg-white px-4">
  <form method="POST" class="w-full max-w-sm space-y-4">
    <h1 class="text-2xl font-bold text-center">Admin Login</h1>

    {#if data?.error}
      <p class="text-red-500 text-sm text-center">{data.error}</p>
    {/if}

    <input
      type="password"
      name="password"
      placeholder="Enter admin password"
      class="w-full border border-black px-3 py-2"
      required
    />

    <button class="w-full bg-black text-white py-2 font-semibold">
      Enter
    </button>
  </form>
</div>

