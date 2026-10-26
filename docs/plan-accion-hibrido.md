# Plan de Acción: Taller Híbrido "Enjambre Guiado"
**Metodología:** SDD + BDD + TDD con Claude (ExpenseTracker Core)  
**Duración:** 3 horas (180 minutos)  
**Modalidad:** Híbrida (Plenaria grupal + Hands-on en duplas/individual)

---

## 1. Visión General del Modelo Híbrido

El modelo **"Enjambre Guiado"** optimiza el tiempo y maximiza el aprendizaje:
- **Fase Colectiva (Calibración):** El grupo define y congela la arquitectura (`SPEC.md`) para que todos partan de la misma base inmutable.
- **Fase Descentralizada (Fricción con la IA):** Cada persona o dupla enfrenta individualmente a Claude en las etapas de BDD y TDD, viviendo los desvíos, aserciones débiles y correcciones de código en su propio entorno.
- **Cierre Colectivo (Retrospectiva & Benchmark):** Se comparan implementaciones generadas por la IA para identificar anti-patrones y buenas prácticas.

```text
  [ PLENARIA ] ────────► [ ENJAMBRE DESCENTRALIZADO ] ────────► [ PLENARIA ]
  Módulo 0 y 1           Módulos 2, 3 y 4                      Módulo 5
  Setup & SDD            BDD, TDD (Red, Green, Refactor)       Retrospectiva
  (Todos juntos)         (Individual o Duplas en su máquina)   (Puesta en común)
```

---

## 2. Matriz de Roles y Tiempos

| Tiempo | Bloque | Modalidad | Foco del Alumno | Rol del Facilitador |
| :--- | :--- | :--- | :--- | :--- |
| **00:00 - 00:20** | **Setup & Kickoff** | Plenaria | Clonar repo, `npm install`, verificar que `npm test` falla. | Guiar descompresión, resolver trabas de entorno Node/npm. |
| **00:20 - 00:55** | **Módulo 1: SDD Colectivo** | Plenaria participativa | Debatir decisiones de diseño de tipos, proponer restricciones. | Compartir pantalla, promptear en vivo a Claude, congelar `SPEC.md`. |
| **00:55 - 01:25** | **Módulo 2: BDD Autónomo** | Individual / Duplas | Redactar prompt BDD, generar `create_expense.feature`. | Recorrer mesas/canales, verificar que no inventen lógica fuera de `SPEC.md`. |
| **01:25 - 01:55** | **Módulo 3: TDD RED** | Individual / Duplas | Lograr tests en rojo (`Not implemented`) en Vitest. | **Control crítico:** Asegurar que ningún test pase prematuramente. |
| **01:55 - 02:40** | **Módulo 4: TDD GREEN & REFACTOR** | Individual / Duplas | Alimentar a Claude con trazas de error terminal; refactorizar SRP. | Ayudar a destrabar loops alucinatorios de Claude si ocurren. |
| **02:40 - 03:00** | **Módulo 5: Retrospectiva** | Plenaria | Presentar código, comparar soluciones y fallos. | Moderar benchmark de código y cerrar con los 5 Mandamientos. |

---

## 3. Plan de Acción Detallado por Fases

### Fase I: Arranque y Alineación Colectiva (00:00 - 00:55)

#### 1. Setup Express (20 min)
* **Objetivo:** Garantizar paridad técnica.
* **Acción de los alumnos:**
  1. Clonar/descomprimir el repositorio `expense-tracker-workshop`.
  2. Ejecutar `npm install && npm test`.
  3. Confirmar que el test inicial falla con `Error: Not implemented`.
* **Regla:** Quien no tenga entorno funcional antes del minuto 20 se suma en *Pair Programming* como "Navigator" con un compañero.

#### 2. Módulo 1 — SDD en Plenaria (35 min)
* **Objetivo:** Aprender colectivamente a poner límites a Claude antes de pedir código.
* **Dinámica:**
  1. El facilitador proyecta su sesión de Claude y abre `src/models/types.ts`.
  2. Lanza el **Prompt Oficial de SDD** (de `docs/modulo-1-sdd.md`).
  3. **Intervención del grupo:**
     - El facilitador pregunta: *"¿Qué cosas intentó agregar Claude que no estaban en los requerimientos?"*
     - El grupo audita si Claude inventó métodos innecesarios (ej. persistencia en BD, endpoints HTTP).
  4. El facilitador itera el prompt hasta obtener un `SPEC.md` limpio y conciso.
  5. **Hito de corte:** El facilitador comparte el `SPEC.md` final por chat/commit oficial. **Todos los participantes copian este archivo exacto en su raíz.**

