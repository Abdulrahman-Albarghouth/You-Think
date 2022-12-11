import { useState, useEffect, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertContextNotification } from "../../contexts/AlertContextNotification";
import Slide from '@mui/material/Slide';

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const SimpleSnackbar = ({}) => {
    const { open: openGlobal, success, message, toggleOff } = useContext(AlertContextNotification)

  const [open, setOpen] = useState(false);

  const handleClose = (e, reason) => {
      setOpen(false);
      toggleOff(reason)
  };

  useEffect(() => {
    openGlobal && setOpen(true);
  }, [openGlobal, success, message]);


  return (
    <div>
      <Snackbar
        sx={{ height: "25%" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openGlobal}
        autoHideDuration={3500}
        onClose={handleClose}
        onClick={handleClose}
        TransitionComponent={SlideTransition}
      >  
          <Alert
            variant="filled"
            severity={!success ?  "error" :  "success"}
            style={{ minWidth: "150px" }}
          >
            {message ? message : (success ? "success" : "something went wrong") }
          </Alert>
      </Snackbar>
    </div>
  );
};

export default SimpleSnackbar;