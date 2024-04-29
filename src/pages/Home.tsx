import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import TableData from "../components/TableData"

//Use this to determine what fields we want from each category. 
//Some fields are the same as their headers. For example, we can write additional logic to change some headers to snake case for value
//This can be improved by using lower case for some properties. 
export function headerData(category:string){
    switch(category){
        case 'films':
            return {
                'headers':['Name','Director','Release Date','Producer','Planets','Starships','Vehicles','Species'],
                'values': ['title','director','release_date','producer','planets','starships','vehicles','species']
            }
        case 'people':
            return {
                'headers':['Name','Gender', 'DOB'],
                'values':['name','gender','birth_year']
            }
        case 'planets':
            return {
                headers: ['Name','Population', 'Terrain', 'Gravity'],
                values: ['name','population','terrain','gravity']
            }
        case 'species':
            return {
                headers: ['Name','Language','Classification', 'Designation'],
                values: ['name','language','classification','designation']
            }
        case 'starships':
            return {
                headers: ['Name','Model','Manufacturer','Crew'],
                values: ['name', 'model','manufacturer','crew']
            }
        case 'vehicles':
            return {
                headers: ['Name','Model','Manufacturer'],
                values: ['name','model','manufacturer']
            }
        default: 
            return null
    }
}

function Home(){
    const {id = 'films'} = useParams()
    const {state} = useLocation()
    // Need to provide better typing here to remove any
    const[data, setData] = useState<any>([])

    const getData = async(url:string)=>{
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
    }

    useEffect(()=>{
        //Fetch the data from the api
        if(state !== null){
            getData(state.targetUrl)
        }else {
            getData('https://www.swapi.tech/api/films') // this can be stored in a config so we don't have to hardcode it
        }
    },[state])

    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="data table">
                            <TableHead>
                            <TableRow>
                                {headerData(id as string)?.headers?.map((header)=>{
                                    return (
                                        <TableCell key={header} align="center">{header}</TableCell>
                                    )
                                })}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableData tableData={data} id={id} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
      </Container>
    )
}
export default Home