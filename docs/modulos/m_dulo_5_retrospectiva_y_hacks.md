# Módulo 5: Retrospectiva, Sesgos y Hacks con Claude
**Duración:** 20 minutos  
**Objetivo:** Analizar los sesgos del modelo, puntos de fricción durante el taller y consolidar buenas prácticas de ingeniería asistida por IA.

---

## 1. Puntos de Discusión en Grupo

Revisa con tu equipo o reflexiona sobre estas preguntas:

### A. ¿Hubo intentos de "Over-Mocking"?
- ¿En algún momento Claude intentó introducir librerías de mocks complejas para simular repositorios o bases de datos cuando un simple `Map<string, Budget>` en memoria era suficiente?
- **Lección:** Especificar siempre en `SPEC.md` las dependencias permitidas y la persistencia requerida (in-memory, Postgres, etc.).

### B. ¿Detectaron tests complacientes?
- ¿Claude propuso alguna aserción como `expect(expense).toBeDefined()` o `expect(true).toBe(true)` en lugar de evaluar montos y booleanos exactos?
- **Lección:** BDD en Gherkin con valores numéricos concretos (`100 USD`, `30 USD`) mitiga este sesgo al obligar a aserciones con `toBe(130)`.

### C. Deriva de Contexto (Context Drift)
- ¿Claude intentó renombrar variables durante la refactorización (ej. cambiar `monthlyLimit` por `limit`)?
- **Lección:** La importancia de mantener `SPEC.md` anclado y explícitamente recordarle al modelo que las firmas públicas son inmutables.

---

## 2. Los 5 Mandamientos del Desarrollo con Claude

| # | Regla | Motivo |
| :--- | :--- | :--- |
| **1** | **El Terminal manda** | Nunca debatas con Claude en lenguaje natural si un código funciona; pásale el *stdout* o *stderr* directo de tu consola. |
| **2** | **Un paso a la vez** | Separa prompts: jamás pidas "Arquitectura + Tests + Código" en un único turno de conversación. |
| **3** | **Ancla inmutable (`SPEC.md`)** | En conversaciones largas, vuelve a pegar o referenciar `SPEC.md` para evitar que olvide contratos iniciales. |
| **4** | **Tests primero, siempre** | Si Claude escribe el código antes de la prueba, la prueba será diseñada para que el código pase, no para validar el requerimiento. |
| **5** | **`CLAUDE.md` en la raíz** | Configura siempre comandos de ejecución (`npm test`, `npm run lint`) y restricciones en la raíz para agentes como Claude Code. |

---

## 3. Historial de Git Esperado al Finalizar

Al concluir los 5 módulos, el historial de Git del participante debe verse así:

```bash
git log --oneline
```

```text
* a1b2c3d refactor(service): clean up expense logic and extract pure calculation helpers (REFACTOR)
* e4f5g6h feat(service): implement minimal expense logic to pass tests (GREEN)
* i7j8k9l test(tdd): add failing test suite for expense operations (RED)
* m0n1o2p docs(bdd): add Gherkin scenarios for expense creation
* q3r4s5t docs(sdd): define SPEC.md for ExpenseBudgetService contracts
* u6v7w8x chore: initial project scaffolding with vitest and types
```