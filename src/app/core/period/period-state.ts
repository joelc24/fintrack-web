import { computed, Service, signal } from '@angular/core';

@Service()
export class PeriodState {
    private readonly _year = signal(new Date().getFullYear());
    private readonly _month = signal(new Date().getMonth() + 1);

    readonly year = this._year.asReadonly();
    readonly month = this._month.asReadonly();
    readonly date = computed(() => new Date(this._year(), this._month() - 1, 1));

    setPeriod(year: number, month: number) {
        this._year.set(year);
        this._month.set(month);
    }
}
