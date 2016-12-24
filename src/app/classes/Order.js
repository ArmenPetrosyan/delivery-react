export default class Order {
  /**
   *
   * @param from - пункт отправки груза
   * @param to - пункт назначения груза
   * @param volume - объем груза
   * @param amount - стоимость доставки
   * @param fine - штраф за прострочку (грн/час)
   */
  constructor(from, to, volume, amount = 1000, fine = 0) {
    this.initialTime = new Date();
    this.from = from;
    this.to = to;
    this.volume = volume;
    this.amount = amount;
    this.fine = fine;
  }
}