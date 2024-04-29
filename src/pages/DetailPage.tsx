import { Box, Container, Divider, Grid, List, ListItem, ListItemText, Paper, Typography} from "@mui/material"
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"


function DetailPage(){
    const {state} = useLocation()
    const location = useLocation()

    const[data, setData] = useState<any>([])

    const getData = async(url:string)=>{
        const response = await fetch(url)
        const data = await response.json()
        setData(data.result.properties)
    }

    
    useEffect(()=>{
        //Fetch the data from the api
        if(state && state.targetUrl === 'new'){
            getData('https://www.swapi.tech/api'+location.pathname)
        }
    },[location, state])

    const renderObject = (item:any) => {
        if (Array.isArray(item)) {
          return (
            <List>
              {item.map((element, index) => (
                <ListItem key={index} disableGutters>
                  {renderObject(element)}
                </ListItem>
              ))}
            </List>
          );
        } else if (typeof item === 'object' && item !== null) {
          return (
            <Paper style={{ padding:10}}>
            <List>
              {Object.entries(item).map(([key, value], index) => (
                <React.Fragment key={key + index}>
                  <ListItem disableGutters>
                    <ListItemText primary={key.replace('_',' ')} secondary={renderObject(value)} />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            </Paper>

          );
        } else {
          return <Typography variant="body2">{item.toString()}</Typography>;
        }
      };

    return(
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box style={{padding:10}} >
            {renderObject(state.data ? state.data.properties:data)}
            </Box>
          </Grid>
        </Grid>
      </Container>
    )
}

export default DetailPage