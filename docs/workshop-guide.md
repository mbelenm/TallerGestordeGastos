# Guía de Prompts del Taller

Sigue este orden cronológico durante el taller:

## 1. Módulo SDD (Especificación)
Pásale a Claude la descripción del problema junto con `src/models/types.ts`.
> **Prompt:**
> *"Actúa como Senior Backend Architect. Estamos en la fase SDD. Revisa el archivo `src/models/types.ts`. Necesitamos modelar la gestión de presupuestos por categoría y el registro de gastos. Genera un archivo `SPEC.md` que detalle: contratos de datos, excepciones personalizadas, validaciones de montos y la regla de negocio para gastos que superen el presupuesto disponible. No escribas código de implementación todavía."*

---

## 2. Módulo BDD (Escenarios de Negocio)
> **Prompt:**
> *"Basándote exclusivamente en `SPEC.md`, genera un archivo `features/create_expense.feature` con sintaxis Gherkin (`Given / When / Then`). Cubre:
> 1. Registro de gasto normal dentro del presupuesto.
> 2. Registro de gasto que excede el límite (debe guardarse con flag `exceededBudget: true`).
> 3. Validación de monto negativo o cero.
> 4. Gasto en una categoría no configurada."*

---

## 3. Módulo TDD - Fase RED
> **Prompt:**
> *"Toma los escenarios de `features/create_expense.feature` y escribe las pruebas unitarias correspondientes en `src/__tests__/expense_service.spec.ts`. Mantén los métodos de `ExpenseService` vacíos o lanzando `new Error('Not implemented')` para que los tests compilen pero fallen al ejecutarse. No generes la lógica de producción."*

Ejecuta en tu terminal:
```bash
npm test
```
Debe dar fallo (`RED`).

---

## 4. Módulo TDD - Fase GREEN
Copia el error exacto de Vitest en la terminal.
> **Prompt:**
> *"Aquí está el fallo de la suite de tests:
> [pegar salida de error de vitest]
> Implementa el código mínimo indispensable en `src/services/expense_service.ts` para que este test pase."*

Repite hasta que todos los tests estén en verde (`GREEN`).

---

## 5. Módulo TDD - Fase REFACTOR
> **Prompt:**
> *"Todos los tests están pasando. Revisa `src/services/expense_service.ts` para refactorizar:
> - Extrae el cálculo de excedente a una función pura.
> - Asegura inmutabilidad de los datos.
> - Mantén intactas las firmas públicas para que `npm test` continúe pasando sin tocar los tests."*
