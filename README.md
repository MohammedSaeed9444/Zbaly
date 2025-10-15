# CRM Ticketing System

A full-stack ticketing system for managing customer relations and support tickets.

## Features

- Create tickets with detailed information
- View and filter tickets
- Export tickets to CSV
- Pagination support
- Real-time form validation
- Modern UI with Chakra UI

## Tech Stack

### Frontend
- React with TypeScript
- Chakra UI for components
- React Hook Form for form handling
- Axios for API calls

### Backend
- Node.js with Express
- PostgreSQL database
- Prisma ORM
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both backend and frontend directories
   - Update the database URL and other configurations as needed

4. Initialize the database:

```bash
cd backend
npx prisma migrate dev
```

5. Start the development servers:

```bash
# Backend
cd backend
npm run dev

# Frontend (in a new terminal)
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Deployment

### Railway.com Deployment

1. Create a new project on Railway.com
2. Connect your GitHub repository
3. Set up the required environment variables in Railway dashboard
4. Deploy both frontend and backend services

## API Endpoints

### Tickets

- `POST /api/tickets` - Create a new ticket
- `GET /api/tickets` - Get tickets with pagination and filters
- `GET /api/tickets/export` - Export tickets to CSV

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.