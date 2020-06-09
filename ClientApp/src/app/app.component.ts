import { Component } from '@angular/core';
import { ServiceService } from './service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  title = 'AddressBook';

  constructor(private ServiceService: ServiceService) { }
  data: any;
  ContactsForm: FormGroup;
  submitted = false;
  EventValue: any = "Save";

  ngOnInit(): void {
    this.getdata();

    this.ContactsForm = new FormGroup({
      contactId: new FormControl(null),
      firstName: new FormControl("", [Validators.required]),
      surname: new FormControl("", [Validators.required]),
      tel: new FormControl(""),
      cell: new FormControl(""),
      email: new FormControl(""),
      searchFirstName: new FormControl(""),
      searchSurname: new FormControl(""),
      searchTel: new FormControl("")
    })
  }

  getdata() {
    this.ServiceService.getData().subscribe((data: any[]) => {
      this.data = data;
    })
  }

  deleteData(contactId) {
    this.ServiceService.deleteData(contactId).subscribe((data: any[]) => {
      this.data = data;
      this.getdata();
    })
  }

  editData(Data) {
    this.ContactsForm.controls["contactId"].setValue(Data.contactId);
    this.ContactsForm.controls["firstName"].setValue(Data.firstName);
    this.ContactsForm.controls["surname"].setValue(Data.surname);
    this.ContactsForm.controls["tel"].setValue(Data.tel);
    this.ContactsForm.controls["cell"].setValue(Data.cell);
    this.ContactsForm.controls["email"].setValue(Data.email);
    this.EventValue = "Update";
  }

  resetFrom() {
    this.getdata();
    this.ContactsForm.reset();
    this.EventValue = "Save";
    this.submitted = false;
  }

  search() {
    this.ServiceService.searchContacts(this.ContactsForm.controls["searchFirstName"].value, this.ContactsForm.controls["searchSurname"].value,
      this.ContactsForm.controls["searchTel"].value).subscribe((data: any[]) => {
        this.data = data;
    })
  }

  Save() {
    this.submitted = true;

    if (this.ContactsForm.invalid) {
      return;
    }

    this.ServiceService.postData(this.ContactsForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();
    })
  }

  Update() {
    this.submitted = true;

    if (this.ContactsForm.invalid) {
      return;
    }

    this.ServiceService.putData(this.ContactsForm.value.contactId, this.ContactsForm.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();
    })
  }
}
