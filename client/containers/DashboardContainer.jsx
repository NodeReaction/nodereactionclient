import React, { Component } from "react";
const ReactDataGrid = require("react-data-grid");
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
import Paper from "material-ui/Paper";
import TimeSelector from "../components/TimeSelector.jsx";
import DashboardCard from "../components/DashboardCard.jsx";

export default class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      response_time: null,
      requests: null,
      throughput: null,
      rows: []
    };
    this._columns = [
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
        width: 150,
        filterable: true,
        filterRenderer: MultiSelectFilter,
        sortable: true
      },
      {
        key: "total_requests",
        name: "Requests",
        width: 150,
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      },
      {
        key: "avg_duration",
        name: "Average Time",
        width: 150,
        filterable: true,
        filterRenderer: NumericFilter,
        sortable: true
      }
    ];
  }

  //data fetching
  fetchData(i) {
    this.props.setTimeRangeSelected(i);
    let offset = this.props.timeRanges[i].offset;
    let datetime = new Date(Date.now() - offset)
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");
    this.fetchStats(this.props.app_id, datetime);
    this.fetchRows(this.props.app_id, datetime);
  }

  fetchStats = (app_id, date) => {
    window
      .fetch(`/api/dashboard/stats/${app_id}/${date}`)
      .then(res => res.json())
      .then(json => {
        let data = json[0];
        this.setState({
          response_time: data.avg_duration,
          requests: data.total_requests,
          throughput: ""
        });
      });
  };

  fetchRows = (app_id, date) => {
    window
      .fetch(`/api/dashboard/top/${app_id}/${date}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          rows: json
        });
      });
  };

  //Grid functions
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
    let str = args[1].route.slice();
    let newStr = str.replace(/\//g, "%2f");
    newStr = "/" + newStr.slice(3);
    this.props.history.push(`analytics/${newStr}/${args[1].method}`);
  };

  render() {
    const responseTime = (this.state.response_time === null)? 'no data' : parseFloat(this.state.response_time).toFixed(3) + ' ms average';
    return (
      <div className="pageContainer">
        <div className="pageHeaderContainer">
          <h1 className="pageHeader">{this.props.app_name} - Dashboard</h1>
          <div className="timeSelector">
            <TimeSelector cb={this.fetchData} timeRanges={this.props.timeRanges}
              timeRangeSelected={this.props.timeRangeSelected}/>
          </div>
        </div>
        <div className="dashboardCards">
          <DashboardCard title="Total Requests" value={this.state.requests} />
          <DashboardCard
            title="Response Time"
            value={responseTime}
          />
          <DashboardCard
            title="Average Throughput"
            value={this.state.throughput + ' rpm'}
          />
        </div>

        <div className="top5Grid">
          <div>
            <h2>Routes - Top 5</h2>
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
                  minHeight={300}
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
      </div>
    );
  }
}
