-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "tripId" TEXT NOT NULL,
    "tripDate" TIMESTAMP(3) NOT NULL,
    "driverId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
