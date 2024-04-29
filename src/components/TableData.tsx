import { TableRow, TableCell, Typography, Box, Link } from "@mui/material";
import { headerData } from "../pages/Home";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TableData({
  tableData,
  id,
}: {
  tableData: any; // can be typed using response but for interest of time use any
  id: string;
}) {
  const [resultsArray, setResultsArray] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetailedData = async () => {
      setLoading(true);
      //The api isn't consistent in return either result or results so we have to determine which one to use
      if (id !== "films" && tableData.results) {
        const updatedArray = await Promise.all(
        tableData.results.map(async (result: { url: RequestInfo | URL }) => {
            const response = await fetch(result.url);
            const data = await response.json();
            const newData = { ...result, properties: data.result.properties };
            return newData;
          })
        );
        setResultsArray(updatedArray);
        setLoading(false);
      } else {
        setResultsArray(tableData.result);
        setLoading(false);
      }
    };
    fetchDetailedData();
  }, [id, tableData]);

  //ideally we can include a spinner here while the api is fetching
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      {resultsArray &&
        resultsArray.map((row: any) => { // propert typing needed
          return (
            <TableRow
              key={row.uid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() =>{
                navigate(
                  `/${id}/${ id === 'films' ? row.properties.title : row.properties.name}`,
                  { state: { data: row } }
                )
              }
            }
            >
              {headerData(id as string)?.values.map((cell: any) => {

                const isNested = Array.isArray(row["properties"][cell]);
                return (
                  <TableCell component="th" scope="row" key={cell}>
                    {isNested
                      ? row["properties"][cell].map((cellInfo: string,index: number) => {
                        const cellInfoPath = cellInfo.replace('https://www.swapi.tech/api/','')
                          return (
                              <Box style={{ display: "block" }} key={index}>
                                <Link
                                  component="button"
                                  variant="body2"
                                  display={"block"}
                                  onClick={(e) => {
                                    navigate(`/${cellInfoPath}`,{ state: {targetUrl: 'new' }})
                                    e.stopPropagation()
                                  }}
                                >
                                  {cellInfoPath.replace('/',' ')}
                                </Link>
                                <br />
                              </Box>
                          );
                        })
                      : row["properties"][cell]}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </>
  );
}

export default TableData;
