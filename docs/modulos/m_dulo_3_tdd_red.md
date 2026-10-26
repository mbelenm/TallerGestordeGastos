# Módulo 3: Test-Driven Development (TDD) — Fase RED
**Duración:** 35 minutos  
**Objetivo:** Generar una suite de pruebas rigurosa que falle de forma controlada antes de escribir cualquier línea de lógica.

---

## 1. Contexto Teórico

### El Peligro de los Tests Complacientes
Cuando le pides a un LLM que escriba tests y código al mismo tiempo, tiende a generar **tests complacientes**: aserciones superficiales diseñadas para no fallar jamás (ej. `expect(result).toBeDefined()`), o código acoplado que engaña al coverage.

En la **Fase RED de TDD**:
- La suite de tests debe ejecutarse en tu terminal local.
- **Debe fallar.**
- Debe fallar por las razones correctas (ej. `Not implemented` o fallo de aserción), no por errores de sintaxis o TypeScript roto.

---

## 2. Dinámica de Trabajo

### Paso 1: Ejecutar el Prompt para la Suite de Pruebas

Proporciona a Claude el archivo `features/create_expense.feature` y solicita los tests:

```text
Actúa como Senior Test Engineer. Vamos a iniciar la fase RED de TDD usando Vitest y TypeScript.

Toma como entrada:
1. Los escenarios BDD de features/create_expense.feature.
2. Las interfaces de src/models/types.ts y SPEC.md.

Tu tarea:
1. Genera la suite de tests en src/__tests__/expense_service.spec.ts con Vitest. Cada escenario Gherkin debe ser un bloque `it(...)` con aserciones rigurosas sobre montos exactos, flags booleanos y errores arrojados (`expect().toThrowError(...)`).
2. Actualiza src/services/expense_service.ts ÚNICAMENTE con los métodos y clases requeridos, pero cada método debe lanzar: throw new Error('Not implemented').

REGLA CRÍTICA: No implementes ninguna lógica de negocio en expense_service.ts. Los tests deben compilar pero fallar al ejecutarse (Fase RED).
```

---

## 3. Verificación Local Obligatoria

En tu terminal ejecuta:
```bash
npm test
```

### Lo que DEBES ver:
```text
FAIL  src/__tests__/expense_service.spec.ts
  ✕ should record expense within monthly budget
    Error: Not implemented
  ✕ should flag expense when exceeding budget
    Error: Not implemented
  ✕ should throw InvalidExpenseAmountError for negative amount
    Error: Not implemented
  ✕ should throw BudgetNotFoundError for unconfigured category
    Error: Not implemented

Tests:       4 failed, 4 total
```

### ⚠️ Señales de Alerta (Red Flags):
- **Si algún test pasa:** El test está mal diseñado (aserciones vacías o falsos positivos).
- **Si hay error de compilación TypeScript:** Corrige las firmas tipadas antes de continuar; los tests deben fallar en runtime, no en compilación.

---

## 4. Entregable y Checkpoint

1. Verifica que los 4 tests existan y fallen con `Not implemented`.
2. Realiza el commit en Git:
   ```bash
   git add src/__tests__/expense_service.spec.ts src/services/expense_service.ts
   git commit -m "test(tdd): add failing test suite for expense operations (RED)"
   ```