# REP Admin — dominio, módulos y contrato mock-first

Documentación derivada de **solo lectura** sobre `realestate-back` (routers, entidades, convenciones) y el producto portal. **No modifica backend.** El admin (`admin-rep`) consume en esta fase **repositorios mock** y define contratos listos para futuras rutas `/admin/*`.

---

## 1. Mapa del dominio backend (referencia)

| Módulo back | Router HTTP (prefijos típicos) | Entidades principales |
|-------------|-------------------------------|------------------------|
| properties | `GET /`, `GET /featured`, `GET /my/*`, mutaciones con `authenticate` + roles | `PropertyEntity`, `PropertyMediaEntity`, `PropertyReviewEntity`, `PropertyViewEntity`, `PropertyFavoriteEntity`, `PropertyAmenityEntity`, **`PropertyStatusConfigEntity`** |
| users | `/users/me`, `/users/me/*` (self) | `UserEntity`, `UserRoleEntity`, `UserProfileEntity`, `UserContactEntity` |
| auth | login/registro/recuperación | (sesión / tokens) |
| companies | rutas empresa/miembros (self + equipo) | `CompanyEntity`, `CompanyMemberEntity` |
| subscriptions | licencias/créditos del tenant | `UserSubscriptionEntity`, `CreditTransactionEntity`, `CompanyLicenceAssignmentEntity` |
| plans | catálogo comercial | `PlanEntity`, `PlanPackageEntity` |
| payments | `POST /initiate`, `GET /my/history`, webhooks | `PaymentEntity` |
| services | marketplace servicios profesionales | `ProfessionalServiceEntity`, `ServiceReviewEntity`, `ServiceMediaEntity`, `ServiceViewEntity`, `ServiceFavoriteEntity` |
| service-requests | solicitudes entre usuarios y pros | `ServiceRequestEntity` |
| catalogs | tipos, monedas, categorías | `PropertyTypeEntity`, `CurrencyEntity`, `ServiceCategoryEntity`, `DocumentTypeEntity`, `TransactionTypeEntity` |
| locations | jerarquía geográfica | `LocationEntity` |
| professional-profiles | CV pro | `ProfessionalProfileEntity`, `ProfessionalWorkEntity`, `ProfessionalCertificateEntity` |
| saved-searches / recommendations | búsquedas guardadas, feedback | `SavedSearchEntity`, `RecommendationFeedbackEntity` |

**Conclusión:** casi todo es **self-service** (`/me`, `/my/...`). **No hay** hoy un namespace estable tipo `/admin/...` para operadores internos; el admin debe documentar gaps y mockear agregados.

---

## 2. Navegación admin (objetivo)

| Ruta | Módulo |
|------|--------|
| `/dashboard` | Panel (existente) |
| `/properties` | Propiedades |
| `/services` | Servicios |
| `/users` | Usuarios |
| `/companies` | Empresas |
| `/payments` | Pagos |
| `/support` | Soporte |
| `/parameters` | Parámetros |
| `/audit` | Auditoría |

---

## 3. Árbol de carpetas por feature

```
src/app/features/<feature>/
  domain/
    <feature>.models.ts
    <feature>.repository.ts
  application/
    <feature>.facade.ts
  infrastructure/
    <feature>-mock.data.ts
    <feature>-mock.repository.ts
  presentation/
    <feature>-list-page/
      <feature>-list-page.component.ts
      <feature>-list-page.component.html
      <feature>-list-page.component.scss
  <feature>.providers.ts
  <feature>.routes.ts
```

---

## 4. Módulo — Usuarios

### Objetivo operativo

Soporte, riesgo y acceso: ver cuentas, roles activos, señales de abuso y acciones correctivas (bloqueo, merge de historial anónimo documentado en API self).

### Entidades

`UserEntity`, `UserRoleEntity`, `UserProfileEntity`, `UserContactEntity`.

### APIs existentes (reutilizables / limitaciones)

- **Solo self:** `GET/PUT /users/me`, contactos, roles `activate`/`pause`, métricas propias.
- **Admin futuro:** listado global, impersonación (si se define política), flags de moderación, auditoría de cambios de rol.

### Pantallas

Listado enterprise, detalle (tabs: perfil, roles, contactos, actividad), diálogos de riesgo para bloqueo/revocación.

### Tabla (mock)

