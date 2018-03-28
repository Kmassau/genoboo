import React from 'react';

import Select from 'react-select';

import { Dropdown, DropdownButton, DropdownMenu } from '/imports/ui/util/Dropdown.jsx';

import './geneTableHeader.scss';

const VALUE_QUERY_TYPES = [
  {label: 'Equals', value: 'equals'},
  {label: 'Does not equal', value: 'notEquals'},
  {label: 'Contains', value: 'contains'},
  {label: 'Does not contain', value: 'notContains'}
]

const PRESENCE_QUERY_TYPES = [
  {label: 'Present', value: 'present'},
  {label: 'Not present', value: 'notPresent'},
  {label: 'Either', value: 'either'}
]

class HeaderElement extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      valueQuery: '',
      valueQueryType: 'equals',
      presenceQueryType: 'either'
    }
  }

  selectPresenceQueryType = event => {
    const queryType = event.target.id;
    this.setState({
      presenceQueryType: queryType
    })
  }

  selectValueQueryType = selection => {
    const queryType = selection ? selection.value : 'equals';
    this.setState({
      valueQueryType: queryType
    })
  }

  updateValueQuery = event => {
    this.setState({
      valueQuery: event.target.value
    })

  }

  render(){
    console.log(this.props)
    const {label, ...props} = this.props;
    const hasQuery = this.state.valueQueryType !== 'equals' || this.state.presenceQueryType !== 'either';
    const buttonClass = hasQuery ? 'btn-success' : 'btn-outline-dark';
    const orientation = label === 'Gene ID' ? 'left' : 'right';
    return (
      <th scope="col">
        <div className='btn-group'>
          <button className={`btn btn-sm ${buttonClass}`} type="button" disabled>
            <strong>{label}</strong>
          </button>
          <Dropdown>
            <DropdownButton className={`btn btn-sm dropdown-toggle ${buttonClass}`}/>
            <DropdownMenu className={`dropdown-menu dropdown-menu-${orientation} px-2`}>
              <h6 className="dropdown-header">Select query</h6>
              <div className="btn-group" role="group">
                {
                  PRESENCE_QUERY_TYPES.map(({label, value}) => {
                    const active = value === this.state.presenceQueryType ? 'active' : '';
                    return (
                      <button 
                        key={value} 
                        id={value} 
                        className={`btn btn-sm btn-outline-light ${value} ${active}`}
                        onClick={this.selectPresenceQueryType}>
                        {label}
                      </button>
                    )
                  })
                }
              </div>
              <div className="dropdown-divider" />
              <Select
              className='form-control-sm px-0' 
              value={this.state.valueQueryType}
              options={VALUE_QUERY_TYPES}
              onChange={this.selectValueQueryType} />
              <textarea className="form-control" onChange={this.updateValueQuery} value={this.valueQuery}/>
              <div className="dropdown-divider" />
              <button type="button" className="btn btn-sm btn-outline-dark pull-right">
                <span className="fa fa-times-circle" /> Remove column
              </button>
            </DropdownMenu>
          </Dropdown>
        </div>
      </th>
    )
  }
}

const GeneTableHeader = ({ selectedColumns, ...props }) => {
  return (
    <thead>
      <tr>
        <HeaderElement label='Gene ID' />
        {
          Array.from(selectedColumns).map(column => {
            return (
              <HeaderElement key={column} label={column} {...props} />
            )
          })
        }
        <th scope="col">Gene model</th>
        <th scope="col"><div className="pull-right">Select</div></th>
      </tr>
    </thead>
  )
}

export default GeneTableHeader;