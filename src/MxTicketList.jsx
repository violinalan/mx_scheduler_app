import React from 'react'

function MxTicketList(props) {
    let list = props.ticketList
        .map(ticket => {
        return (
            <tr>
                <td>{ticket.id}</td>
                <td>{ticket.created_by}</td>
                <td>{ticket.start}</td>
                <td>{ticket.suspense}</td>
                <td>{ticket.closed}</td>
                <td>{ticket.closed_by}</td>
                <td>{ticket.is_scheduled ? 'True' : 'False'}</td>
                <td>{ticket.component_name}</td>
                <td>{ticket.aircraft_model}</td>
                <td>{ticket.tail_number}</td>
                <td>{ticket.location}</td>
                <td>{ticket.description}</td>
                <td><button type="button" onClick={() => props.onEdit(ticket)}>Edit</button></td>
                <td><button type="button" onClick={() => props.onDelete(ticket.id)}>Delete</button></td>
            </tr>
        );
    });
    
    return (
        <table>
            <tr>
                <th>Ticket ID</th>
                <th>Created By</th>
                <th>Start</th>
                <th>Suspense</th>
                <th>Closed</th>
                <th>Closed By</th>
                <th>Is Scheduled</th>
                <th>Component</th>
                <th>Aircraft Model</th>
                <th>Tail Number</th>
                <th>Location</th>
                <th>Description</th>
                <th></th>
                <th></th>
            </tr>
            {list}
        </table>
    )
}

export default MxTicketList