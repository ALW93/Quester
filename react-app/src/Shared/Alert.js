import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// severities: success, warning, error, info

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertSnackBar() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const alertData = useSelector((state) => state.utility.update);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (alertData.type) {
      setOpen(true);
    }
  }, [alertData]);

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertData.type}>
          {alertData.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
