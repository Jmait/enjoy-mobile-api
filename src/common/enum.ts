export enum LocationTypes {
  AIRPORT = 'airport',
  HOTEL = 'hotel',
  STATION = 'station',
  CUSTOM = 'custom',
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  COMPLETED='completed'
}

export enum PaymentMethod {
  CARD = 'card',
  CASH = 'cash',
}

export enum Languages {
  FRENCH = 'fr',
  ENGLISH = 'en',
  SPANISH = 'es',
}

export enum VehicleTypes {
  BERLINE = 'berline',
  VAN = 'van',

}