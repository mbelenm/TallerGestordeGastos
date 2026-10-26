# ExpenseTracker Enterprise 🚀
### Sistema Inteligente de Gestión y Categorización de Gastos

Plataforma full-stack para el registro, control presupuestario y categorización predictiva de gastos mediante Machine Learning. Este proyecto está diseñado como laboratorio de referencia para la aplicación estricta de metodologías de ingeniería asistida por Inteligencia Artificial (Claude): **SDD (Spec-Driven Development)**, **BDD (Behavior-Driven Development)** y **TDD (Test-Driven Development)**.

---

## 🏛️ Arquitectura del Sistema

El proyecto está organizado como un **monorepo modular** que separa claramente la interfaz de usuario, la API RESTful, el pipeline de Machine Learning y la capa de persistencia relacional:

```text
[ Frontend: Vue 3 (Vite + Pinia + TS) ]
                     │  (Contrato OpenAPI tipado / REST)
                     ▼
[ Backend: FastAPI (Python 3.11+) ]
   ├── Capa de Presentación: Routers API v1
   ├── Capa de Dominio: Servicios y Reglas de Negocio (TDD)
   ├── Capa ML: Pipeline de Inferencia NLP (Categorización automática)
   └── Capa de Persistencia: SQLAlchemy 2.0 + Alembic (Migraciones)
                     │
                     ▼
          [ PostgreSQL / SQLite ]
```

### Componentes Principales:
1. **Frontend (`frontend/`):** SPA construida con Vue 3 (Composition API, `<script setup>`, TypeScript) y Pinia para la gestión del estado global reactivo.
2. **Backend API (`backend/`):** Microservicio asíncrono desarrollado con FastAPI y validación estricta de contratos con Pydantic v2.
3. **Persistencia & Migraciones (`backend/migrations/`):** Control de versiones del esquema de base de datos orquestado mediante Alembic y SQLAlchemy 2.0.
4. **Módulo de Machine Learning (`backend/app/ml/`):** Pipeline determinista de preprocesamiento de texto y modelo clasificador entrenado para inferir categorías de gasto a partir de su descripción natural.

---

## 🧩 Metodología de Desarrollo con Claude

Para mitigar alucinaciones de arquitectura, tests complacientes y deriva de contexto, todo el desarrollo sigue un pipeline en cascada unidireccional:

```text
[ SDD ] Especificación Técnica  ──► Define QUÉ construir, contratos OpenAPI y tipos.
   ↓
[ BDD ] Escenarios Gherkin      ──► Define CÓMO interactúan el usuario y el modelo ML.
   ↓
[ TDD ] Ciclo Red-Green-Refactor ──► Claude genera pruebas que fallan antes de programar.
   ↓
[ Código de Producción ]        ──► Lógica mínima validada por la suite de pruebas.
```

### Matriz Metodológica por Tecnología:

| Componente | SDD (Especificación) | BDD (Gherkin) | TDD (Red-Green-Refactor) |
| :--- | :--- | :--- | :--- |
| **FastAPI Core** | Pydantic Schemas y contratos de error en `docs/SPEC_BACKEND.md`. | Escenarios de endpoint HTTP (códigos 200, 201, 400, 422). | Pruebas de integración con `httpx.AsyncClient` y `pytest`. |
| **Alembic & DB** | Definición formal de tablas, constraints e índices relacionales. | Verificación de persistencia y reversión transaccional. | Tests de aplicación y rollback de migraciones (`alembic upgrade / downgrade`). |
| **Machine Learning** | Contrato de entrada/salida de inferencia y umbral de confianza mínimo (`confianza >= 0.6`). | Escenarios de predicción ("*Uber Aeropuerto*" → *Transporte*). | Pruebas unitarias de tokenización, preprocesamiento y mock de inferencia. |
| **Vue 3 UI** | Tipado TypeScript derivado del esquema OpenAPI y contratos de stores. | Flujos de usuario de formulario y alertas de sobregiro. | Pruebas de componentes con `@vue/test-utils` y `Vitest`. |

---

## 📂 Estructura del Repositorio

