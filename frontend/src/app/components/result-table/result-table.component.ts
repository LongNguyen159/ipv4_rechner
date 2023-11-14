import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnChanges{
  @Input() results: any[]

  isArray: boolean

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.results && changes.results.currentValue) {
      this.isArray = Array.isArray(this.results)
    }
  }

  formatValue(value: any): string {
    if (typeof value === 'object') {
      // If the value is an object, format its attributes
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${val}`)
        .join('<br>');
    } else {
      // If the value is a primitive, display it directly
      return value;
    }
  }
}
