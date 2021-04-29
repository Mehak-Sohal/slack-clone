import React, { useState, useEffect } from "react";
import "../App.css";
import Channel from "./Channel.js";
import edit from "./edit.jpg";
import ForumIcon from "@material-ui/icons/Forum";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import InsertCommentRoundedIcon from "@material-ui/icons/InsertCommentRounded";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";

const Sidebar = () => {
  const [showChannel, setShowChannel] = useState(true);
  const [showMessage, setShowMessage] = useState(true);
  const [showApp, setShowApp] = useState(true);
  const [channels, setChannels] = useState([]);

  //get channels from firestore
  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, []);
  console.log("channels", channels);

  const showChannels = () => {
    // console.log("channels", showChannel);
    setShowChannel(!showChannel);
  };

  const showDirectMessages = () => {
    setShowMessage(!showMessage);
  };

  const showApps = () => {
    setShowApp(!showApp);
  };

  return (
    <div className="sidebarr">
      <div className="sidebar__channel">
        {/* <div className="sidebar__flex"> */}
        <div className="sidebar__channelName">
          Slack Clone
          <ExpandMoreIcon className="sidebar__chatOption" />
        </div>
        <img src={edit} className="sidebar__editIcon" alt="" />
        {/* </div> */}
      </div>
      <div className="sidebar__options">
        <Channel name="Threads" Icon={InsertCommentRoundedIcon} />
        <Channel name="All DMs" Icon={ForumIcon} />
        <Channel name="Mentions & reactions" Icon={AlternateEmailIcon} />
        <Channel name="Saved items" Icon={BookmarkBorderIcon} />
        <Channel name="More" Icon={MoreVertIcon} />
      </div>
      <div className="sidebar__more">
        <ul>
          <li
            className="sidebar__option availableChannels"
            onClick={showChannels}
          >
            {showChannel ? (
              <ArrowRightIcon className="sidebar__icon" />
            ) : (
              <ArrowDropDownIcon className="sidebar__icon" />
            )}
            Channels
          </li>
          {!showChannel && (
            <>
              <Channel name="Add Channel" addChannelOption Icon={AddIcon} />
              {channels.map((channel) => (
                <Channel name={channel.name} id={channel.id} key={channel.id} />
              ))}
            </>
          )}
          {/* <Modal
            isOpen={modal}
            toggle={toggle}
            style={{ height: "50px", width: "50px", border: "1px solid black" }}
          >
            <ModalHeader>Add Channel</ModalHeader>
            <ModalBody>Body</ModalBody>
            <ModalFooter>Save</ModalFooter>
          </Modal> */}
          <li
            className="sidebar__option directMessages"
            onClick={showDirectMessages}
          >
            {showMessage ? (
              <ArrowRightIcon className="sidebar__icon" />
            ) : (
              <ArrowDropDownIcon className="sidebar__icon" />
            )}
            Direct messages
          </li>
          {!showMessage && (
            <div className="availableMessages">
              <Channel name="Apple" />
            </div>
          )}
          <li className="sidebar__option apps" onClick={showApps}>
            {showApp ? (
              <ArrowRightIcon className="sidebar__icon" />
            ) : (
              <ArrowDropDownIcon className="sidebar__icon" />
            )}
            Apps
          </li>
          {!showApp && (
            <div className="availablApps">
              <div className="addChannel">
                <Channel name="Add Apps" Icon={AddIcon} />
              </div>
              <Channel name="Youtube" />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
