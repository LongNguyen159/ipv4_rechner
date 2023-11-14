import { Component } from '@angular/core';
import { take } from 'rxjs';
import { IpRechnerService } from 'src/app/services/ip-rechner.service';

@Component({
  selector: 'app-computing-page',
  templateUrl: './computing-page.component.html',
  styleUrls: ['./computing-page.component.scss']
})
export class ComputingPageComponent {

  response: any


  constructor(
    private ipService: IpRechnerService
  ) {}

  onTableSubmit(isResponseOK: boolean) {
    if (isResponseOK) {
      console.log('ok')
      this.ipService.getResults().pipe(take(1)).subscribe((results) => {
        this.response = results
      })
      
    } else {
      console.log('error')
    }
  }
}
