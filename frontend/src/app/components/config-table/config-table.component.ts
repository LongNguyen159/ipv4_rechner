import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Config } from 'src/app/models/ip-config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IpRechnerService } from 'src/app/services/ip-rechner.service';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
@Component({
  selector: 'app-config-table',
  templateUrl: './config-table.component.html',
  styleUrls: ['./config-table.component.scss']
})
export class ConfigTableComponent implements OnInit {

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



  constructor(
    private formBuilder: FormBuilder,
    private ipService: IpRechnerService
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

    // if (!this.configForm.value.is_equal && this.configForm.value.subnet_sizes) {
      
    // } else {
    //   this.configData = {...this.configForm.value}
    // }

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
          console.log(response)
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error)
      }
    )
  }
}
