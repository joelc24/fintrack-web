You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `model()` for two-way bound properties with `[(prop)]` syntax instead of pairing `input()` with `output()`
- Use `computed()` for derived state
- Use `linkedSignal()` for state derived from multiple reactive sources that must stay synchronized
- Prefer inline templates for small components
- Forms: use Reactive Forms with `mat-form-field`. Do NOT use Signal Forms or Template-driven forms
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Do NOT import `CommonModule`, import only the directives and pipes the template uses, such as `AsyncPipe` or `DatePipe`
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

# FinTrack – Frontend

## Stack
Angular 22 (standalone, signals), Angular Material (tema M3 en un archivo .scss),
Tailwind v4 solo para layout, espaciados y responsive. El proyecto usa CSS.
No instalar otras librerías de UI. Gráficos: ngx-echarts.

## Estructura (src/app)
Arquitectura por features (vertical slices) con acceso a datos dentro de cada feature.

- core/: servicios globales (singletons)
  - auth/: sesión de cuenta y de perfil (signals), guards funcionales
  - interceptors/: token y manejo de errores (401, renovación con refresh token)
  - profiles/: lista de perfiles de la cuenta (la usan varias features)
  - period/: mes seleccionado (signal global que leen todas las pantallas)
- layout/shell/: mat-toolbar + mat-sidenav colapsable
- shared/: solo lo que Material no trae (confirm-dialog, empty-state, money-input)
- features/<nombre>/
  - pages/: componentes de ruta (con la lógica)
  - components/: componentes locales de la feature (presentación)
  - data-access/: servicio HTTP de la feature y, solo si hace falta, un store con signals
  - <nombre>.routes.ts: rutas locales con carga perezosa
- Features: auth, profiles, dashboard, incomes, expenses, shared-expenses
- app.config.ts (providers globales) y app.routes.ts (carga perezosa hacia las features)

## Reglas de arquitectura
- Las features no se importan entre sí. Lo compartido va en core/ o shared/.
- Cada feature tiene su propio servicio de API en data-access/.
- Un store (*.store.ts) solo si varias páginas comparten estado real
  (por ejemplo shared-expenses con su detalle y asignación).
- Las interfaces TypeScript de los DTOs viven en la feature que las usa;
  si dos features las necesitan, van en core/.

## Convenciones de código
- Componentes standalone, signals para el estado, inject() en lugar del constructor
  y control flow nativo (@if, @for). OnPush ya es el valor por defecto: no declararlo.
- Seguir el estilo de nombres que genera el CLI (por ejemplo app.ts); no mezclar
  con sufijos .component en el mismo proyecto.
- Colores: usar los del tema (var(--mat-sys-primary)), no valores fijos.
- No instalar paquetes nuevos sin pedirlo; si hace falta uno, avisar antes.

## Reglas de interfaz
- Eliminar un registro siempre pide confirmación con un diálogo (mat-dialog).
- La lógica de negocio y los servicios los escribe el desarrollador; al generar
  pantallas, crear solo la interfaz y dejar los métodos de servicio como TODO si no existen.

## Comandos
ng serve · ng build · ng test