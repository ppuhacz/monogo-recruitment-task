<script lang="ts">
  import Button from "$components/button/button.svelte";
  import positive from "$assets/positive.svg";
  import negative from "$assets/negative.svg";
  import type { ModalProps } from "./modal.types";
  import Tooltip from "$components/tooltip/tooltip.svelte";

  let { showModal = $bindable(), responseList }: ModalProps = $props();
</script>

<div class="modal-container">
  <div class="modal-wrapper">
    <h2>Wyniki analizy</h2>
    <p>Twoja wiadomość została sklasyfikowana jako:</p>
    <ul>
      {#each responseList as { label, score }}
        <li>
          <span class={label === "POSITIVE" ? "positive" : "negative"}>
            {#if label === "POSITIVE"}
              <Tooltip>
                Prawdopodobieństwo, że Twój tekst ma pozytywny wydźwięk
              </Tooltip>
              Pozytywna <img src={positive} alt="positive" height={15} />
            {:else}
              <Tooltip>
                Prawdopodobieństwo, że Twój tekst ma negatywny wydźwięk
              </Tooltip>
              Negatywna <img src={negative} alt="negative" height={15} />
            {/if}
          </span>
          <span>{score}</span>
        </li>
      {/each}
    </ul>
    <p class="tip">
      Jeżeli chcesz żeby Twój tekst był bardziej pozytywny, spróbuj użyć
      bardziej pozytywnych słów i zamień negatywne na pozytywne, np zamiast
      "Aplikacja nie działa" użyj "Aplikacja wymaga poprawy".
    </p>

    <div class="modal-button">
      <Button onclick={() => (showModal = false)}>Wróć</Button>
    </div>
  </div>
</div>

<style>
  .modal-container {
    position: absolute;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #222831;
    padding: 50px;
    width: 100%;
    height: 100vh;
    border-radius: 15px;
    box-shadow: 0 0 15px 0 #0000003f;
    color: #fff;

    & ul {
      list-style: none;
      padding: 0;

      & li {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7px;
      }
    }
  }

  .modal-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 0 20px;
  }

  .positive {
    color: #00adb5;
  }

  .negative {
    color: #ff5722;
  }

  h2 {
    font-size: 2rem;
    font-weight: 800;
  }
  p {
    margin: 5px;
  }

  .tip {
    text-align: justify;
    margin-bottom: 20px;
  }

  @media screen and (min-width: 1024px) {
    .modal-container {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 120px;
      max-width: 800px;
      height: auto;
    }
  }
</style>
