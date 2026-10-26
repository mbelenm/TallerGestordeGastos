# Módulo 1: Spec-Driven Development (SDD)
**Duración:** 45 minutos  
**Objetivo:** Establecer el contrato formal de arquitectura y tipos antes de escribir cualquier código de implementación.

---

## 1. Contexto Teórico

El error más común al programar con LLMs como Claude es saltar de un requerimiento informal directo a pedir código ("*hazme una función que registre gastos*"). Esto provoca:
- Firmas de funciones inconsistentes.
- Falta de validación en casos de borde.
- Acoplamiento prematuro a implementaciones específicas (ej. bases de datos cuando bastaba una estructura en memoria).

Con **SDD (Spec-Driven Development)**, obligamos a Claude a adoptar el rol de arquitecto de software y documentar formalmente las interfaces, modelos y restricciones en un archivo inmutable (`SPEC.md`). Este archivo servirá como ancla de verdad para los módulos posteriores.

---

## 2. Requerimientos del Dominio (`ExpenseBudgetService`)

Debes guiar a Claude para especificar el servicio central de gastos con estas reglas:
1. **Presupuestos por Categoría:** Cada categoría tiene un `monthlyLimit` y un `currentSpent`.
2. **Validación de Importe:** El importe de cualquier gasto debe ser estrictamente mayor a 0 y no ser `NaN`. De lo contrario, lanza `InvalidExpenseAmountError`.
3. **Categoría Existente:** Si se intenta registrar un gasto en una categoría sin presupuesto configurado, lanza `BudgetNotFoundError`.
4. **Regla de Sobregiro:** Si el gasto supera el saldo restante (`currentSpent + amount > monthlyLimit`), el gasto **NO se rechaza**; se guarda exitosamente, pero con `exceededBudget: true` y recalculando el balance en negativo.

---

## 3. Dinámica de Trabajo

### Paso 1: Alimentar el Contexto
Abre un nuevo chat con Claude y adjunta o pega el contenido de `src/models/types.ts`.

### Paso 2: Ejecutar el Prompt de Arquitectura

Copia y envía este prompt:

```text
Actúa como Senior Backend Architect. Estamos iniciando la fase de SDD (Spec-Driven Development) para el servicio ExpenseBudgetService en TypeScript.

Revisa el archivo adjunto src/models/types.ts. Diseña una especificación técnica formal y rigurosa en formato Markdown para documentar en SPEC.md.

La especificación debe contener obligatoriamente:
1. Domain Entities & Value Objects: Contratos de interfaces inmutables para Budget, ExpenseInput y ExpenseRecord.
2. Jerarquía de Errores: Definición de InvalidExpenseAmountError y BudgetNotFoundError con códigos de error asociados.
3. Service Interface: Firmas tipadas para recordExpense, getBudget, getAllExpenses y setBudget.
4. Reglas de Validación y Casos de Borde: Decimales, montos menores o iguales a cero, categorías inexistentes y sobregiros.
5. Invariantes de Estado: Reglas inmutables que deben cumplirse tras cada operación exitosa o fallida.

REGLA CRÍTICA: No escribas código de implementación dentro de las funciones ni lógica ejecutable. Únicamente la especificación técnica y las firmas de TypeScript.
```

---

## 4. Revisión Crítica del Resultado

Antes de aceptar la respuesta de Claude, verifica:
- [ ] **¿Generó código de implementación?** Si escribió cuerpos de funciones (con `if`, bucles o `Map`), pídele que los elimine y se limite a contratos.
- [ ] **¿Tipado estricto?** Asegúrate de que no haya `any` ni tipos implícitos.
- [ ] **¿Contrato de sobregiro claro?** Debe estar documentado explícitamente que `exceededBudget` es un booleano y que el gasto sí se persiste.

---

## 5. Entregable y Checkpoint

1. Guarda el resultado generado en la raíz del proyecto como `SPEC.md`.
2. Ejecuta en tu terminal:
   ```bash
   git add SPEC.md
   git commit -m "docs(sdd): define SPEC.md for ExpenseBudgetService contracts"
   ```
3. Verifica que `src/services/expense_service.ts` permanezca solo con stubs vacíos antes de avanzar al Módulo 2.