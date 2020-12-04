import React from 'react'

function AddRecurring(props) {
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
            <h4>Add Recurring Maintenance Task</h4>
            <label>Suspense: </label>
            <input type="text" placeholder="Enter Suspense" onChange={props.onSuspenseChange} value={props.currentSuspenseValue} /><br/>
            <label>Tail Number: </label>
            <select placeholder="Enter Tail Number" onChange={props.onTailNumChange} value={props.currentTailNumValue}>
                <option value=""></option>
                {tailNumOptionList}
            </select><br/>
            <label>Component: </label>
            <select placeholder="Enter Component" onChange={props.onComponentChange} value={props.currentComponentValue}>
                <option value=""></option>
                {componentList}
            </select><br/>
            <label>Description: </label>
            <input type="text" placeholder="Enter Description" onChange={props.onDescChange} value={props.currentDescValue} /><br/>
            <button type="button" onClick={props.onAddRecurring}>Add Maintenance Task</button>
        </div>
        
    );
}

export default AddRecurring