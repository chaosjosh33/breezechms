import React, { Component } from 'react'
import { Table, Header } from 'semantic-ui-react'
import CSVUpload from './CSVUpload'
import { bulkAddOrUpdate } from './functions/apiUtils'

class ResultsList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] , groups: [{id:0,group_name: 'Unassigned'}]};
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        fetch("http://localhost:8000/api/people")
            .then(response => response.json())
            .then(data => this.setState({ data: data.data }));
        fetch("http://localhost:8000/api/groups")
            .then(response => response.json())
            .then(data => this.setState({ groups: data.data }));
    }

    async handleChange(endpoint,data) {
        let response = await bulkAddOrUpdate(endpoint,data)
        if (response instanceof Error) {
            alert(response)
        } else {
            fetch("http://localhost:8000/api/people")
                .then(response => response.json())
                .then(data => this.setState((state, props) => ({ data: data.data })));
            fetch("http://localhost:8000/api/groups")
                .then(response => response.json())
                .then(data => this.setState({ groups: data.data }));
        }
    }

    render() {
        var data = this.state.data || [];
        var groups = this.state.groups || [{id:0,group_name:'Unassigned'}];

      return (
          <div>
              <CSVUpload toggleChange={this.handleChange} />
              {
                  groups.filter(group => {
                      if(group.id === 1) return group
                      return data.find(person => person.group_id === group.id)
                  }).map((group, index) => {
                      return (
                          <div key= { index }>
                            <Header as='h2' style={{ marginTop: 8 }}>{group.group_name}</Header>
                            <Table celled padded>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell singleLine>First Name</Table.HeaderCell>
                                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>

                                    {
                                        data.filter(person => person.group_id === group.id).map((person, index) => {
                                            return (
                                                <Table.Row key={index}>
                                                    <Table.Cell singleLine>{person.first_name}</Table.Cell>
                                                    <Table.Cell singleLine>{person.last_name}</Table.Cell>
                                                    <Table.Cell singleLine>{person.email_address}</Table.Cell>
                                                    <Table.Cell singleLine>{person.status}</Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    }

                                </Table.Body>
                            </Table>
                         </div>
                    )
                  })
              }
          </div>
    );
}

}

export default ResultsList
