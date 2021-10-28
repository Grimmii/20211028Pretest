import React , {Component , useEffect , useState} from 'react';
import { useTable} from 'react-table'
import './App.css';
import styled from 'styled-components'

const axios = require('axios')

const Styles = styled.div`
  padding: 1rem;
  width : 50%;
  margin : auto;
  table {
    border-spacing: 0;
    border: 1px solid black;
    width : 100%;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}


function App() {
  const [data , setData] = useState([]);
  const [displayData , setDisplayData] = useState([]);

  const containerStyle = {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    width : '100%',                                 
    height : '100%',
    display : 'flow-root',
  }

  const inputContainerStyle = {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    margin : 'auto',
    width : '30%',
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Category',
        accessor : row => row,
      },
    ],
    []
  )


  function onChangeSearchTerm (e) {
    const keyword = e?.target?.value?.toLowerCase()
    console.log(keyword)
    if (!keyword){
      setDisplayData([])
      return false;
    }
    console.log(data)
    const filtered = data.filter(e=> e.toString().toLowerCase().includes(keyword))
    console.log(filtered);
    setDisplayData(filtered)

  }

  useEffect(async () =>{
    const {data} = await axios.get('https://api.publicapis.org/categories');
    setData(data);
  },[]);


  return (
    <div style={containerStyle} >
      <div  style={inputContainerStyle}>
        <input
        onChange={onChangeSearchTerm}
        placeholder="Search term"
        size="50"
        />
      </div>
      <Styles>
        <Table columns={columns} data={displayData?.length ? displayData :  data} />
      </Styles>
    </div>
  );
  
}

export default App;