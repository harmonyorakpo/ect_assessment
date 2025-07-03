import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customSort'
})
export class CustomSortPipe implements PipeTransform {
    transform(array: any[], criteria: string | string[]): any[] {
        if (!Array.isArray(array)) {
            return array;
        }

        const sortCriteria = Array.isArray(criteria) ? criteria : [criteria];

        return [...array].sort((a, b) => {
            for (const criterion of sortCriteria) {
                const isDescending = criterion.startsWith('-');
                const key = isDescending ? criterion.substr(1) : criterion;
                const modifier = isDescending ? -1 : 1;

                const valueA = this.getValue(a, key);
                const valueB = this.getValue(b, key);

                const result = this.compare(valueA, valueB);
                
                if (result !== 0) {
                    return result * modifier;
                }
            }
            return 0;
        });
    }

    private getValue(obj: any, key: string): any {
        return key.split('.').reduce((o, k) => (o || {})[k], obj);
    }

    private compare(a: any, b: any): number {
        if (a === null || a === undefined) {
            return b === null || b === undefined ? 0 : -1;
        }
        if (b === null || b === undefined) {
            return 1;
        }

        if (a instanceof Date && b instanceof Date) {
            return a.getTime() - b.getTime();
        }

        if (Array.isArray(a) && Array.isArray(b)) {
            const minLength = Math.min(a.length, b.length);
            for (let i = 0; i < minLength; i++) {
                const result = this.compare(a[i], b[i]);
                if (result !== 0) {
                    return result;
                }
            }
            return a.length - b.length;
        }

        if (typeof a === 'object' && typeof b === 'object') {
            const aStr = JSON.stringify(a);
            const bStr = JSON.stringify(b);
            return aStr.localeCompare(bStr);
        }

        if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
        }

        return a < b ? -1 : a > b ? 1 : 0;
    }
} 