---

### Fase II: Enjambre Descentralizado (00:55 - 02:40)

*Cada alumno o dupla trabaja de forma autónoma con su propia sesión de Claude.*

#### 3. Módulo 2 — BDD (30 min)
* **Consigna individual:** A partir del `SPEC.md` oficial, pedir a Claude los 4 escenarios en formato Gherkin dentro de `features/create_expense.feature`.
* **Foco de atención:**
  - Los alumnos deben verificar que Claude incluya datos numéricos concretos (ej. 100 USD, 50 USD) y no variables abstractas (`<amount>`).
* **Hito de entrega:** Commit local: `docs(bdd): add Gherkin scenarios for expense creation`.

#### 4. Módulo 3 — TDD Fase RED (30 min)
* **Consigna individual:** Exigir a Claude la suite Vitest en `src/__tests__/expense_service.spec.ts` y las firmas con `throw new Error('Not implemented')` en `src/services/expense_service.ts`.
* **Trampa habitual a vigilar:**
  - Claude intentará rellenar la lógica del servicio para "ayudar".
  - **Acción requerida:** El alumno debe rechazar la respuesta y exigir únicamente los stubs.
* **Criterio de éxito:** Ejecutar `npm test` en la consola local y ver **4 tests en fallo controlado**.
* **Hito de entrega:** Commit local: `test(tdd): add failing test suite (RED)`.

#### 5. Módulo 4 — TDD Fase GREEN & REFACTOR (45 min)
* **Consigna individual:**
  - **GREEN (25 min):** Pasar a Claude el stack trace literal de la terminal para resolver un test a la vez hasta tener la suite completa en verde.
  - **REFACTOR (20 min):** Ordenar el código pidiendo separar la validación de montos y el cálculo de balance en funciones puras sin romper ningún test.
* **Hito de entrega:** Commits locales:
  - `feat(service): pass all tests with minimal implementation (GREEN)`
  - `refactor(service): decouple pure calculations and enforce SRP (REFACTOR)`

---

### Fase III: Puesta en Común y Cierre (02:40 - 03:00)

#### 6. Módulo 5 — Retrospectiva y Benchmark (20 min)
* **Dinámica:**
  1. Se seleccionan 3 participantes al azar para proyectar su `expense_service.ts` y su archivo de tests.
  2. **Preguntas guía de auditoría:**
     - *¿La suite de tests de la Dupla A corre en la implementación de la Dupla B?* (Prueba de oro de interoperabilidad basada en `SPEC.md`).
     - *¿A quién le generó Claude funciones de más de 30 líneas?*
     - *¿Alguien sufrió alucinaciones de nombres de propiedades durante el refactor?*
  3. Cierre con la síntesis de los **5 Mandamientos del Desarrollo con Claude**.

---

## 4. Guía de Intervención para el Facilitador (Troubleshooting)

| Situación en sala | Causa raíz | Instrucción al alumno |
| :--- | :--- | :--- |
| **"El test pasa de inmediato sin escribir código"** | Claude escribió aserciones vacías o complacientes (`toBeDefined`). | Forzar aserción estricta sobre valores numéricos (`toBe(150)`). |
| **"Claude empezó a escribir código en TypeScript dentro de SPEC.md"** | Falta de restricción negativa en el prompt. | Indicar: *"Detente. Elimina todo bloque de código TypeScript ejecutable. Limítate a interfaces Markdown."* |
| **"Claude entra en un bucle de error al refactorizar"** | La ventana de contexto se saturó de código viejo. | Abrir un chat nuevo, adjuntar `SPEC.md`, `expense_service.spec.ts` y el código actual, y pedir el refactor desde un contexto limpio. |
| **"Un alumno se queda atrás en el módulo 2"** | Dificultad para estructurar el prompt BDD. | Proveerle el archivo `features/create_expense.feature` estándar del repositorio y avanzar directo al Módulo 3. |

---

## 5. Checklist de Preparación Previa al Taller

- [ ] Repositorio base subido a GitHub (público) o distribuido en `.zip`.
- [ ] Node.js `>= 18` verificado en las máquinas de los asistentes.
- [ ] Créditos o accesos activos a Claude (Claude Pro, Claude Code CLI o Cursor con Sonnet).
- [ ] Canal de comunicación listo para compartir snippets (`SPEC.md` congelado) durante la plenaria.