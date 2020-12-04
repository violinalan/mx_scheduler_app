import './App.css';
import React from 'react';
import MxTicketList from './MxTicketList'
import AddRecurring from './AddRecurring';
import EditMenu from './EditMenu';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ticketList: [],
      aircraftList: [],
      componentList: [],
      currentSuspenseValue: "",
      currentComponentValue: "",
      currentTailNumValue: "",
      currentDescValue: "",
      currentEditSuspenseValue: "",
      currentEditComponentValue: "",
      currentEditTailNumValue: "",
      currentEditDescValue: "",
      isEdit: false,
      ticketToEdit: "",
    }
  }

  componentDidMount = () => {
    this.getAllTickets()
    this.getAllTailNumbers()
    this.getAllComponents()
  }

  fetchData = async (url, urlMethod) => {
    const response = await fetch(url, {method: urlMethod});
    const json = await response.json();
    return json;
  }

  getAllTickets = () => {
    this.fetchData('http://localhost:8080/tickets', 'GET').then(json => this.setState({ticketList:json}))
  }

  getAllTailNumbers = () => {
    this.fetchData('http://localhost:8080/tailnums', 'GET').then(json => this.setState({aircraftList:json}))
  }

  getAllComponents = () => {
    this.fetchData('http://localhost:8080/components', 'GET').then(json => this.setState({componentList:json}))
  }

  handleEdit = async (ticket) => {
    this.setState({isEdit: !this.state.isEdit})
    this.setState({ticketToEdit: ticket.id});
  }

  handleEditTask = async () => {
    const data = {
      aircraft_id: this.state.currentEditTailNumValue,
      component_name: this.state.currentEditComponentValue,
      suspense: this.state.currentEditSuspenseValue,
      description: this.state.currentEditDescValue,
    }

    await fetch(`http://localhost:8080/ticket/update/${this.state.ticketToEdit}`, 
                  { method: "POST",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }
          )
          .then(() => this.fetchData('http://localhost:8080/tickets', 'GET'))
          .then(json => this.setState({ticketList:json}))

    this.setState({
      isEdit: false,
      currentEditComponentValue:"",
      currentEditDescValue:"",
      currentEditSuspenseValue:"",
      currentEditTailNumValue:""
    })
  }

  handleDelete = async (id) => {
    this.fetchData(`http://localhost:8080/ticket/${id}`, 'DELETE')
    .then(() => this.fetchData('http://localhost:8080/tickets', 'GET'))
    .then(json => this.setState({ticketList:json}))
  }

  handleAddRecurring = async () => {
    const data = {
      aircraft_id: this.state.currentTailNumValue,
      component_name: this.state.currentComponentValue,
      suspense: this.state.currentSuspenseValue,
      description: this.state.currentDescValue,
    }

    await fetch(`http://localhost:8080/ticket/recurring`, 
                  { method: "POST",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                  }
          )
          .then(() => this.fetchData('http://localhost:8080/tickets', 'GET'))
          .then(json => this.setState({ticketList:json}))

    this.setState({
      currentComponentValue:"",
      currentDescValue:"",
      currentSuspenseValue:"",
      currentTailNumValue:""
    });
  }

  handleSuspenseChange = (event) => {
    this.setState({currentSuspenseValue: event.target.value});
  }

  handleComponentChange = (event) => {
    this.setState({currentComponentValue: event.target.value});
  }
  
  handleTailNumChange = (event) => {
    this.setState({currentTailNumValue: event.target.value});
  }

  handleDescChange = (event) => {
    this.setState({currentDescValue: event.target.value});
  }

  handleEditSuspenseChange = (event) => {
    this.setState({currentEditSuspenseValue: event.target.value});
  }

  handleEditComponentChange = (event) => {
    this.setState({currentEditComponentValue: event.target.value});
  }
  
  handleEditTailNumChange = (event) => {
    this.setState({currentEditTailNumValue: event.target.value});
  }

  handleEditDescChange = (event) => {
    this.setState({currentEditDescValue: event.target.value});
  }

  render() {
    let editMenu, addMenu;
    if(this.state.isEdit) {
      addMenu = "";
      editMenu = 
      <div><br/>
        <EditMenu 
          aircraftList = {this.state.aircraftList}
          componentList = {this.state.componentList}
          onEditSuspenseChange = {this.handleEditSuspenseChange}
          onEditComponentChange = {this.handleEditComponentChange}
          onEditTailNumChange = {this.handleEditTailNumChange}
          onEditDescChange = {this.handleEditDescChange}
          currentEditSuspenseValue = {this.state.currentEditSuspenseValue}
          currentEditComponentValue = {this.state.currentEditComponentValue}
          currentEditTailNumValue = {this.state.currentEditTailNumValue}
          currentEditDescValue = {this.state.currentEditDescValue}
          onEditTask = {this.handleEditTask}
          ticketToEdit = {this.state.ticketToEdit}
        />
      </div>
    } else {
      editMenu = "";
      addMenu = 
      <div>
        <AddRecurring 
          aircraftList = {this.state.aircraftList}
          componentList = {this.state.componentList}
          onSuspenseChange = {this.handleSuspenseChange}
          onComponentChange = {this.handleComponentChange}
          onTailNumChange = {this.handleTailNumChange}
          onDescChange = {this.handleDescChange}
          currentSuspenseValue = {this.state.currentSuspenseValue}
          currentComponentValue = {this.state.currentComponentValue}
          currentTailNumValue = {this.state.currentTailNumValue}
          currentDescValue = {this.state.currentDescValue}
          onAddRecurring = {this.handleAddRecurring}
        />
      </div>
    }
    

    return (
      <div>
        <h2>Maintenance Scheduler App</h2>
        <h4>Ticket List</h4>
        <MxTicketList 
          ticketList = {this.state.ticketList}
          onEdit = {this.handleEdit}
          onDelete = {this.handleDelete}
        />
        {editMenu}
        <br/>
        {addMenu}
      </div>
    );
  }
  
}

export default App;
