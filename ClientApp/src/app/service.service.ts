import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getData() {
    return this.http.get('/api/Contacts'); 
  }

  postData(formData) {
    return this.http.post('/api/Contacts', formData);
  }

  putData(contactId, formData) {
    return this.http.put('/api/Contacts/' + contactId, formData);
  }

  deleteData(contactId) {
    return this.http.delete('/api/Contacts/' + contactId);
  }

  searchContacts(searchFirstName, searchSurname, searchTel) {
    let params = new HttpParams().set("searchFirstName", searchFirstName).set("searchSurname", searchSurname).set("searchTel", searchTel);
    return this.http.get('/api/Contacts/searchContacts', { params: params });
  }

}  
