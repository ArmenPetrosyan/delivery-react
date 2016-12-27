import Place from './Place';

/**
 *  Заявка на доставку
 */
class Order {
  /**
   *
   * @param from - пункт отправки груза {google.maps.latLng}
   * @param to - пункт назначения груза {google.maps.latLng}
   * @param volume - объем груза
   * @param time - ограничение по времени
   * @param amount - стоимость доставки
   * @param fine - штраф за прострочку (грн/час)
   */
  constructor(from, to, volume, time = 0, amount = 1000, fine = 0) {
    this.initialTime = new Date();
    this.from = new Place(from); // Place
    this.to = new Place(to); // Place
    this.time = time;
    this.volume = volume;
    this.amount = amount;
    this.fine = fine;
  }
};

/**
 *  Список заявок
 */
class OrderList {
  /**
   *  @param listOfOrders список объектов Order
   */
  constructor(listOfOrders) {
    this.orderList = listOfOrders;
    this.store = new Place(new google.maps.LatLng(46.953584,32.065843));
    this.distances = null;
    this.gmaps = google.maps;
  };

  addToList = (order) => {
    this.orderList.push(order);
  };

  calcualteDistances = () => {
    let matrix = [];
    let storeMatrix = [];

    let destinations = this.orderList.map((element) =>  element.to);

    // matrix
    for (let i = 0; i < destinations.length; i++) {
      let row = [];
      for (let j = 0; j < destinations.length; j++) {
        if(i == j) {
          row.push(0)
        } else {
          row.push(OrderList.computeDistanceBetween(destinations[i], destinations[j]));
        }
      }
      matrix.push(row);
    }

    // store matrix
    for (let i = 0; i < destinations.length; i++) {
      storeMatrix[i] = OrderList.computeDistanceBetween(this.store, destinations[i]);
    }

    this.distances = {destinationMatrix: matrix, storeMatrix: storeMatrix};
    return this.distances;
  };

  getSewingDistances = () => {
    let {storeMatrix, destinationMatrix} = this.distances;
    return storeMatrix[fromIndex] + storeMatrix[toIndex] - destinationMatrix[fromIndex, toIndex]
  };

  static computeDistanceBetween = (place1, place2) => {
    return google.maps.geometry.spherical.computeDistanceBetween(place1.latLng, place2.latLng);
  };
};

export {
  Order,
  OrderList
}