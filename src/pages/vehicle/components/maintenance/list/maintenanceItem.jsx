import {Grid, IconButton, ListItem, Menu, MenuItem, Typography} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";

export default function MaintenanceItem(props)
{
    function Menuzinho()
    {
        const [anchorElement, setAnchorElement] = useState(null);
        const menuOpen = Boolean(anchorElement);
        
        function handleClick(event)
        {
            setAnchorElement(event.currentTarget);
        }
        
      return (
          <>
              <IconButton
                  onClick={handleClick}
                  aria-controls={menuOpen ? "long-menu" : undefined}
                  aria-expanded={menuOpen ? "true" : undefined}
                  aria-haspopup="true"
              >
                    <MoreVertIcon/>
              </IconButton>
              <Menu anchorEl={anchorElement} open={menuOpen} onClose={() => setAnchorElement(null)}>
                  <MenuItem>
                      <div>Editar</div>
                  </MenuItem>
                  <MenuItem>
                      <div>Excluir</div>
                  </MenuItem>
              </Menu>
          </>
      );  
    }
    
    return(
        <>
            <ListItem key={props.key} divider={true}>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Typography align="left" variant="h6">
                            {props.localizacao} - {props.data.format("L")}
                        </Typography>
                        <Typography align="left" varitant="body">
                            {props.descricao}
                        </Typography>
                    </Grid>
                    {props.exibirMenu && <Grid item xs={2}>
                        <Menuzinho/>
                    </Grid>}
                </Grid>
            </ListItem>
        </>
    );
}