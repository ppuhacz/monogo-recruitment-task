<script lang="ts">
  import Button from "$components/button/button.svelte";
  import Modal from "$components/modal/modal.svelte";
  import { query } from "$lib/api/api";
  import type { QueryResponse } from "$lib/api/api.types";

  const ERROR_KEYS = {
    "currently-loading": "Błąd serwera. Poczekaj chwilę i spróbuj ponownie.",
    "unknown-error": "Wystąpił nieznany błąd. Spróbuj ponownie za chwilę.",
    "incorrect-value": "Tekst musi mieć mniej niż 500 znaków.",
  };

  let showModal: boolean = $state(false);
  let value: string = $state("");
  let showError: boolean = $state(false);
  let errorText: string = $state("");
  let responseList: QueryResponse[] = $state([
    {
      label: "",
      score: 0,
    },
  ]);
  let isLoading: boolean = $state(false);
  let disabled: boolean = $state(false);

  function handleSubmit(event: Event) {
    event.preventDefault();
    showError = false;
    if (value && value.length < 500) {
      isLoading = true;
      query({ inputs: value })
        .then((response) => {
          if ("error" in response) {
            if (response.error.includes("currently-loading")) {
              errorText = ERROR_KEYS["currently-loading"];
            } else {
              errorText = ERROR_KEYS["unknown-error"];
            }
            showError = true;
            isLoading = false;
          } else {
            responseList = response[0] as unknown as QueryResponse[];
            showModal = true;
            isLoading = false;
          }
        })
        .catch(() => {
          errorText = ERROR_KEYS["unknown-error"];
          showError = true;
          isLoading = false;
        });
    } else {
      showError = true;
      errorText = ERROR_KEYS["incorrect-value"];
    }
  }
</script>

<article class:isLoading class:showModal>
  <div>
    <h1>Analizator tekstu</h1>
    <p class="description">
      DistilBERT Sentiment Analyzer to lekki i szybki model sztucznej
      inteligencji do analizy sentymentu tekstu. Klasyfikuje on wpisy jako
      pozytywne lub negatywne, pomagając w interpretacji opinii klientów,
      komentarzy w mediach społecznościowych i recenzji. Idealny do
      monitorowania nastrojów użytkowników i analizy tekstu w czasie
      rzeczywistym.
    </p>
  </div>
  <div>
    <form onsubmit={handleSubmit} class="form-wrapper">
      <div class="input-wrapper">
        <input required type="text" bind:value id="word" />
        <label for="word">Podaj tekst</label>
        {#if showError}
          <div class="error">{errorText}</div>
        {/if}
      </div>
      <Button type="submit" {disabled}>Analizuj</Button>
    </form>
  </div>
</article>
{#if showModal}
  <Modal bind:showModal {responseList} />
{/if}
{#if isLoading}
  <div class="loading">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
{/if}

<style>
  article {
    padding: 20px;
    background-color: #222831;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 80%;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 #0000003f;
    z-index: 1;
  }

  .form-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    .input-wrapper {
      position: relative;
      width: 100%;
    }
    & input[type="text"] {
      position: relative;
      border: none;
      border-bottom: 1px solid #eeeeee3f;
      background-color: transparent;
      fill: none;
      outline: none;
      color: #eeeeee;
      padding: 10px 0;
      margin: 30px 0;
      transition: 0.25s;
      width: 100%;
    }

    & label {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      opacity: 0.5;
      transition: 0.15s;
    }

    & label:hover {
      cursor: text;
    }

    & input[type="text"]:focus {
      border-bottom: 1px solid #00adb5;

      & ~ label {
        opacity: 1;
        top: calc(50% - 25px);
        font-size: 0.75rem;
        color: #00adb5;
      }
    }

    & input[type="text"]:valid {
      border-bottom: 1px solid #00adb5;

      & ~ label {
        opacity: 1;
        top: calc(50% - 25px);
        font-size: 0.75rem;
        color: #00adb5;
      }
    }
  }

  .error {
    position: absolute;
    bottom: 5px;
    color: #ff1a1a;
  }

  .isLoading {
    opacity: 0.33;
    pointer-events: none;
  }

  .showModal {
    filter: blur(7px);
    pointer-events: none;
  }

  .loading {
    z-index: 5;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: #222831;
    border-radius: 15px;
    box-shadow: 0 0 10px 0 #0000003f;
  }

  .dot {
    width: 6px;
    height: 6px;
    margin-left: 3px;
    background-color: #eeeeee;
    border-radius: 50%;
    display: inline-block;
    animation: dot-blink 1.4s infinite forwards;
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes dot-blink {
    0%,
    80%,
    100% {
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
  }

  .description {
    text-align: justify;
  }

  /*  autofill styles */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #222831 inset !important;
    -webkit-background-clip: text;
    -webkit-text-fill-color: #fff;
  }

  @media screen and (min-width: 1024px) {
    article {
      padding: 120px;
      max-width: 800px;
    }

    .form-wrapper {
      & input[type="text"] {
        width: 450px;
      }
    }
  }
</style>
