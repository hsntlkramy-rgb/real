import { Property } from '../../shared/schema';

const usProperties: Property[] = [
  {
    id: 1001,
    title: 'Modern House in Los Angeles',
    description: 'Beautiful modern home in the heart of Los Angeles. Features include a gourmet kitchen, hardwood floors, and a spacious backyard.',
    price: '$1,250,000',
    location: '123 Main St, Los Angeles, CA',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750'
    ],
    tags: ['Single Family Home', '2020 built', '2500 sqft'],
    personas: {
      remoteWorker: 0.8,
      family: 0.9,
      investor: 0.7,
      retiree: 0.3,
      luxury: 0.6
    },
    coordinates: {
      lat: 34.0522,
      lng: -118.2437
    },
    contactUrl: 'tel:+1234567890',
    isActive: true
  },
  {
    id: 1002,
    title: 'Luxury Condo in Downtown LA',
    description: 'Stunning downtown condo with city views. Features include high-end appliances, floor-to-ceiling windows, and building amenities.',
    price: '$850,000',
    location: '456 Grand Ave, Los Angeles, CA',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28'
    ],
    tags: ['Condo', '2018 built', '1200 sqft'],
    personas: {
      remoteWorker: 0.9,
      family: 0.5,
      investor: 0.8,
      retiree: 0.6,
      luxury: 0.8
    },
    coordinates: {
      lat: 34.0544,
      lng: -118.2441
    },
    contactUrl: 'tel:+1234567891',
    isActive: true
  },
  {
    id: 1003,
    title: 'Townhouse in Echo Park',
    description: 'Modern townhouse in trendy Echo Park. Features include a rooftop deck, updated kitchen, and private garage.',
    price: '$950,000',
    location: '789 Echo Park Ave, Los Angeles, CA',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858'
    ],
    tags: ['Townhouse', '2019 built', '1800 sqft'],
    personas: {
      remoteWorker: 0.7,
      family: 0.8,
      investor: 0.6,
      retiree: 0.4,
      luxury: 0.7
    },
    coordinates: {
      lat: 34.0535,
      lng: -118.2420
    },
    contactUrl: 'tel:+1234567892',
    isActive: true
  }
];

export default usProperties; 