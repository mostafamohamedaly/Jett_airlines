import React from 'react'
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function FlightDetails(props) {
    const flight=props.flight
    const diffMs = (new Date(flight.arrivalDate) - new Date(flight.departureDate));
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return (
        <div>
            <Card sx={{ maxWidth: 500 }}>
                <CardActionArea>
                    <AirplaneTicketIcon color="primary" sx={{ fontSize: 150 }} />
                    <CardContent>
                    <Typography gutterBottom variant="h5" sx={{ fontStyle: 'oblique' }}>
                            Flight Number: {flight.flightNumber}
                            <br/>
                            Terminal: {flight.airportTerminal}
                            <br/>
                            From: {flight.from}                         
                            <br/>
                            To: {flight.to}
                            <br/>
                            Departure Date: {new Date(flight.departureDate).toLocaleString()}
                            <br/>
                            Arrival Date: {new Date(flight.arrivalDate).toLocaleString()}
                        </Typography>
                        <p>-------------------------------------------------------------------------------------</p>
                        <Typography variant="body2" color="text.secondary">
                            Available Economy Seats: {flight.availableEconomySeats}
                            <br/>
                            Available Business Seats: {flight.availableBusinessSeats}
                            <br/>
                            Available First Class Seats: {flight.availableFirstSeats}
                            <br/>
                            Total of Available Seats: {flight.availableTotalSeats}
                            <br/>
                            Trip Duration: {diffHrs} Hours {diffMins} Minutes
                            <br/>
                            Baggage Allowance: {flight.baggageAllowance}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}