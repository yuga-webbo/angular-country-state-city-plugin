import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { Country, State, City }  from 'country-state-city';
// console.log(Country.getAllCountries())
// console.log(State.getAllStates())
// console.log(City.getAllCities())

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChild('country') country: ElementRef
  @ViewChild('city') city: ElementRef
  @ViewChild('state') state: ElementRef
  name = 'Angular ' + VERSION.major;
  countries = Country.getAllCountries();
  states = null;
  cities = null;

  selectedCountry;
  selectedState;
  selectedCity;
  

  onCountryChange($event): void {
    this.states = State.getStatesOfCountry(JSON.parse(this.country.nativeElement.value).isoCode);
    this.selectedCountry = JSON.parse(this.country.nativeElement.value);
    this.cities = this.selectedState = this.selectedCity = null;
  }

  onStateChange($event): void {
    this.cities = City.getCitiesOfState(JSON.parse(this.country.nativeElement.value).isoCode, JSON.parse(this.state.nativeElement.value).isoCode)
    this.selectedState = JSON.parse(this.state.nativeElement.value);
    this.selectedCity = null;

  }

  onCityChange($event): void {
    this.selectedCity = JSON.parse(this.city.nativeElement.value)
  }

  clear(type: string): void {
    switch(type) {
      case 'country':
        this.selectedCountry = this.country.nativeElement.value = this.states = this.cities = this.selectedState = this.selectedCity = null;
        break;
      case 'state':
        this.selectedState = this.state.nativeElement.value = this.cities = this.selectedCity = null;
        break;
      case 'city':
        this.selectedCity = this.city.nativeElement.value = null;
        break;
    }
  }
}
