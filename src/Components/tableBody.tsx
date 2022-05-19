import React, { Component } from "react";
import _ from "lodash";

interface TableBodyProps{
  data:any,
  columns:any
}

const TableBody :React.FC<TableBodyProps> = (props) => {
  const renderCell = (item:any, column:any) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item:any, column:any) => {
    return item._id + (column.path || column.key);
  };

  const { data, columns } = props;
  console.log("data", data);
  console.log("columns", columns);

  return (
    <tbody>
      {data?.map((item:any) => (
        <tr key={item._id}>
          {columns?.map((column:any) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
