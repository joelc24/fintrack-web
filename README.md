# FinTrack Web

Frontend de **FinTrack**, una aplicación para llevar el control de ingresos y gastos,
tanto personales como compartidos, con varias personas (perfiles) dentro de una misma cuenta.

> Estado: en desarrollo. Este repositorio es el cliente web; la API está en
> [joelc24/FinTrack](https://github.com/joelc24/FinTrack).

## Qué hace

Una cuenta tiene varios perfiles, y cada perfil puede estar protegido con contraseña.
Dentro de un perfil se registran ingresos y gastos, y un gasto puede ser propio o
compartido con la cuenta. En los gastos compartidos se asigna cuánto le corresponde
a cada perfil.

### Funcionalidades

- [ ] Registro y login de cuenta (en dos etapas: cuenta y perfil)
- [ ] Selector de perfil, con desbloqueo por contraseña
- [ ] Dashboard con resumen del mes y gráficos
- [ ] Ingresos: listar, registrar, editar y eliminar
- [ ] Gastos propios: listar, registrar, editar y eliminar
- [ ] Gastos compartidos: listar, registrar y asignar cuánto le toca a cada perfil

## Capturas

[Aquí irán las capturas de pantalla cuando haya pantallas funcionando]

## Tecnologías

- Angular 22 (componentes standalone y signals)
- Angular Material (tema Material 3)
- Tailwind CSS v4 para el layout
- ngx-echarts (gráficos)
- TypeScript

## Arquitectura

Estructura por features, con el acceso a datos dentro de cada una:

```
src/app/
├── core/        # servicios globales: auth, interceptores, perfiles, periodo
├── layout/      # shell: toolbar y menú lateral
├── shared/      # componentes reutilizables
└── features/    # auth, profiles, dashboard, incomes, expenses, shared-expenses
```

## Cómo ejecutarlo

Requisitos: Node.js y npm (desarrollado con Node 24) y la API de FinTrack en ejecución.

```bash
git clone https://github.com/joelc24/fintrack-web.git
cd fintrack-web
npm install
ng serve
```

La app queda en http://localhost:4200.
[Próximamente indicaré aquí dónde se configura la URL de la API, cuando la tenga definida]

## Scripts

| Comando | Descripción |
|---|---|
| `ng serve` | Servidor de desarrollo |
| `ng build` | Build de producción |
| `ng test` | Pruebas unitarias |

## Notas de desarrollo

El repositorio incluye un `AGENTS.md` con las convenciones del proyecto para
asistentes de IA. La lógica de negocio y el acceso a datos están escritos y revisados
por el autor.

## Autor

Joel Camargo · [GitHub](https://github.com/joelc24) · [LinkedIn](https://linkedin.com/in/joel-camargo)