import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { body, validationResult } from 'express-validator';
import { TypedRequestBody, TicketData, TicketQueryParams } from '../types';

const router = Router();
const prisma = new PrismaClient();

// Validation middleware
const ticketValidation = [
  body('tripId').notEmpty().withMessage('Trip ID is required'),
  body('tripDate').isISO8601().withMessage('Valid trip date is required'),
  body('driverId').isInt().withMessage('Valid driver ID is required'),
  body('reason').isIn(['Harassment', 'Drop', 'Bad behavior', 'Took extra money']).withMessage('Invalid reason'),
  body('city').isIn(['Baghdad', 'Basra', 'Karbala']).withMessage('Invalid city'),
  body('serviceType').isIn(['Eco', 'Plus']).withMessage('Invalid service type'),
  body('customerPhone').isInt().withMessage('Valid customer phone is required'),
  body('agentName').isIn(['Ahmed', 'Jack']).withMessage('Invalid agent name'),
];

// Create ticket
router.post('/', ticketValidation, async (req: TypedRequestBody<TicketData>, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ticket = await prisma.ticket.create({
      data: {
        ...req.body,
        tripDate: new Date(req.body.tripDate),
      },
    });
    return res.json(ticket);
  } catch (error) {
    return res.status(500).json({ error: 'Error creating ticket' });
  }
});

// Get tickets with filters and pagination
router.get('/', async (req: TypedRequestBody<{}> & { query: TicketQueryParams }, res: Response) => {
  const { reason, startDate, endDate, page = 1 } = req.query;
  const pageSize = 20;
  const skip = (Number(page) - 1) * pageSize;

  try {
    const where: any = {};
    if (reason) {
      where.reason = reason;
    }
    if (startDate && endDate) {
      where.tripDate = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const [tickets, total] = await Promise.all([
      prisma.ticket.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.ticket.count({ where }),
    ]);

    res.json({
      tickets,
      total,
      totalPages: Math.ceil(total / pageSize),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tickets' });
  }
});

// Export tickets to CSV
router.get('/export', async (req: TypedRequestBody<{}> & { query: TicketQueryParams }, res: Response) => {
  const { reason, startDate, endDate } = req.query;

  try {
    const where: any = {};
    if (reason) {
      where.reason = reason;
    }
    if (startDate && endDate) {
      where.tripDate = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    }

    const tickets = await prisma.ticket.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const csvHeader = 'Trip ID,Trip Date,Driver ID,Reason,City,Service Type,Customer Phone,Agent Name,Created At\n';
    const csvRows = tickets.map(ticket => {
      return `${ticket.tripId},${ticket.tripDate.toISOString()},${ticket.driverId},${ticket.reason},${ticket.city},${ticket.serviceType},${ticket.customerPhone},${ticket.agentName},${ticket.createdAt.toISOString()}`;
    }).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=tickets.csv');
    res.send(csvHeader + csvRows);
  } catch (error) {
    res.status(500).json({ error: 'Error exporting tickets' });
  }
});

export default router;