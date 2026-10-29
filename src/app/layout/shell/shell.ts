import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, computed, inject, linkedSignal, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map } from 'rxjs';
import { PeriodState } from '../../core/period/period-state';

/** Punto de corte md de Tailwind (768px): por debajo, el panel se superpone al contenido. */
const MOBILE_BREAKPOINT = '(max-width: 767.98px)';

const SHORT_PERIOD_FORMAT = new Intl.DateTimeFormat('es-CO', { month: 'short', year: 'numeric' });
const LONG_MONTH_FORMAT = new Intl.DateTimeFormat('es-CO', { month: 'long' });

function capitalizeFirst(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatDatepickerModule,
  ],
  templateUrl: './shell.html',
  styles: `
    :host {
      display: block;
      height: 100dvh;
    }
  `,
})
export class Shell {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly sidenavContainer = viewChild(MatSidenavContainer);
  private readonly isExpanded = signal(true);

  readonly period = inject(PeriodState);

  /** true en pantallas menores que md (768px). */
  readonly isMobile = toSignal(
    this.breakpointObserver.observe(MOBILE_BREAKPOINT).pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  /** En móvil el panel se superpone al contenido; en escritorio ocupa espacio junto a él. */
  readonly sidenavMode = computed(() => (this.isMobile() ? 'over' : 'side'));

  /** Abierto por defecto solo en escritorio; al cambiar el breakpoint se restablece. */
  readonly sidenavOpened = linkedSignal(() => !this.isMobile());

  /** El modo de solo íconos (72px) aplica únicamente en pantallas anchas. */
  readonly showLabels = computed(() => this.isMobile() || this.isExpanded());

  readonly sidenavWidth = computed(() => (this.showLabels() ? '264px' : '72px'));

  /** Etiqueta corta del periodo seleccionado, por ejemplo "Oct 2026". */
  readonly periodLabel = computed(() => capitalizeFirst(SHORT_PERIOD_FORMAT.format(this.period.date())));

  /** Nombre accesible del botón, por ejemplo "Cambiar mes, Octubre 2026". */
  readonly periodAriaLabel = computed(
    () => `Cambiar mes, ${capitalizeFirst(LONG_MONTH_FORMAT.format(this.period.date()))} ${this.period.year()}`,
  );

  readonly navItems = [
    { label: 'Resumen', icon: 'home', link: '/app/dashboard' },
    { label: 'Ingresos', icon: 'arrow_downward', link: '/app/ingresos' },
    { label: 'Gastos', icon: 'arrow_upward', link: '/app/gastos' },
    { label: 'Gastos compartidos', icon: 'group', link: '/app/gastos-compartidos' },
  ];

  toggleSidenav() {
    if (this.isMobile()) {
      this.sidenavOpened.update((opened) => !opened);
      return;
    }

    this.isExpanded.update((expanded) => !expanded);
    // El ancho se aplica en el siguiente ciclo de detección, así que recalculamos los
    // márgenes del contenido cuando el DOM ya tiene el ancho nuevo.
    setTimeout(() => this.sidenavContainer()?.updateContentMargins());
  }

  onNavigate() {
    if (this.isMobile()) {
      this.sidenavOpened.set(false);
    }
  }

  /** `month` es el Date normalizado que emite el datepicker en la vista de meses. */
  onMonthSelected(month: Date, picker: MatDatepicker<Date>) {
    this.period.setPeriod(month.getFullYear(), month.getMonth() + 1);
    picker.close();
  }
}
