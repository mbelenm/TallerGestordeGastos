# Módulo 4: TDD — Fases GREEN y REFACTOR
**Duración:** 45 minutos  
**Objetivo:** Implementar la lógica mínima para pasar los tests y luego refactorizar aplicando código limpio y principios SOLID.

---

## 1. Fase 1: Ciclo GREEN (Hacer que pase)

En la fase Green, **no optimizamos de más**. Buscamos que Claude escriba la mínima implementación necesaria guiándose exclusivamente por la traza de fallos de la terminal.

### Dinámica por Iteración:
1. Ejecuta `npm test` en tu consola.
2. Copia la traza de error del test que falló.
3. Envíaselo a Claude con el siguiente prompt:

```text
Estamos en la fase GREEN de TDD para src/services/expense_service.ts.
Actualmente el test arroja el siguiente error en consola:

[PEGAR AQUÍ EL ERROR DE TERMINAL]

Implementa el código mínimo indispensable en src/services/expense_service.ts para resolver este error específico y hacer pasar la prueba.
No modifiques los archivos de prueba.
```

4. Aplica el código y vuelve a ejecutar:
   ```bash
   npm test
   ```
5. Repite el proceso hasta que todos los tests estén en verde:
   ```text
   PASS  src/__tests__/expense_service.spec.ts
   ✓ should record expense within monthly budget (2 ms)
   ✓ should flag expense when exceeding budget (1 ms)
   ✓ should throw InvalidExpenseAmountError for negative amount (1 ms)
   ✓ should throw BudgetNotFoundError for unconfigured category (1 ms)

   Tests:       4 passed, 4 total
   ```

6. Commit de la fase Green:
   ```bash
   git add src/services/expense_service.ts
   git commit -m "feat(service): implement minimal expense logic to pass tests (GREEN)"
   ```

---

## 2. Fase 2: Ciclo REFACTOR (Hacerlo limpio)

Con la suite 100% en verde, tenemos una red de seguridad infalible. Ahora le pedimos a Claude mejorar la calidad interna del código **sin tocar el comportamiento externo**.

### Prompt para Refactorización:

```text
Actúa como Senior Software Craftsman.
Todos los tests en src/__tests__/expense_service.spec.ts están pasando al 100%.

Revisa src/services/expense_service.ts y realiza un refactor siguiendo estos lineamientos:
1. Aplica el Principio de Responsabilidad Única (SRP): extrae el cálculo de balances y la detección de sobregiro a funciones puras auxiliares.
2. Inmutabilidad: asegúrate de no mutar objetos directamente; devuelve copias seguras.
3. Legibilidad y Tipado: asegura nombres expresivos y manejo limpio de errores sin usar casts ('as any').

REGLAS ESTRICTAS:
- No cambies los contratos de interfaces públicas definidas en SPEC.md.
- No modifiques src/__tests__/expense_service.spec.ts.
- Todos los tests deben seguir pasando al terminar.
```

---

## 3. Verificación Post-Refactor

1. Ejecuta nuevamente la suite:
   ```bash
   npm test
   ```
2. Si algún test se rompe, revierte o indícale a Claude la regresión exacta.
3. Ejecuta el linter:
   ```bash
   npm run lint # si está configurado
   ```
4. Realiza el commit final:
   ```bash
   git add src/services/expense_service.ts
   git commit -m "refactor(service): clean up expense logic and extract pure calculation helpers (REFACTOR)"
   ```