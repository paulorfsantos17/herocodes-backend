import request from 'supertest'
import { App } from '../app'
import crypto from 'node:crypto'

import {
  eventRepository,
  eventUseCaseMock,
} from './__mocks__/EventUseCase.mock'
import { eventMock } from './__mocks__/Event.mock'

const app = new App()
const express = app.app
describe('Event test', () => {
  it('/POST Event', async () => {
    const event = eventMock
    const response = await request(express)
      .post('/events/')
      .field('title', event.title)
      .field('description', event.description)
      .field('city', event.city)
      .field('coupons', event.coupons)
      .field('categories', event.categories)
      .field('location[latitude]', event.location.latitude)
      .field('location[longitude]', event.location.longitude)
      .field('date', event.date.toISOString())
      .field('price[sector]', event.price[0].sector)
      .field('price[amount]', event.price[0].amount)
      .attach('banner', event.banner)
      .attach('flyers', event.flyers[0])

    if (response.error) {
      console.log(response.error)
    }

    if (response.error) {
      console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error)
    }

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      message: 'Evento criado com Sucesso',
    })
  })
  it('/POST Event insert participant', async () => {
    const response = await request(express)
      .post('/events/64d941a148c1308ca707f0c6/participants')
      .send({
        name: 'Paulo',
        email: crypto.randomBytes(10).toString('hex') + '@teste.com',
      })

    if (response.error) {
      console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error)
    }

    expect(response.status).toBe(200)
  })
  it('/GET/:Id Event by id', async () => {
    const response = await request(express).get(
      '/events/64d941a148c1308ca707f0c6',
    )

    if (response.error) {
      console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error)
    }

    expect(response.status).toBe(200)
  })
  it('/GET Event by category', async () => {
    const response = await request(express).get('/events/category/Show')

    if (response.error) {
      console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error)
    }

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
  it('/GET Event by name', async () => {
    const response = await request(express).get('/events/category/Show')

    if (response.error) {
      console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error)
    }

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
  it('/GET Event by location', async () => {
    const response = await request(express).get(
      '/events?latitude=-19.8658659&longitude=-43.9737064',
    )

    if (response.error) {
      console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error)
    }

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
  it('/GET Event by name', async () => {
    const response = await request(express).get('/events/name?name=Jorge')

    if (response.error) {
      console.log('🚀 ~ file: Events.test.ts:34 ~ it ~ error:', response.error)
    }

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
  })
})

describe('Unit Test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  const event = eventMock
  it('sholud return an array of events by category', async () => {
    eventRepository.getEventsByCategory.mockResolvedValue([event])
    const result = await eventUseCaseMock.findEventsByCategory('Show')

    expect(result).toEqual([event])
    expect(eventRepository.getEventsByCategory).toHaveBeenCalledWith('Show')
  })
  it('sholud return an array of events by name', async () => {
    eventRepository.getEventsByName.mockResolvedValue([event])
    const result = await eventUseCaseMock.findEventsByName('Jorge e Mateus')

    expect(result).toEqual([event])
    expect(eventRepository.getEventsByName).toHaveBeenCalledWith(
      'Jorge e Mateus',
    )
  })
  it('sholud return an event by ID', async () => {
    eventRepository.getEventById.mockResolvedValue(event)
    const result = await eventUseCaseMock.findEventById('1')

    expect(result).toEqual(event)
    expect(eventRepository.getEventById).toHaveBeenCalledWith('1')
  })
})
