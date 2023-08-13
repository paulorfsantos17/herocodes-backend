import { Event } from '../../entities/Event'

const eventMock: Event = {
  title: 'Jorge',
  price: [{ sector: 'Pista', amount: '20' }],
  categories: ['Show', 'Privado'],
  description: 'Evento descrição',
  city: 'Belo Horizonte',
  location: {
    latitude: '-19.8658659',
    longitude: '-43.9737064',
  },
  coupons: [],
  date: new Date(),
  participants: [],
  flyers: ['/mnt/c/Users/Paulo/Downloads/codigo(14).png'],
  banner: '/mnt/c/Users/Paulo/Downloads/codigo(14).png',
}
export { eventMock }
