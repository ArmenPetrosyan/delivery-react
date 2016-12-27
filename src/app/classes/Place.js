export default class Place {
  constructor(latLng) {
    this.geocoder = new google.maps.Geocoder();
    this.latLng = latLng;
    this._city = '';
    this._region = '';

    // получаем геоинформацию о точке на карте
    this.geocoder.geocode({
      location: this.latLng
    }, (result, status) => {
      console.log(status)
      if(status === google.maps.GeocoderStatus.OK) {
        this.defineGeoName(result);
      }
    });
  };

  get city() {
    return this._city;
  }

  get region() {
    return this._region;
  }

  get title() {
    return (this._city || this._region);
  }

  defineGeoName = (geocoderResult) => {
    geocoderResult.forEach((object) => {
      if (object.types.indexOf('locality') >= 0) {

        // если координаты находятся в черте города, сохраняем название города
        this._city = object.address_components[0].long_name;

      } else if (object.types.indexOf('administrative_area_level_1')  >= 0) {

        // иначе название области
        this._region = object.address_components[0].long_name;

      }
    });
  }
}