# Módulo 2: Behavior-Driven Development (BDD)
**Duración:** 35 minutos  
**Objetivo:** Traducir las especificaciones técnicas de `SPEC.md` a escenarios de comportamiento ejecutables en sintaxis Gherkin (`Given / When / Then`).

---

## 1. Contexto Teórico

**BDD (Behavior-Driven Development)** conecta los requerimientos de negocio con las pruebas de software. Usar BDD con Claude tiene un beneficio clave:
- Le proporciona un lenguaje estructurado sin ambigüedades.
- Evita que Claude invente casos de prueba o asuma comportamientos no pactados.
- Cada escenario Gherkin se convertirá de forma directa en un caso de test unitario/funcional durante el Módulo 3.

---

## 2. Escenarios Mínimos a Cubrir

El archivo de especificación de comportamiento debe contemplar al menos cuatro escenarios:
1. **Camino Feliz:** Registro de gasto dentro del presupuesto disponible.
2. **Sobregiro:** Registro de gasto que excede el límite asignado (marca `exceededBudget: true`).
3. **Monto Inválido:** Rechazo inmediato al ingresar un monto `<= 0`.
4. **Categoría No Encontrada:** Rechazo inmediato al operar sobre una categoría inexistente.

---

## 3. Dinámica de Trabajo

### Paso 1: Ejecutar el Prompt de BDD

En la misma conversación con Claude (o referenciando `SPEC.md`), ejecuta:

```text
Basándote exclusivamente en el archivo SPEC.md previamente acordado, redacta el archivo features/create_expense.feature utilizando sintaxis formal Gherkin (Given / When / Then).

Debes cubrir de manera explícita y separada los siguientes escenarios:
1. Gasto registrado exitosamente dentro del presupuesto mensual.
2. Gasto registrado que excede el presupuesto disponible (debe marcar exceededBudget como verdadero y balance en negativo).
3. Intento de registro con monto igual a 0 o negativo (debe fallar con InvalidExpenseAmountError).
4. Intento de registro en una categoría no configurada (debe fallar con BudgetNotFoundError).

Usa valores numéricos concretos en cada escenario para que sirvan directamente como datos de prueba. No generes código de prueba todavía, únicamente el archivo .feature.
```

---

## 4. Estructura de Salida Esperada

El resultado generado por Claude debe ser similar a:

```gherkin
Feature: Registro y Control de Presupuesto de Gastos
  Como usuario del sistema
  Quiero registrar mis gastos por categoría
  Para mantener el control financiero y detectar sobregiros

  Scenario: Registro exitoso dentro del presupuesto
    Given existe un presupuesto para "Alimentacion" con limite de 300 USD y gasto acumulado de 50 USD
    When se registra un gasto de 100 USD en la categoria "Alimentacion"
    Then el gasto se guarda exitosamente
    And la propiedad "exceededBudget" es falsa
    And el gasto acumulado de "Alimentacion" pasa a ser 150 USD

  Scenario: Registro de gasto que excede el presupuesto mensual
    Given existe un presupuesto para "Salidas" con limite de 100 USD y gasto acumulado de 80 USD
    When se registra un gasto de 50 USD en la categoria "Salidas"
    Then el gasto se guarda exitosamente
    And la propiedad "exceededBudget" es verdadera
    And el gasto acumulado de "Salidas" pasa a ser 130 USD

  Scenario: Rechazo de gasto con monto invalido
    Given existe un presupuesto para "Transporte" con limite de 100 USD
    When se intenta registrar un gasto de -10 USD en la categoria "Transporte"
    Then el sistema debe arrojar el error "InvalidExpenseAmountError"
    And no se debe modificar el gasto acumulado de la categoria

  Scenario: Rechazo de gasto en categoria inexistente
    Given no existe un presupuesto configurado para "Criptomonedas"
    When se intenta registrar un gasto de 50 USD en la categoria "Criptomonedas"
    Then el sistema debe arrojar el error "BudgetNotFoundError"
```

---

## 5. Entregable y Checkpoint

1. Crea la carpeta `features/` en la raíz si no existe.
2. Guarda los escenarios en `features/create_expense.feature`.
3. Haz commit de tu avance:
   ```bash
   git add features/create_expense.feature
   git commit -m "docs(bdd): add Gherkin scenarios for expense creation"
   ```