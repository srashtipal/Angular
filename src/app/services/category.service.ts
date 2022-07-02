import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpclient : HttpClient) { }

  //get cayegory
  public categories(){
    return this.httpclient.get(`${baseUrl}/category/`);
  }

  //add
  public addCategories(category){
    return this.httpclient.post(`${baseUrl}/category/`,category);
  }
}
