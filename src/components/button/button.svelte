<script lang="ts">
  import type { ButtonProps } from "./button.types";

  const {
    disabled,
    type = "button",
    onclick,
    children,
  }: ButtonProps = $props();
</script>

<button {disabled} {type} {onclick}>
  {@render children()}
</button>

<style>
  button {
    background-color: transparent;
    outline: none;
    border: none;
    padding: 10px 30px;
    color: #eee;
    border: 1px solid #00adb5;
    border-radius: 3px;
    margin-bottom: 20px;
    transition: 0.1s;
  }

  button:hover {
    background-color: #00adb5;
    color: #222831;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.33;
  }
</style>
