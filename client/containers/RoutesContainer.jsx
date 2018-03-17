import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDataGrid from "react-data-grid";
import TimeSelector from "../components/TimeSelector.jsx";

const {
  Toolbar,
  Filters: {
    NumericFilter,
    AutoCompleteFilter,
    MultiSelectFilter,
    SingleSelectFilter
  },
  Data: { Selectors }
} = require("react-data-grid-addons");

export default class RoutesContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetchData = this.fetchData.bind(this);
    this.redirectAnalytics = this.redirectAnalytics.bind(this);
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
        key: 'count(transaction_id)',
        name: '# of Requests',
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      },
      {
        key: 'avg(duration)',
        name: 'Avg. Time',
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      }
    ];

    this.state = { rows: [], filters: {} };
  }

  //data fetching
  fetchData(offset) {
    let datetime = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");
    // this.fetchStats(datetime);
    this.fetchRows(datetime);
  }

  fetchRows = date => {
    window
      .fetch(`http://localhost:3000/api/routes/${date}`)
      .then(res => res.json())
      .then(json => {
        console.log("herio", json);
        this.setState({
          rows: json
        });
      });
  };

  // Redirects to analytics page on row click. Needs to preserve history when clicking back button
  // Also first row doesn't redirect
  redirectAnalytics = (...args) => {
    console.log(...args);
    this.props.history.push(`${args[1].route}/${args[1].method}/hourofthewitch`);
  }

  getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
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
      <div>
        <div className="headerContainer">
          <h1 className="name">Routes</h1>
          <div className="timeSelector">
            {/* Pass in cb which gets invoked whenever a time selection is made */}
            <TimeSelector cb={this.fetchData} />
          </div>
        </div>
        <div>
          <ReactDataGrid
            enableCellSelect={false}
            // This function redirects to the invidual route
            // When the analytics page is rendered it will make a request for the data

            // On row select invoke a function with route data passed as parameter
            onRowClick={this.redirectAnalytics}
            onGridSort={this.handleGridSort}
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.rowsCount()}
            minHeight={500}
            toolbar={<Toolbar enableFilter={true}/>}
            onAddFilter={this.handleFilterChange}
            getValidFilterValues={this.getValidFilterValues}
            onClearFilters={this.handleOnClearFilters} />
        </div>
      </div>
    )
  };
}
