import {  useLocation, useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { List } from '@mui/material';

function MainMenu({items}:{items: object[]}){
    const categories = Object.keys(items)
    const navigate = useNavigate()
    const location = useLocation()

    return(
        <List component="nav">
        { categories.map((item:any,index:number)=>{
            return(
              <ListItemButton selected={location.pathname.includes(item)} key={index} onClick={()=>navigate(`/${item}`, {state: {targetUrl: items[item]}})}>
                <ListItemText primary={item} />
              </ListItemButton>
            )
        }) }
        </List>
    )
}
export default MainMenu