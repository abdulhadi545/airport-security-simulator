
# Airport Baggage Security Simulator

Interactive web application modeling airport security checkpoints with data structures and real-time simulation.

## Project Overview

This application simulates the process of baggage screening at an airport security checkpoint, complete with:

- Passenger queue management using FIFO (First In, First Out)
- Baggage scanning using a LIFO (Last In, First Out) stack
- Blacklist checking using a Linked List
- Real-time visualization of the security screening process
- Comprehensive logging and reporting

## Key Features

- **Dynamic Passenger Queue**: Visualize passengers waiting to be processed
- **Interactive Baggage Scanning**: Item-by-item scanning with danger detection
- **Blacklist Checking**: Real-time passport verification against blacklist
- **Live Log Updates**: Track system events and alerts
- **Statistics Tracking**: Monitor security metrics and performance
- **CSV Report Export**: Export simulation results for analysis

## Data Structures Implemented

- **Queue (FIFO)**: For passenger processing order
- **Stack (LIFO)**: For baggage item scanning
- **Linked List**: For blacklist lookup and verification

## Technologies Used

- React + TypeScript for the frontend
- Tailwind CSS for styling
- Framer Motion for animations
- Shadcn/UI components
- UUID for unique identifiers

## How to Use the Simulator

1. **Load Sample Data**: Click "Load Data" to populate the simulation with 30 random passengers
2. **Add Passengers**: Use "New Passenger" to add individual passengers
3. **Start Simulation**: Click "Start Simulation" to process the next passenger in queue
4. **Monitor Logs**: Watch real-time security logs during processing
5. **Export Reports**: Generate CSV reports with simulation statistics

## Simulation Flow

1. Passenger is taken from the queue
2. Passport is checked against the blacklist
3. If blacklisted, an alert is generated
4. If not blacklisted, baggage scanning begins
5. Each item in the baggage is scanned for dangerous items
6. Alerts are generated for any dangerous items found
7. Passenger processing completes with appropriate status

## Project Structure

- `src/components/`: UI components for the application
- `src/utils/`: Utility functions and data structure implementations
- `src/models/`: TypeScript interfaces and data models
- `src/pages/`: Application pages and routing

## Future Enhancements

- Dark mode support
- Additional security checkpoint stations
- Machine learning for threat detection
- Multi-language support
- Mobile responsiveness improvements

## License

MIT License

