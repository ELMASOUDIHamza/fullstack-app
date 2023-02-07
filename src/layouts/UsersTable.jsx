import * as React  from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button,Paper,TableRow,TableHead,TableContainer,TableCell,tableCellClasses,
   TableBody,Table,styled,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,Slide} from '@mui/material';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/system';
import SuccessSnackbar from './SuccessSnackbar';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function UsersTable () {
  // AXIOS
  const [infos, setInfos] = useState([]);
  const linkStyle = {textDecoration: 'none'}

  const fetchUsers = async() => {
      const resp = await axios.get("http://localhost:8080/users");
      setInfos(resp.data);
  }

  useEffect( () => {fetchUsers() } , []);
////////////////////////////////////////////////////////////////////////////////
 const [open, setOpen] = useState(false);
 // const [code, setCode] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userId, setUserId] = useState(-1);
  const confirmDeleting = async() => {
          await axios.delete(`http://localhost:8080/users/${userId}`);
          fetchUsers();
          setOpenSnackbar(true); 
          setOpen(false);  
      }

//////////////////////////////////////////////////////////////////////////////////
  return (
    <>


    <TableContainer component={Paper} elevation={24} >
      <Table sx={{ minWidth: 500, alignItems: "center" }} aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align='center' >Identifiant</StyledTableCell>
            <StyledTableCell align='center' >Username</StyledTableCell>
            <StyledTableCell align='center' >Fullname</StyledTableCell>
            <StyledTableCell align='center' colSpan={2}>Email</StyledTableCell>
            <StyledTableCell align='center' colSpan={2} >Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {infos.map((user) => (      
            <StyledTableRow key={user.id} >


              <StyledTableCell align='center' >{user.id} </StyledTableCell>
              <StyledTableCell align='center' >{user.username}</StyledTableCell>
              <StyledTableCell align='center' >{user.fullname}</StyledTableCell>
              <StyledTableCell align='center' colSpan={2} >{user.email}</StyledTableCell>
              <StyledTableCell align='center' colSpan={2} >
                <Stack spacing={0.3} direction='row' >
                  <Link to={`/profile/${user.id}`} style={linkStyle} >
                     <Button variant='contained' color='primary' size='small' sx={{width: '70px'}} >Visit</Button> 
                  </Link>
                  <Link to={`/editUser/${user.id}`} style={linkStyle} >
                    <Button variant='contained' color='success' size='small' sx={{width: '70px'}}>Update</Button> 
                  </Link>
                  
                  <Button onClick={ ()=> { 
                        setOpen(true)
                        setUserId(user.id) 
                   }}
                    variant='contained' color='error' size='small' sx={{width: '70px'}}>Delete</Button>
                </Stack>
                  
              </StyledTableCell>
            


              </StyledTableRow>
          ))}
  
        </TableBody>
      </Table>
    </TableContainer>
    {openSnackbar ? <SuccessSnackbar text="User has been deleted !" severity="warning" /> : '' }
      
  <Dialog
open={open}
TransitionComponent={Transition}
keepMounted
onClose={()=> setOpen(false)}
aria-describedby="alert-dialog-delete-user"
>
<DialogTitle>{"Warning !"}</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-delete-user">
    Do you want really delete this user ? This action is irreversible
  </DialogContentText>
</DialogContent>
<DialogActions>
<Button onClick={()=>setOpen(false)} variant='contained' color='primary' >Cancel</Button>
  <Button onClick={ ()=>
    confirmDeleting()
    
    /*async() =>{
      await axios.delete(`http://localhost:8080/users/${userId}`);
      console.log(userId);
      fetchUsers();
      setOpen(false);
      openSnackbar()
      
   }*/} variant='outlined' color='error' >CONFIRM</Button>

</DialogActions>
</Dialog>
  
</>
  );
}