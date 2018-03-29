import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactDataGrid from "react-data-grid";
import Paper from "material-ui/Paper";
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

export default class TracesContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.fetchData = this.fetchData.bind(this);
    this._columns = [
      {
        key: "library",
        name: "Module",
        width: 120,
        filterable: true,
        filterRenderer: MultiSelectFilter,
        sortable: true
      },
      {
        key: "type",
        name: "Function",
        width: 120,
        filterable: true,
        filterRenderer: MultiSelectFilter,
        sortable: true
      },
      {
        key: "route",
        name: "Route",
        filterable: true,
        filterRenderer: MultiSelectFilter,
        sortable: true
      },
      {
        key: "method",
        name: "Method",
        width: 120,
        filterable: true,
        filterRenderer: MultiSelectFilter,
        sortable: true
      },
      {
        key: "avg_duration",
        name: "Avg. Time",
        width: 120,
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      },
      {
        key: "total_requests",
        name: "# of Calls",
        width: 120,
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      }
    ];

    this.state = { rows: [], filters: {} };
  }

  fetchData(offset) {
    let datetime = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");
    this.fetchRows(this.props.app_id, datetime);
  }

  fetchRows = (app_id, date) => {
    window
      .fetch(`/api/traces/${app_id}/${date}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({ rows: json });
      });
  };

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === "ASC") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === "DESC") {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };

    const rows =
      sortDirection === "NONE"
        ? this.state.originalRows.slice(0)
        : this.state.rows.sort(comparer);

    this.setState({ rows });
  };

  rowGetter = index => {
    return Selectors.getRows(this.state)[index];
  };

  rowsCount = () => {
    return Selectors.getRows(this.state).length;
  };

  handleFilterChange = filter => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  getValidFilterValues = columnId => {
    let values = this.state.rows.map(r => r[columnId]);
    return values.filter((item, i, a) => {
      return i === a.indexOf(item);
    });
  };

  handleOnClearFilters = () => {
    this.setState({ filters: {} });
  };

  redirectAnalytics = (...args) => {
    console.log("muh args", args);
    let str = args[1].route.slice();
    let newStr = str.replace(/\//g, "%2f");
    newStr = "/" + newStr.slice(3);
    this.props.history.push(`${newStr}/${args[1].method}`);
  };

  render() {
    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageTitle">Application Name - Traces</h1>
          <div className="timeSelector">
            {/* Pass in cb which gets invoked whenever a time selection is made */}
            <TimeSelector cb={this.fetchData} />
          </div>
        </div>
        <div>
          <Paper
            children={
              <ReactDataGrid
                enableCellSelect={false}
                onGridSort={this.handleGridSort}
                columns={this._columns}
                rowGetter={this.rowGetter}
                rowsCount={this.rowsCount()}
                minHeight={500}
                toolbar={<Toolbar enableFilter={true} />}
                onAddFilter={this.handleFilterChange}
                getValidFilterValues={this.getValidFilterValues}
                onClearFilters={this.handleOnClearFilters}
                onRowClick={this.redirectAnalytics}
              />
            }
          />
        </div>
      </div>
    );
  }
}
