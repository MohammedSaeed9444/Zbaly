import axios from 'axios';
import { Ticket, TicketFormData } from '../types/ticket';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const createTicket = async (data: TicketFormData): Promise<Ticket> => {
  const response = await axios.post(`${API_URL}/tickets`, data);
  return response.data;
};

export const getTickets = async (
  page: number = 1,
  reason?: string,
  startDate?: string,
  endDate?: string
) => {
  const response = await axios.get(`${API_URL}/tickets`, {
    params: {
      page,
      reason,
      startDate,
      endDate,
    },
  });
  return response.data;
};

export const exportTickets = async (reason?: string, startDate?: string, endDate?: string) => {
  const response = await axios.get(`${API_URL}/tickets/export`, {
    params: {
      reason,
      startDate,
      endDate,
    },
    responseType: 'blob',
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'tickets.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};