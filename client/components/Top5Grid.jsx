import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
const ReactDataGrid = require('react-data-grid');

const { Toolbar, Filters: { NumericFilter, AutoCompleteFilter, MultiSelectFilter, SingleSelectFilter }, Data: { Selectors } } = require('react-data-grid-addons');

export default class Example extends Component {
  constructor(props, context) {
    super(props, context);
    this._columns = [
      {
        key: 'route',
        name: 'Route',
        width: 120,
        filterable: true,
        filterRenderer: MultiSelectFilter,
        sortable: true
      },
      {
        key: 'method',
        name: 'Method',
        filterable: true,
        filterRenderer: MultiSelectFilter,
        sortable: true
      },
      {
        key: 'numRequests',
        name: '# of Requests',
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      },
      {
        key: 'avgTime',
        name: 'Avg. Time',
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      }
    ];

    this.state = { rows: this.createRows(500), filters: {} };
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
  };

  createRows = (numberOfRows) => {
    let rows = [];
    for (let i = 1; i < numberOfRows; i++) {
      rows.push({
        route: ['Dogs', 'Cats', 'Kittens', 'Puppies'][Math.floor((Math.random() * 3) + 1)],
        method: ['GET', 'POST', 'DELETE', 'UPDATE'][Math.floor((Math.random() * 3) + 1)],
        numRequests: Math.round(Math.random() * 1000),
        avgTime: (Math.random() * 30).toFixed(2) + ' ms'
      });
    }
    return rows;
  };

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
      }
    };

    const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

    this.setState({ rows });
  };

  rowGetter = (index) => {
    return Selectors.getRows(this.state)[index];
  };

  rowsCount = () => {
    return Selectors.getRows(this.state).length;
  };

  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  getValidFilterValues = (columnId) => {
    let values = this.state.rows.map(r => r[columnId]);
    return values.filter((item, i, a) => { return i === a.indexOf(item); });
  };

  handleOnClearFilters = () => {
    this.setState({ filters: {} });
  };

  render() {
    return  (
      <ReactDataGrid
        enableCellSelect={true}
        onGridSort={this.handleGridSort}
        columns={this._columns}
        rowGetter={this.rowGetter}
        rowsCount={this.rowsCount()}
        minHeight={500}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange}
        getValidFilterValues={this.getValidFilterValues}
        onClearFilters={this.handleOnClearFilters} />);
  }
}