| Columna | Filtros | Badges | Acciones |
|---------|---------|--------|----------|
| id, email, entityType, roles, estado cuenta, último acceso, flags | búsqueda texto | estado, flags | Ver (placeholder), Bloquear (confirm) |

### KPIs (coherentes)

Cuentas activas, bloqueadas/pendientes revisión, roles `adviser` activos, contactos incompletos (soporte).

### Acciones críticas

Bloquear usuario — **alto riesgo**, requiere auditoría y motivo; confirm dialog **danger**.

### Dependencias futuras

`GET /admin/users`, `PATCH /admin/users/:id/status`, eventos de seguridad, permisos granular `admin.users.*`.

---

## 5. Módulo — Propiedades

### Objetivo operativo

Moderación marketplace: borradores, publicadas, pausadas, vendidas; coherencia con `property_status_config`.

### Entidades

`PropertyEntity`, `PropertyMediaEntity`, `PropertyReviewEntity`, `PropertyViewEntity`, **`PropertyStatusConfigEntity`**, favoritos, amenities.

### APIs existentes

- Público: listados publicados, featured, densidad.
- Autenticado: `my/list`, `my/drafts`, publish/pause/mark-sold, media, reviews.
- **Admin futuro:** cola moderación, override estado, ocultar listing, ver métricas agregadas.

### Pantallas

Listado por estado, detalle (media, timeline publicación), moderación side panel.

### Tabla

Título, propietario ref, estado, operación, ubicación resumida, vistas, actualizado; filtros estado/operación; acciones Aprobar/Ocultar/Pausar (según política).

### KPIs

Pendientes moderación, publicadas hoy, pausadas, con incidencias de media.

### Acciones críticas

Forzar unpublish / marcar revisión — confirm + auditoría.

### Dependencias futuras

`GET /admin/properties`, `PATCH /admin/properties/:id/moderation`, lectura `property_status_config` vía admin.

---

## 6. Módulo — Servicios

### Objetivo operativo

Operación del marketplace de **servicios profesionales** y solicitudes (`service_requests`): calidad, disputas, visibilidad.

### Entidades

`ProfessionalServiceEntity`, `ServiceRequestEntity`, reviews/media/views/favorites, perfiles `ProfessionalProfileEntity`.

### APIs existentes

Routers `service`, `service-request`, `professional-profile` (portal/self).

### Pantallas

Listado servicios, detalle, solicitudes enlazadas, reviews flagged.

### KPIs

Servicios activos, solicitudes abiertas, SLA tiempo primera respuesta (mock).

### Dependencias futuras

`GET /admin/services`, `GET /admin/service-requests`, moderación reviews.

---

## 7. Módulo — Pagos

### Objetivo operativo

Conciliación y monitoreo: intentos, webhooks, estados por gateway.

### Entidades

`PaymentEntity`; relación conceptual con `PlanEntity` / `UserSubscriptionEntity`.

### APIs existentes

`POST /payments/initiate`, `GET /payments/my/history`, `GET /payments/:id/status`, `POST /payments/webhook/:gateway`.

### Pantallas

Listado transacciones, detalle intento, reintento manual (futuro), vista webhook logs (futuro).

### KPIs

Fallidos 24h, pendientes, importe liquidado (mock).

### Acciones críticas

Reintentar captura — **riesgo financiero**; solo con permiso y auditoría.

### Dependencias futuras

`GET /admin/payments`, `POST /admin/payments/:id/reconcile`, dashboards por gateway.

---

## 8. Módulo — Empresas

### Objetivo operativo

Licencias de equipo, miembros, asignación de cupos (`company_licence_assignments`).

### Entidades

`CompanyEntity`, `CompanyMemberEntity`, `CompanyLicenceAssignmentEntity`.

### APIs existentes

Router `company` (operaciones de tenant autenticado).

### Pantallas

Listado empresas, detalle miembros + licencias, revocación asiento.

### KPIs

Empresas activas, licencias sin asignar, miembros invitados pendientes.

### Acciones críticas

Revocar licencia / expulsar miembro — confirm danger + auditoría.

### Dependencias futuras

`GET /admin/companies`, `PATCH /admin/companies/:id`, informes uso.

---

## 9. Módulo — Soporte

### Objetivo operativo

Triaje: tickets (futuro), enlaces a usuario/propiedad/pago/servicio, macros de respuesta.

### Entidades (conceptuales)

