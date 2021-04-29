import React, { useState } from "react";
import "../App.css";
import DeleteIcon from "@material-ui/icons/Delete";
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
    width: "20vw",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Message = ({
  message,
  timestamp,
  user,
  userImage,
  id,
  deleteMessage,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="messages">
      <img
        src={
          userImage
            ? userImage
            : "https://image.shutterstock.com/image-vector/person-icon-on-white-background-260nw-1699358734.jpg"
        }
        alt=""
      />
      <div className="message__info">
        <h4>
          {user}{" "}
          <span className="message__timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>{" "}
        </h4>
        <p className="message__details">{message}</p>
      </div>
      <div
        className="delMsg"
        // onMouseEnter={(e) => {
        //   setStyle({ display: "block" });
        // }}
        // onMouseLeave={(e) => {
        //   setStyle({ display: "none" });
        // }}
      >
        <DeleteIcon className="delete_message" onClick={handleOpen} />
        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <p className="modal_header">
              Are you sure you want to delete this message?
            </p>
            <div className="modal-buttons">
              <button className="deleteBtn" onClick={() => deleteMessage(id)}>
                Delete
              </button>
              <button className="cancelBtn" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Message;
