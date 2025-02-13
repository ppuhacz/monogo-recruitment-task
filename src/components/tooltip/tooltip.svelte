<script lang="ts">
  import info from "$assets/info.svg";
  const { children } = $props();
</script>

<div class="tooltip-wrapper">
  <div class="tooltip">
    <img src={info} alt="info" class="info-icon" height={15} />
    <div class="tooltip-content">
      <p>{@render children()}</p>
    </div>
  </div>
</div>

<style>
  .tooltip-wrapper {
    position: relative;
    display: inline-block;
  }

  .tooltip {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 5;
  }

  .tooltip-content {
    display: none;
    position: absolute;
    background-color: #222831;
    box-shadow: 0 0 10px 0 #0000008f;
    color: #eeeeee;
    border-radius: 5px;
    padding: 10px;
    z-index: 11;
  }

  .tooltip-content p {
    margin: 0;
  }

  .tooltip:hover .tooltip-content {
    display: block;
  }

  .tooltip .tooltip-content {
    top: 120%;
    left: 0;
  }
</style>
