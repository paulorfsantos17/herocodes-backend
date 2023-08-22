import mongoose from 'mongoose'
import { Event } from '../entities/Event'
import { EventRepository } from './EventRepository'
import { Location } from '../entities/Location'
import { User } from '../entities/User'

const eventSchema = new mongoose.Schema({
  title: String,
  location: {
    latitude: String,
    longitude: String,
  },
  date: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: String,
  categories: [String],
  banner: String,
  flyers: [String],
  price: {
    type: Array,
  },
  formattedAddress: String,
  city: String,
  participants: {
    type: Array,
    ref: 'User',
  },
})

const EventModel = mongoose.model('Event', eventSchema)

class EventRepositoryMongose implements EventRepository {
  async add(event: Event): Promise<Event> {
    const eventModel = new EventModel(event)
    await eventModel.save()
    return event
  }

  async findByLocationAndDate(
    location: Location,
    date: Date,
  ): Promise<Event | undefined> {
    const findEvent = await EventModel.findOne({
      location,
      date,
    }).exec()
    return findEvent?.toObject() || undefined
  }

  async findEventsByCity(city: string): Promise<Event[]> {
    const findEvents = await EventModel.find({ city }).exec()

    return findEvents.map((event) => event.toObject())
  }

  async getEventsByCategory(category: string): Promise<Event[]> {
    const findEvents = await EventModel.find({ categories: category }).exec()

    return findEvents.map((event) => event.toObject())
  }

  async getEventsByName(name: string): Promise<Event[]> {
    const findEvents = await EventModel.find({
      title: {
        $regex: name,
        $options: 'i',
      },
    }).exec()

    return findEvents.map((event) => event.toObject())
  }

  async getEventById(id: string): Promise<Event | undefined> {
    const findEvent = await EventModel.findOne({ _id: id }).exec()
    return findEvent?.toObject() || undefined
  }

  async update(event: Event, id: string): Promise<any> {
    const eventUpdate = await EventModel.findByIdAndUpdate(id, event)

    return eventUpdate
  }

  async getEventsMain(date: Date): Promise<Event[]> {
    const endDate = new Date(date)
    endDate.setMonth(endDate.getMonth() + 1)
    date.setMonth(date.getMonth() - 1)
    const eventsMain = await EventModel.find({
      date: { $gte: date, $lt: endDate },
    })
      .limit(4)
      .exec()
    console.log(
      '🚀 ~ file: EventRepositoryMongoose.ts:95 ~ EventRepositoryMongose ~ getEventsMain ~ eventsMain:',
      eventsMain,
    )

    return eventsMain.map((event) => event.toObject())
  }

  async findEventByFilter(
    category?: string,
    name?: string,
    date?: Date,
    price?: string,
  ): Promise<Event[]> {
    const findEvents = await EventModel.find({
      title: {
        $regex: name,
        $options: 'i',
      },
    }).exec()

    return findEvents.map((event) => event.toObject())
  }
}

export { EventRepositoryMongose }
