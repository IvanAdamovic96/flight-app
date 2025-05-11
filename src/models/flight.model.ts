export interface FlightModel{
    id: number,
    type: {
        id: number,
        name: string
    },
    flightKey: string,
    flightNumber: string,
    destination: string,
    scheduledAt: string,
    estimatedAt: string,
    connectedType: number,
    connectedFlight: string,
    plane: string,
    gate: string,
    terminal: number

}