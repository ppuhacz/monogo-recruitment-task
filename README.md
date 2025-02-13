# Monogo Recruitment Task

## Instrukcja uruchomienia projektu

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/ppuhacz/monogo-recruitment-task.git
   cd monogo-recruitment-task
   ```

2. Zainstaluj zależności:

   ```bash
   pnpm install
   ```

3. Uruchom projekt:

   ```bash
   pnpm run dev
   ```

4. Otwórz przeglądarkę i przejdź do `http://localhost:5173`.

## Technologia

Projekt został zbudowany przy użyciu następujących technologii:

- **Svelte / SvelteKit**
- **TypeScript**
- **Vite**
- **Jest**
- **Hugging Face API**
- **prettier**
- **eslint**
- **pnpm**

## Analiza wyzwań

Podczas realizacji zadania napotkałem kilka wyzwań:

1. **Integracja z API Hugging Face**: Konieczność obsługi różnych typów odpowiedzi z API, w tym błędów serwera i poprawnych wyników analizy sentymentu.
2. **Typowanie w TypeScript**: Zapewnienie poprawnego typowania dla danych wejściowych i wyjściowych z API, co wymagało zdefiniowania odpowiednich typów, różnych dla poprawnego zapytania i erroru.
3. **Obsługa błędów**: Implementacja mechanizmów obsługi błędów, aby użytkownik był informowany o problemach z serwerem lub niepoprawnych danych wejściowych.

Pomimo tych wyzwań, udało się zrealizować zadanie i stworzyć funkcjonalną aplikację do analizy sentymentu tekstu.