Hoy **no** hay entidad `SupportTicket` en el grep de módulos; el módulo documenta **necesidad** y usa mocks.

### APIs existentes

Ninguna dedicada; soporte usa datos vía futuras APIs admin o read-only agregados.

### Pantallas

Cola casos, detalle caso, vínculos a entidades REP.

### Dependencias futuras

CRM propio o integración, `POST /admin/support/cases`, notas internas.

---

## 10. Módulo — Parámetros (no CRUD vacío)

### Objetivo operativo

Centralizar **configuración real del sistema** editable con gobernanza.

### Anclas reales (backend / producto)

| Área | Fuente hoy | Notas admin |
|------|-------------|-------------|
| Estados de propiedad | `property_status_config` | Transiciones, labels operativos |
| Planes / paquetes | `plans`, `plan_packages` | Precios, límites, features comerciales |
| Catálogos | `catalogs` module | Tipos propiedad, monedas, categorías servicio, tipos doc |
| Gateways de pago | `payments` webhook por `:gateway` | Parámetros por entorno (sin secretos en UI) |
| Contenido marketing | Mayormente **Next** (`realestate-frontend`) | FAQs, SEO, hero: parametrización futura vía CMS o `admin` |

### APIs existentes

Routers de lectura de catálogos/planes según implementación actual (portal); **admin** para mutación global pendiente.

### Pantallas

Secciones por dominio (estados, planes, catálogos, integraciones), diff/versión (futuro).

### Dependencias futuras

`GET/PATCH /admin/parameters/...`, feature flags, auditoría obligatoria en cambios.

---

## 11. Módulo — Auditoría

### Objetivo operativo

Trazabilidad de acciones admin y eventos sensibles (pagos, roles, moderación).

### Entidades

Ninguna dedicada en back listado; **event store** futuro.

### Pantallas

Timeline filtrable por actor, recurso, tipo evento.

### Dependencias futuras

`GET /admin/audit-events`, retención, export compliance.

---

## 12. Prioridades MVP (propuesta)

1. **Propiedades + Usuarios** — moderación y soporte de mayor impacto.  
2. **Pagos + Empresas** — ingresos y licencias.  
3. **Servicios + Parámetros** — operación marketplace y configuración.  
4. **Soporte + Auditoría** — cuando existan APIs o integración externa.

---

## 13. Contrato frontend compartido

- `AdminModuleKpi` — `@shared/domain/admin-list-page.models`.  
- Cada feature: `*Repository.getListSnapshot()`, `*Facade` con signals `snapshot`, `loading`, `error`.  
- Presentación: `rep-page-container`, `rep-toolbar`, `rep-page-header`, `rep-section`, `rep-kpi-card`, `rep-card`, `rep-table-toolbar`, `rep-filter-bar`, `rep-data-table`, estados loading/error/empty.

---

## 14. APIs admin futuras (resumen)

| Capacidad | Ejemplos |
|-----------|----------|
| Listados globales | `/admin/users`, `/admin/properties`, `/admin/payments` |
| Moderación | `PATCH .../moderation`, `POST .../reviews/:id/hide` |
| Soporte | `/admin/support/cases` |
| Parámetros | `/admin/parameters/property-status`, `/admin/parameters/plans` |
| Auditoría | `/admin/audit-events` |

Permisos: roles internos no confundir con `user_roles` del portal (`adviser`, `particular`, etc.).

---

## 15. Implementación en `admin-rep` (esta fase)

- **Modelo KPI compartido:** `src/app/shared/domain/admin-list-page.models.ts` (`AdminModuleKpi`).
- **Features lazy con mock:** cada módulo bajo `src/app/features/<nombre>/` con `domain/`, `application/`, `infrastructure/*-mock.*`, `presentation/*-list-page/`, `<nombre>.providers.ts`, `<nombre>.routes.ts`.
- **Rutas registradas en** `src/app/app.routes.ts` (`/properties`, `/services`, `/users`, `/companies`, `/payments`, `/support`, `/parameters`, `/audit`).
- **Navegación lateral en** `src/app/core/layout/app-shell/app-shell.component.ts`.
- **Iconos Lucide añadidos en** `src/app/shared/ui/icons/rep-icons.module.ts`: `landmark`, `receipt`, `life-buoy`, `sliders-horizontal`, `clipboard-list`.
- **Diálogos de confirmación (mock):** bloqueo de usuario (`users`), reintento de pago (`payments`).
