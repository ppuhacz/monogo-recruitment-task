<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>Monogo</title>
  <meta name="description" content="Monogo recruitment task" />
</svelte:head>
<div class="app">
  <main>
    {@render children()}
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    min-width: 100vw;
    box-sizing: border-box;
    background-color: #1b2027;
    color: #eeeeee;
  }

  main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
  }
</style>
