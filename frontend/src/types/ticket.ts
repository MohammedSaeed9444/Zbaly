export interface Ticket {
  id: number;
  tripId: string;
  tripDate: string;
  driverId: number;
  reason: 'Harassment' | 'Drop' | 'Bad behavior' | 'Took extra money';
  city: 'Baghdad' | 'Basra' | 'Karbala';
  serviceType: 'Eco' | 'Plus';
  customerPhone: string;
  agentName: 'Ahmed' | 'Jack';
  createdAt: string;
  updatedAt: string;
}

export interface TicketFormData {
  tripId: string;
  tripDate: string;
  driverId: number;
  reason: 'Harassment' | 'Drop' | 'Bad behavior' | 'Took extra money';
  city: 'Baghdad' | 'Basra' | 'Karbala';
  serviceType: 'Eco' | 'Plus';
  customerPhone: string;
  agentName: 'Ahmed' | 'Jack';
}