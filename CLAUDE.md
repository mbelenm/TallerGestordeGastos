# ExpenseTracker - Instrucciones del Proyecto para Claude

Este repositorio sigue una metodología estricta de ingeniería asistida por IA: **SDD -> BDD -> TDD**.

## Comandos del Proyecto
- **Ejecutar tests:** `npm test`
- **Tests en modo watch:** `npm run test:watch`
- **Compilar TypeScript:** `npm run build`

## Reglas de Comportamiento para Claude
1. **Fase SDD (Especificación):**
   - No generes código de producción hasta que la especificación en `SPEC.md` esté acordada y validada.
   - Modela interfaces rigurosas, tipos inmutables y manejo de errores explícito.

2. **Fase BDD (Comportamiento):**
   - Transforma los requisitos del negocio en escenarios Gherkin (`Given / When / Then`).
   - Define explícitamente escenarios felices, bordes y casos de error.

3. **Fase TDD (Ciclo Red-Green-Refactor):**
   - **RED:** Escribe solo tests que fallen. Si te piden un test, implementa solo los stubs mínimos (métodos vacíos que lanzan `Error('Not implemented')`) para que el archivo compile pero falle en ejecución.
   - **GREEN:** Escribe el código mínimo y suficiente para pasar el test que falló. No agregues features extra ni sobreingeniería.
   - **REFACTOR:** Limpia el código, elimina duplicación y aplica principios SOLID sin romper las firmas públicas ni los tests existentes.
   - **Sin over-mocking:** Si una prueba puede resolverse con estructuras en memoria o funciones puras, NO crees mocks innecesarios.
