---
name: git-workflow
description: Usar SIEMPRE que se vaya a crear una rama, hacer commit, mergear, abrir un PR, etiquetar un release o realizar cualquier operación git en este proyecto. Impone el modelo Gitflow y buenas prácticas de control de versiones para TallerGestordeGastos.
---

# Git Workflow (Gitflow) — TallerGestordeGastos

Este proyecto usa **Gitflow** como estándar de branching. Antes de cualquier operación git (crear rama, commitear, mergear, etiquetar), aplica las reglas de este skill.

## Modelo de ramas

- **`main`**: rama de producción. Solo recibe merges desde `release/*` o `hotfix/*`. Cada merge a `main` se etiqueta con versión semántica (`vX.Y.Z`).
- **`develop`**: rama de integración. Todo el desarrollo confluye aquí antes de preparar un release.
  > Nota: al momento de crear este skill el repo solo tiene `main`. La primera vez que se necesite `develop`, créala desde el `main` actual (`git checkout -b develop main`) y confirma con el usuario antes de pushearla.
- **`feature/<nombre-descriptivo>`**: nuevas funcionalidades (incluye refactors y renombres). Se crea desde `develop`, se fusiona de vuelta a `develop`.
- **`release/<version>`**: preparación de un release (ajustes finales, changelog, bump de versión). Se crea desde `develop`, se fusiona a `main` **y** a `develop`.
- **`hotfix/<nombre>`**: arreglos urgentes sobre producción. Se crea desde `main`, se fusiona a `main` **y** a `develop`, y se etiqueta.
- **`bugfix/<nombre>`** (opcional): bugs no urgentes detectados durante desarrollo, desde/hacia `develop`.
- **`chore/<nombre-descriptivo>`** (opcional): housekeeping que no es feature ni fix (reorganización de carpetas, configuración, plantillas). Mismas reglas que `feature/*`.

Nombrar ramas en kebab-case y descriptivo, ej. `feature/carga-de-gastos`, `hotfix/fix-calculo-total`.

## Reglas obligatorias

1. Nunca commitear directamente en `main` ni `develop`. Siempre trabajar en una rama derivada del tipo correcto.
2. Un commit = un cambio lógico coherente. No mezclar refactors con features ni con fixes.
3. Mensajes de commit siguen **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `test:`, `style:`, `perf:`), consistente con el historial existente del repo.
4. Antes de mergear/abrir PR, la rama debe estar actualizada con su base para evitar conflictos y merges innecesarios.
5. Merge de `feature/*` → `develop` preferentemente con `--no-ff` para conservar el historial de la rama.
6. Todo release se etiqueta en `main`: `git tag -a vX.Y.Z -m "..."`.
7. Nunca `git push --force` sobre `main` o `develop`. Force-push solo en ramas personales propias, avisando antes al usuario.
8. No usar `--no-verify` ni `--no-gpg-sign` salvo pedido explícito del usuario.
9. Antes de cualquier operación destructiva o difícil de revertir (`reset --hard`, borrar ramas, force-push) pedir confirmación explícita.
10. No commitear `.env`, credenciales ni `node_modules`.

## Flujo a seguir según la tarea

- **Nueva funcionalidad**: verificar rama actual → si no existe `feature/*` adecuada, crearla desde `develop` (o desde `main` si `develop` aún no existe, avisando de la situación) → trabajar y commitear ahí → al terminar, dejar la rama lista para PR (no mergear automáticamente salvo pedido explícito).
- **Hotfix**: confirmar que se parte de `main` → al finalizar, recordar que debe mergearse tanto a `main` (con tag) como a `develop`.
- **Release**: crear `release/vX.Y.Z` desde `develop` → tras aprobación, mergear a `main` (con tag) y de vuelta a `develop`.
- Si el usuario pide trabajar directamente sobre `main`/`develop` para un cambio de código, sugerir primero crear la rama correspondiente antes de proceder.

## Buenas prácticas generales

- Evitar commits tipo "WIP" o "fix stuff"; preferir commits pequeños y descriptivos.
- Revisar `git status` / `git diff` antes de cada commit para confirmar exactamente qué se incluye.
- Preferir rebase para mantener limpia una rama propia no compartida; usar merge commit (`--no-ff`) para integrar features completos a `develop`/`main`.
- No crear commits vacíos ni usar `git commit --amend` sobre commits ya compartidos/pusheados.