```text
expense-tracker-enterprise/
├── CLAUDE.md                      # Instrucciones maestras, restricciones y comandos para Claude
├── README.md                      # Documentación central del proyecto
├── docker-compose.yml             # Orquestación de servicios (Postgres, API, Frontend)
│
├── backend/                       # Backend FastAPI + ML + Alembic
│   ├── pyproject.toml             # Dependencias del backend (Poetry / uv / pip)
│   ├── alembic.ini                # Configuración de migraciones de base de datos
│   ├── migrations/                # Versiones de migración autogeneradas
│   │   ├── env.py
│   │   └── versions/
│   ├── app/
│   │   ├── main.py                # Entrada de FastAPI y configuración de CORS
│   │   ├── core/                  # Configuración de variables de entorno y DB Session
│   │   ├── models/                # Modelos ORM de SQLAlchemy (Tablas)
│   │   ├── schemas/               # Esquemas Pydantic v2 (Contratos SDD)
│   │   ├── services/              # Lógica de negocio y cálculo presupuestario (TDD)
│   │   ├── ml/                    # Módulo de Machine Learning
│   │   │   ├── pipeline.py        # Limpieza de texto y normalización
│   │   │   ├── model.py           # Inferencia desacoplada y fallback de confianza
│   │   │   └── artifacts/         # Modelo serializado (.joblib / .onnx)
│   │   └── api/                   # Routers versionados (/api/v1)
│   └── tests/                     # Suite de pruebas automatizadas
│       ├── conftest.py            # Fixtures de DB en memoria y cliente de pruebas
│       ├── unit/                  # Tests de servicios y transformaciones ML
│       ├── integration/           # Tests de endpoints de FastAPI y SQLAlchemy
│       └── bdd/                   # Escenarios ejecutables con pytest-bdd
│
├── frontend/                      # Frontend Vue 3 + TypeScript
│   ├── package.json               # Dependencias del cliente web
│   ├── vite.config.ts             # Configuración de Vite
│   ├── src/
│   │   ├── App.vue
│   │   ├── components/            # Componentes reutilizables (ExpenseForm, BudgetBar)
│   │   ├── stores/                # Estados de Pinia (useExpenseStore, useBudgetStore)
│   │   └── api/                   # Cliente HTTP tipado hacia FastAPI
│   └── tests/                     # Tests de componentes con Vitest y Vue Test Utils
│
└── docs/                          # Especificaciones inmutables del proyecto
    ├── SPEC_BACKEND.md            # Contratos de API, modelos y errores
    ├── SPEC_ML.md                 # Contratos del clasificador de texto y métricas
    ├── SPEC_FRONTEND.md           # Estructura de vistas, estados y componentes UI
    └── features/                  # Escenarios de negocio en sintaxis Gherkin (.feature)
```

---

## ⚡ Guía de Instalación y Configuración

### 1. Requisitos Previos
* **Python:** `>= 3.11`
* **Node.js:** `>= 18.0`
* **Docker & Docker Compose** (opcional para ejecución contenida de base de datos)

### 2. Configuración del Backend

```bash
# Navegar al directorio backend
cd backend

# Crear y activar entorno virtual
python -m venv .venv
source .venv/bin/activate  # En Windows: .venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones de base de datos con Alembic
alembic upgrade head

# Ejecutar el servidor de desarrollo
uvicorn app.main:app --reload --port 8000
```
La documentación interactiva de la API estará disponible en `http://localhost:8000/docs` (Swagger) y `http://localhost:8000/redoc`.

### 3. Configuración del Frontend

```bash
# Navegar al directorio frontend en una nueva terminal
cd frontend

# Instalar dependencias de Node
npm install

# Iniciar servidor de desarrollo con Vite
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173`.

---

## 🧪 Ejecución de Pruebas (TDD)

### Pruebas del Backend (PyTest)
```bash
cd backend

# Ejecutar todas las suites de prueba (unitarias, integración y BDD)
pytest

# Ejecutar únicamente pruebas unitarias de ML y lógica
pytest tests/unit/

# Ejecutar con reporte de cobertura
pytest --cov=app --cov-report=term-missing
```

### Pruebas del Frontend (Vitest)
```bash
cd frontend

# Ejecutar suite de pruebas de componentes y stores
npm run test

# Ejecutar en modo observación (watch mode)
npm run test:watch
```

---

## 🗄️ Control de Base de Datos con Alembic

Para generar y aplicar migraciones tras cambios en los modelos de SQLAlchemy:

```bash
cd backend

# 1. Crear una nueva migración detectada automáticamente
alembic revision --autogenerate -m "add prediction confidence to expenses"

# 2. Revisar manualmente el archivo generado en backend/migrations/versions/

# 3. Aplicar la migración a la base de datos
alembic upgrade head

# 4. Revertir una migración anterior (si es necesario)
alembic downgrade -1
```

---

## 🤖 Directivas de Asistencia con Claude

Cuando utilices Claude (mediante CLI, Cursor o interfaz web), consulta y mantén presente el archivo `CLAUDE.md`. Los principios obligatorios para el asistente son:

1. **Prioridad Contractual (SDD):** Nunca generes endpoints o servicios sin verificar previamente los contratos en `docs/SPEC_BACKEND.md` y `docs/SPEC_ML.md`.
2. **Ciclo TDD Obligatorio:** Toda nueva funcionalidad debe iniciar con un test fallido (`RED`). No agregues código de implementación si los tests no existen o ya están pasando.
3. **Aislamiento del Modelo ML:** El clasificador de texto debe ser una dependencia inyectada e independiente del ciclo HTTP. Durante los tests de integración, no se deben ejecutar reentrenamientos pesados.
4. **No Alucinación de Migraciones:** Las migraciones de Alembic deben generarse usando `--autogenerate` a partir de los modelos de SQLAlchemy y ser auditadas antes de su aplicación.