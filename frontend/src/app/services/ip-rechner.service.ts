import { Injectable } from '@angular/core';
import { Config } from '../models/ip-config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpRechnerService {

  apiEndpoint: string = 'http://localhost:8000'
  constructor(private http: HttpClient) { }

  setConfig(config: Config) {
    console.log(config)
    return this.http.post(`${this.apiEndpoint}/config`, config)
  }

  getDefaultConfig() {
    return this.http.get<Config>(`${this.apiEndpoint}/default_config`)
  }

  getResults() {
    return this.http.get<any[]>(`${this.apiEndpoint}/results`)
  }

}
