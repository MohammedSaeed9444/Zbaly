import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  VStack,
  useToast,
  Text,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { TicketFormData } from '../types/ticket';
import { createTicket } from '../api/ticketApi';

const TicketForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TicketFormData>();
  const toast = useToast();

  const onSubmit = async (data: TicketFormData) => {
    try {
      await createTicket(data);
      toast({
        title: 'Ticket created.',
        description: 'The ticket has been successfully created.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create ticket.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="3xl" mx="auto" p={8}>
      <VStack spacing={6} align="stretch">
        <Box borderBottom="2px" borderColor="gray.100" pb={4} mb={4}>
          <Text fontSize="xl" fontWeight="semibold" color="gray.700">
            Create New Ticket
          </Text>
          <Text color="gray.500" mt={1}>
            Fill in the details below to create a new support ticket.
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl isRequired isInvalid={!!errors.tripId}>
            <FormLabel>Trip ID</FormLabel>
            <Input
              {...register('tripId', { required: 'Trip ID is required' })}
              bg="white"
              variant="filled"
              placeholder="Enter trip ID"
            />
            {errors.tripId && <FormErrorMessage>{errors.tripId.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.tripDate}>
            <FormLabel>Trip Date</FormLabel>
            <Input
              type="date"
              {...register('tripDate', { required: 'Trip date is required' })}
              bg="white"
              variant="filled"
            />
            {errors.tripDate && <FormErrorMessage>{errors.tripDate.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.driverId}>
            <FormLabel>Driver ID</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.400">
                #
              </InputLeftElement>
              <Input
                type="number"
                {...register('driverId', {
                  required: 'Driver ID is required',
                  min: { value: 1, message: 'Driver ID must be a positive number' }
                })}
                bg="white"
                variant="filled"
                placeholder="Enter driver ID"
              />
            </InputGroup>
            {errors.driverId && <FormErrorMessage>{errors.driverId.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.reason}>
            <FormLabel>Reason</FormLabel>
            <Select
              {...register('reason', { required: 'Please select a reason' })}
              bg="white"
              variant="filled"
              placeholder="Select reason"
            >
              <option value="Harassment">Harassment</option>
              <option value="Drop">Drop</option>
              <option value="Bad behavior">Bad behavior</option>
              <option value="Took extra money">Took extra money</option>
            </Select>
            {errors.reason && <FormErrorMessage>{errors.reason.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.city}>
            <FormLabel>City</FormLabel>
            <Select
              {...register('city', { required: 'Please select a city' })}
              bg="white"
              variant="filled"
              placeholder="Select city"
            >
              <option value="Baghdad">Baghdad</option>
              <option value="Basra">Basra</option>
              <option value="Karbala">Karbala</option>
            </Select>
            {errors.city && <FormErrorMessage>{errors.city.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.serviceType}>
            <FormLabel>Service Type</FormLabel>
            <Select
              {...register('serviceType', { required: 'Please select a service type' })}
              bg="white"
              variant="filled"
              placeholder="Select service type"
            >
              <option value="Eco">Eco</option>
              <option value="Plus">Plus</option>
            </Select>
            {errors.serviceType && <FormErrorMessage>{errors.serviceType.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.customerPhone}>
            <FormLabel>Customer Phone</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" color="gray.400">
                +
              </InputLeftElement>
              <Input
                type="tel"
                {...register('customerPhone', {
                  required: 'Customer phone is required',
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: 'Please enter a valid phone number (10-11 digits)'
                  }
                })}
                bg="white"
                variant="filled"
                placeholder="Enter phone number"
              />
            </InputGroup>
            {errors.customerPhone && <FormErrorMessage>{errors.customerPhone.message}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.agentName}>
            <FormLabel>Agent Name</FormLabel>
            <Select
              {...register('agentName', { required: 'Please select an agent' })}
              bg="white"
              variant="filled"
              placeholder="Select agent"
            >
              <option value="Ahmed">Ahmed</option>
              <option value="Jack">Jack</option>
            </Select>
            {errors.agentName && <FormErrorMessage>{errors.agentName.message}</FormErrorMessage>}
          </FormControl>
        </SimpleGrid>

        <Box pt={6}>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            isLoading={isSubmitting}
            loadingText="Creating..."
            boxShadow="md"
            _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
            _active={{ transform: 'translateY(0)', boxShadow: 'md' }}
          >
            Create Ticket
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default TicketForm;