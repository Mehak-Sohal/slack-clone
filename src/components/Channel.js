import React, { useState } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";
import db from "../firebase";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "30vw",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Channel = ({ Icon, name, id, addChannelOption }) => {
  const history = useHistory();
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log("close");
  };

  const addChannel = () => {
    if (channelName) {
      db.collection("channels").add({
        name: channelName,
      });
    }
    setChannelName("");
    setOpen(false);
  };

  const selectChannel = () => {
    if (id) {
      history.push(`/channel/${id}`);
    }
  };
  return (
    <>
      <div
        className="channel"
        onClick={addChannelOption ? handleOpen : selectChannel}
      >
        {Icon && <Icon className="channel__icon" />}
        {Icon ? (
          <div className="channel__name">{name}</div>
        ) : (
          <div className="channel channelName">
            <span className="channel__icon">#</span>
            <span className="channel__name">{name}</span>
          </div>
        )}
      </div>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <div className="channelName_modal">
            <p>Please enter channel name</p>
            <input
              className="channel_input"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            ></input>
            <div className="modal-buttons">
              <button className="saveBtn" onClick={addChannel}>
                Save
              </button>
              <button className="cancelBtn" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Channel;
