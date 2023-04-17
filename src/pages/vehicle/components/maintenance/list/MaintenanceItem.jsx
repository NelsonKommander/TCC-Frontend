import {Grid, IconButton, ListItem, Menu, MenuItem, Typography} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState} from "react";
import Modal from "../../../../../components/modal/Modal";
import UpdateMaintenanceForm from "../form/UpdateMaintenanceForm";
import moment from "moment/moment";

export default function MaintenanceItem(props)
{
    function Menuzinho()
    {
        const [anchorElement, setAnchorElement] = useState(null);
        const menuOpen = Boolean(anchorElement);
        const [showModal, setShowModal] = useState(false);
        
        function handleClick(event)
        {
            setAnchorElement(event.currentTarget);
        }

        const handleCloseModal = () => {
          setShowModal(false);
        };
        
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
                  <MenuItem onClick={() => setShowModal(true)}>
                      <div>Editar</div>
                  </MenuItem>
                  <MenuItem>
                      <div>Excluir</div>
                  </MenuItem>
              </Menu>
              <Modal open={showModal} handleClose={handleCloseModal}>
                  <UpdateMaintenanceForm
                      index={props.index}
                      bodyShop={props.bodyShop}
                      contract={props.contract}
                      date={props.date}
                      description={props.description}
                      mileage={props.mileage}
                      handleBack={handleCloseModal}/>
              </Modal>
          </>
      );  
    }
    return(
        <>
            <ListItem key={props.key} divider={true}>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Typography align="left" variant="h6">
                            {props.bodyShop}
                        </Typography>
                        <Typography>
                            {moment.unix(props.date).format("L")} - {props.mileage}km
                        </Typography>
                        <Typography align="left" varitant="body">
                            {props.description}
                        </Typography>
                    </Grid>
                    {props.showMenu && <Grid item xs={2}>
                        <Menuzinho contract={props.contract}/>
                    </Grid>}
                </Grid>
            </ListItem>
        </>
    );
}