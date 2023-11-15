import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Config } from 'src/app/models/ip-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IpRechnerService } from 'src/app/services/ip-rechner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-config-table',
  templateUrl: './config-table.component.html',
  styleUrls: ['./config-table.component.scss']
})
export class ConfigTableComponent implements OnInit {

  @Output() submission = new EventEmitter<boolean>(false)

  numSubnets = [2, 4, 8, 16, 32, 64]

  configData: Config = {
    ip_address: '',
    cidr: 0,
    is_subnetting: false,
    is_equal: true,
    num_subnets: 4,
    subnet_sizes: []
  }

  configForm: FormGroup

  dialogRef: MatDialogRef<DialogComponent>

  constructor(
    private formBuilder: FormBuilder,
    private ipService: IpRechnerService,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.buildForm()

    this.ipService.getDefaultConfig().pipe(take(1)).subscribe((config: Config) => {
      console.log(config)
      if (config) {
        this.updateForm(config)
      }
    })
  }

  private buildForm() {
    this.configForm = this.formBuilder.group({
      ip_address: ['', Validators.required],
      cidr: [0, Validators.required],
      is_subnetting: false,
      is_equal: true,
      num_subnets: 4,
      subnet_sizes: []
    })
  }

  private updateForm(config: Config) {
    this.configForm.setValue({
      ip_address: config.ip_address,
      cidr: config.cidr,
      is_subnetting: config.is_subnetting,
      is_equal: config.is_equal,
      num_subnets: config.num_subnets,
      subnet_sizes: config.subnet_sizes
    })

    this.configData = {
      ip_address: config.ip_address,
      cidr: config.cidr,
      is_subnetting: config.is_subnetting,
      is_equal: config.is_equal,
      num_subnets: config.num_subnets,
      subnet_sizes: config.subnet_sizes
    }
  }


  onSubmit() {
    const subnetSizesInput: string = this.configForm.get('subnet_sizes')?.value

    if (typeof subnetSizesInput == 'string') {
      const subnet_sizesArray = subnetSizesInput.split(/[ ,]+/)
      const subnetSizesToNumber = subnet_sizesArray.map(Number)
      this.configData = {
        ...this.configForm.value,
        subnet_sizes: subnetSizesToNumber
      }
    } else {
      this.configData = {...this.configForm.value}
    }
    
    this.ipService.setConfig(this.configData).subscribe(
      (response) => {
        if (response) {
          this.submission.emit(true)
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error)
        this.submission.emit(false)

        const allErrors = error.error
        const allErrorValues = Object.values(allErrors)
        const errorArray: any[] = Object.values(allErrorValues)


        let configErrorDetails = this.getConfigErrorDetails(errorArray)


        if (configErrorDetails) {
          const dialogData: DialogData = {
            icon: 'error',
            title: 'Error: Configuration Error',
            proceedText: 'OK',
            message: `Oops! There seems to be an issue with your configuration. Please review the details below and make the necessary corrections.
            <br>
            Details:<br>
            ${configErrorDetails}`,
            proceedButtonColor: 'primary',
          }
          this.openErrorDialog(dialogData)
        } 
        else {
          const dialogData: DialogData = {
            icon: 'error',
            title: `Error: ${error.statusText}`,
            proceedText: 'OK',
            message: `${error.message}`,
            proceedButtonColor: 'primary',
          }
          this.openErrorDialog(dialogData)
        }
      }
    )
  }


  openErrorDialog(dialogData: DialogData) {
    this.dialogRef = this.dialog.open(DialogComponent, {
      disableClose: false,
      data: dialogData,
    })

    this.dialogRef.afterClosed().subscribe(() => {
      return
    })
    this.dialogRef = null as any
  }


  getConfigErrorDetails(errorArray: any[]): string {
    let configErrorDetails = ''
    for (let i = 0; i < errorArray[0].length; i++) {
      const errorObject = errorArray[0][i]
      configErrorDetails += `- Error at '${errorObject.loc[1].replace(
        '_',
        ' '
      )}': ${errorObject.msg}<br>`
    }
    return configErrorDetails
  }


}
