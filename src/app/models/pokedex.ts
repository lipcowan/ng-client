export class Pokedex{
  constructor(
  public dexId:number,
  public imgUrl:string,
  public pokemon:string,
  public category:string,
  public type:string,
  public wiki:string,
  public id?:string
  ){}
}
