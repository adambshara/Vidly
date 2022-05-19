import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

interface TableProps{
  
}

const Table : React.FC<TableProps>= (props:any) => {
  const { columns, sortColumn, onSort, data } = props;
  return (
    <table className="table">
      <TableHeader
        columns={columns}
        // columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody
        data={data} // data={movies}
        columns={columns}
      />

      {/* <tbody>
      {movies.map((x) => {
        return (
          <tr key={x._id}>
            <td>{x.title}</td>
            <td>{x.genre.name}</td>
            <td>{x.numberInStock}</td>
            <td>{x.dailyRentalRate}</td>
            <button
              onClick={() => onDelete(x._id)}
              //onClick={() => this.deletemovies(x._id)}
              //we will put it as onDelete insted of this.delete
              className="button"
            >
              Delete
            </button>
          </tr>
        );
      })}
    </tbody> */}
    </table>
  );
};

export default Table;
