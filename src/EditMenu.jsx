import React from 'react'

function EditMenu(props) {
    const componentList = props.componentList
    .map(component => {
        return (
            <option value={component.component_id}>{component.component_name}</option>
        )
    })

    const tailNumOptionList = props.aircraftList
    .map(aircraft => {
        return (
            <option value={aircraft.aircraft_id}>{aircraft.tail_number}</option>
        )
    })

    return (
        <div>
            <h4>Edit Ticket {props.ticketToEdit}</h4>
            <label>Suspense: </label>
            <input type="text" placeholder="Enter Suspense" onChange={props.onEditSuspenseChange} value={props.currentEditSuspenseValue} /><br/>
            <label>Tail Number: </label>
            <select placeholder="Enter Tail Number" onChange={props.onEditTailNumChange} value={props.currentEditTailNumValue}>
                <option value=""></option>
                {tailNumOptionList}
            </select><br/>
            <label>Component: </label>
            <select placeholder="Enter Component" onChange={props.onEditComponentChange} value={props.currentEditComponentValue}>
                <option value=""></option>
                {componentList}
            </select><br/>
            <label>Description: </label>
            <input type="text" placeholder="Enter Description" onChange={props.onEditDescChange} value={props.currentEditDescValue} /><br/>
            <button type="button" onClick={props.onEditTask}>Update Maintenance Task</button>
        </div>
        
    );
}

export default EditMenu