import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

//simple data example - Check out https://www.material-react-table.com/docs/examples/remote for a more complex example
const data = [
  {
    name: "John",
    age: 30
  },
  {
    name: "Sara",
    age: 25
  },
    {
    name: "Louis",
    age: 24
    
    },
    {
    name: "Elvis",
    age: 26
    }
];

export default function App() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //simple recommended way to define a column
        header: "Name",
        muiTableHeadCellProps: { sx: { color: "green" } }, //custom props
        Cell: ({ cell }) => <p className="">{cell.getValue()}</p> //optional custom cell render
      },
      {
        accessorFn: (row) => row.age, //alternate way
        id: "age", //id required if you use accessorFn instead of accessorKey
        header: "Age",
        Header: <i className="text-blue-400 font-bold font-sm">Age</i> //optional custom markup
      }
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data}  />;
}
