import { Event } from '../../entities/Event'

const eventMock: Event = {
  title: 'Jorge',
  price: [{ sector: 'Pista', amount: '20' }],
  categories: ['Show', 'Privado'],
  description: 'Evento descrição',
  city: '',
  location: {
    latitude: '-22.35838',
    longitude: '-45.784125',
  },
  formattedAddress: '',
  coupons: [],
  date: new Date(),
  participants: [],
  flyers: ['/mnt/c/Users/Paulo/Downloads/banner.jpg'],
  banner: '/mnt/c/Users/Paulo/Downloads/banner.jpg',
  map: '/mnt/c/Users/Paulo/Downloads/banner.jpg',
}
export { eventMock }
