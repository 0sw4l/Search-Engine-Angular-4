import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiRestService} from '../../services/api-rest.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public title = 'Search Engine';
  public PROPERTY = 'Property';
  public OFFICE = 'Office';
  public MEMBER = 'Member';
  public PROPERTY_INPUT_TEXT = 'Type a County, City, MLS Area, Zip Code, School or Neighborhood';
  public OFFICE_INPUT_TEXT = 'Type the name of the brokerage office you are looking for';
  public MEMBER_INPUT_TEXT = 'Type the name of the agent or broker you are looking for';
  public _current_collection: string;
  public placeholder: string;
  public searchResults: boolean;
  public search_results = 0;
  DOMAIN = 'http://199.168.136.144:9000/search?text=';
  ARGUMENT = '&mls=IMLS&collection=';
  responseMembers: any;
  responseOffice: any;
  responseProperty: any;
  responseAddress: any;
  responseCity: any;
  responseHighSchool: any;
  responseSchoolDist: any;
  responseState: any;


  constructor(private http: HttpClient,
              private apiRest: ApiRestService) {
  }

  ngOnInit() {
    this.placeholder = this.MEMBER_INPUT_TEXT;
    this._current_collection = this.MEMBER;
    this.resetCollections();
  }

  setCollectionProperty() {
    this.resetCollections();
    this._current_collection = this.PROPERTY;
    this.changePlaceHolder(this.PROPERTY_INPUT_TEXT);
  }

  setCollectionOffice() {
    this.resetCollections();
    this._current_collection = this.OFFICE;
    this.changePlaceHolder(this.OFFICE_INPUT_TEXT);
  }

  setCollectionMember() {
    this.resetCollections();
    this._current_collection = this.MEMBER;
    this.changePlaceHolder(this.MEMBER_INPUT_TEXT);
  }

  changePlaceHolder(text: string) {
    this.placeholder = text;
  }

  setSearchResults(counter: any) {
    this.search_results = counter;
    if (this.search_results === undefined) {
      this.search_results = 0;
      this.resetCollections();
    }
  }

  search(data: string): void {
    if (data.length > 0) {
      data = data.split(' ').join('%20');
      const url = this.DOMAIN + data + this.ARGUMENT + this._current_collection + '&';
      if (this._current_collection === this.MEMBER) {
        this.searchMember(url);
      }
      if (this._current_collection === this.OFFICE) {
        this.searchOffice(url);
      }

      if (this._current_collection === this.PROPERTY) {
        this.searchProperty(url);
      }
    } else {
      this.resetCollections();
    }


  }

  resetCollections() {
    this.responseProperty = false;
    this.search_results = 0;
    this.searchResults = false;
    this.responseMembers = false;
    this.responseOffice = false;
    this.responseAddress = false;
    this.responseCity = false;
    this.responseHighSchool = false;
    this.responseSchoolDist = false;
    this.responseState = false;
  }

  searchMember(url: string) {
    this.apiRest.getDataApi(url).subscribe(data => {
      this.responseMembers = data['terms'].Member;
      this.setSearchResults(data['counts'].Member);
      console.log('Members:' + this.responseMembers);
    });
  }

  searchOffice(url: string) {
    this.apiRest.getDataApi(url).subscribe(data => {
      this.responseOffice = data['terms'].Office;
      this.setSearchResults(data['counts'].Office);
      console.log('Office:' + this.responseOffice);
    });
  }

  searchProperty(url: string) {

    this.apiRest.getDataApi(url).subscribe(data => {
      this.responseProperty = false;
      let addres_count = 0, city_count = 0, high_school_count = 0, school_dist_count = 0, state_count = 0;
      if (data['terms'].Address !== undefined) {
        this.responseAddress = data['terms'].Address;
        this.responseProperty = true;
      }

      if (data['terms'].City !== undefined) {
        this.responseCity = data['terms'].City;
        this.responseProperty = true;
      }

      if (data['terms'].HighSchool !== undefined) {
        this.responseHighSchool = data['terms'].HighSchool;
        this.responseProperty = true;
      }

      if (data['terms'].SchoolDist !== undefined) {
        this.responseSchoolDist = data['terms'].SchoolDist;
        this.responseProperty = true;
      }

      if (data['terms'].State !== undefined) {
        this.responseState = data['terms'].State;
        this.responseProperty = true;
      }

      if (data['counts'].Addresss !== undefined) {
        addres_count = data['counts'].Address;
      }

      if (data['counts'].City !== undefined) {
        city_count = data['counts'].City;
      }

      if (data['counts'].HighSchool !== undefined) {
        high_school_count = data['counts'].HighSchool;
      }

      if (data['counts'].SchoolDist !== undefined) {
        school_dist_count = data['counts'].SchoolDist;
      }

      if (data['counts'].State !== undefined) {
        state_count = data['counts'].State;
      }
      this.setSearchResults(
        addres_count + city_count + high_school_count + school_dist_count + state_count
      );
      console.log('Property:' + data);
    });

  }

}
