import React from 'react';
import { ChakraProvider, Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import TicketForm from './components/TicketForm';
import TicketDashboard from './components/TicketDashboard';

function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Box bg="white" borderBottom="1px" borderColor="gray.200" py={4} px={8} mb={8}>
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">
            CRM Ticketing System
          </Text>
        </Box>
        <Container maxW="container.xl" py={4}>
          <Box bg="white" borderRadius="xl" boxShadow="lg" overflow="hidden">
            <Tabs variant="enclosed" colorScheme="blue">
              <TabList bg="gray.50" borderBottomWidth="2px" p={2}>
                <Tab
                  _selected={{ bg: 'white', borderColor: 'blue.500' }}
                  fontWeight="medium"
                  px={6}
                  py={3}
                >
                  Create Ticket
                </Tab>
                <Tab
                  _selected={{ bg: 'white', borderColor: 'blue.500' }}
                  fontWeight="medium"
                  px={6}
                  py={3}
                >
                  View Tickets
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TicketForm />
                </TabPanel>
                <TabPanel>
                  <TicketDashboard />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;