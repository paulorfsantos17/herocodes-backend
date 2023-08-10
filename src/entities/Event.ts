import { Price } from './Price'
import { User } from './User'
import { Location } from './Location'

class Event {
  public title: string
  public flyers: string[]
  public date: Date
  public description: string
  public banner: string
  public coupons: string[]
  public participants: User[]
  public price: Price[]
  public location: Location
  public city: string

  constructor(
    title: string,
    date: Date,
    description: string,
    banner: string,
    coupons: string[],
    participants: User[],
    price: Price[],
    location: Location,
    city: string,
    flyers: string[],
  ) {
    this.title = title
    this.banner = banner
    this.coupons = coupons
    this.date = date
    this.description = description
    this.participants = participants
    this.price = price
    this.location = location
    this.city = city
    this.flyers = flyers
  }
}

export { Event }
