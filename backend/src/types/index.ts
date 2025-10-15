import { Request } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export interface TicketQueryParams {
  reason?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
}

export interface TicketData {
  tripId: string;
  tripDate: string;
  driverId: number;
  reason: string;
  city: string;
  serviceType: string;
  customerPhone: string;
  agentName: string;
}