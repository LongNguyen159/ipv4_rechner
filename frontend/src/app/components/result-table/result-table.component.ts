import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.scss']
})
export class ResultTableComponent implements OnChanges{
  @Input() results: any[]

  @ViewChildren(MatExpansionPanel) panels: QueryList<MatExpansionPanel>

  isArray: boolean

  isPanelExpanded: boolean

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.results && changes.results.currentValue) {

      /** Check if it's array or not, because when user only click
       * to show detail, there would be only one object instead of 
       * array of objects. That means we have different logic for 
       * displaying them.
       * 
       * This condition will decide which display logic will we use
       * in the template.
       */
      this.isArray = Array.isArray(this.results)
    }
  }

  expandCollapseAllPanels() {
    this.isPanelExpanded = !this.isPanelExpanded

    if (this.isPanelExpanded) {
      this.panels.forEach(panel => {
        panel.open()
      })
    } else {
      this.panels.forEach(panel => {
        panel.close()
      })
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
