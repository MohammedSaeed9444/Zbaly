import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  HStack,
  Text,
  Flex,
  useToast,
  Spinner,
  Center,
  SimpleGrid,
  FormControl,
  FormLabel,
  Tag,
  Badge
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from '@chakra-ui/icons';
import { getTickets, exportTickets } from '../api/ticketApi';
import { Ticket } from '../types/ticket';

const TicketDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const toast = useToast();

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getTickets(currentPage, reason, startDate, endDate);
      setTickets(response.tickets);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch tickets',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, reason, startDate, endDate, toast]);

  useEffect(() => {
    fetchTickets();
  }, [currentPage, reason, startDate, endDate, fetchTickets]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportTickets(reason, startDate, endDate);
      toast({
        title: 'Success',
        description: 'Tickets exported successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error exporting tickets:', error);
      toast({
        title: 'Error',
        description: 'Failed to export tickets',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Box p={6}>
      <Box mb={8}>
        <Text fontSize="xl" fontWeight="semibold" color="gray.700" mb={4}>
          Ticket Dashboard
        </Text>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          <FormControl>
            <FormLabel fontSize="sm">Filter by Reason</FormLabel>
            <Select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              bg="white"
              size="md"
              placeholder="All Reasons"
            >
              <option value="Harassment">Harassment</option>
              <option value="Drop">Drop</option>
              <option value="Bad behavior">Bad behavior</option>
              <option value="Took extra money">Took extra money</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">Start Date</FormLabel>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              bg="white"
              size="md"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize="sm">End Date</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              bg="white"
              size="md"
            />
          </FormControl>

          <Box alignSelf="flex-end">
            <Button
              onClick={handleExport}
              colorScheme="green"
              isLoading={isExporting}
              loadingText="Exporting..."
              width="full"
              leftIcon={<DownloadIcon />}
              size="md"
              boxShadow="sm"
              _hover={{ transform: 'translateY(-1px)', boxShadow: 'md' }}
            >
              Export CSV
            </Button>
          </Box>
        </SimpleGrid>
      </Box>

      {isLoading ? (
        <Center p={8}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
        </Center>
      ) : tickets.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.600">
            No tickets found
          </Text>
          <Text color="gray.500" mt={2}>
            Try adjusting your filters or create a new ticket
          </Text>
        </Box>
      ) : (
        <>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead bg="gray.50">
                <Tr>
                  <Th py={4}>Trip ID</Th>
                  <Th py={4}>Trip Date</Th>
                  <Th py={4}>Driver ID</Th>
                  <Th py={4}>Reason</Th>
                  <Th py={4}>City</Th>
                  <Th py={4}>Service Type</Th>
                  <Th py={4}>Customer Phone</Th>
                  <Th py={4}>Agent Name</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickets.map((ticket) => (
                  <Tr key={ticket.id} _hover={{ bg: 'gray.50' }}>
                    <Td fontWeight="medium">{ticket.tripId}</Td>
                    <Td>{new Date(ticket.tripDate).toLocaleDateString()}</Td>
                    <Td>#{ticket.driverId}</Td>
                    <Td>
                      <Tag
                        colorScheme={
                          ticket.reason === 'Harassment' ? 'red' :
                          ticket.reason === 'Drop' ? 'orange' :
                          ticket.reason === 'Bad behavior' ? 'yellow' :
                          'purple'
                        }
                      >
                        {ticket.reason}
                      </Tag>
                    </Td>
                    <Td>{ticket.city}</Td>
                    <Td>
                      <Badge
                        colorScheme={ticket.serviceType === 'Eco' ? 'green' : 'blue'}
                      >
                        {ticket.serviceType}
                      </Badge>
                    </Td>
                    <Td>{ticket.customerPhone}</Td>
                    <Td>{ticket.agentName}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          
          <Flex justify="space-between" align="center" mt={6} px={2}>
            <Text color="gray.600">
              Page {currentPage} of {totalPages}
            </Text>
            <HStack spacing={2}>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                isDisabled={currentPage === 1 || isLoading}
                size="md"
                variant="outline"
                leftIcon={<ChevronLeftIcon />}
              >
                Previous
              </Button>
              <Button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                isDisabled={currentPage === totalPages || isLoading}
                size="md"
                variant="outline"
                rightIcon={<ChevronRightIcon />}
              >
                Next
              </Button>
            </HStack>
          </Flex>
        </>
      )}

    </Box>
  );
};

export default TicketDashboard;