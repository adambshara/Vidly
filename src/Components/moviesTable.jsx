import { assert } from "joi";
import React, { Component } from "react";
import { Link } from "react-router-dom";

//import { propTypes } from "react-bootstrap/esm/Image";
import Table from "./table";

class MoviesTable extends Component {
  state = {
    columns: [
      {
        path: "title",
        label: "Title",
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
    ],
  };

  componentDidMount() {
    if (this.props.isAuthorized) {
      let cols = [...this.state.columns];

      cols.push({
        key: "delete",
        content: (movie) => (
          <button onClick={() => this.props.onDelete(movie)} className="button">
            Delete
          </button>
        ),
      });

      this.setState({ columns: cols });
    }
  }

  render() {
    const { movies, onDelete, onSort, sortColumn } = this.props;

    console.log("isAuthorized", this.props.isAuthorized);
    console.log("columns", this.state.columns);

    // we have to add here this because props isn't a parametere
    return (
      <Table
        columns={this.state.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
