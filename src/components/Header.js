import React from "react";
import "../App.css";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useStateValue } from "../slackContext/StateProvider";

const Header = () => {
  const [{ user }] = useStateValue();
  // const [searchInput, setSearchInput] = useState("");
  // const [channelNames, setChannelNames] = useState([]);

  // const fetchChannelNames = () => {
  //   db.collection("channels").onSnapshot((snapshot) =>
  //     setChannelNames(snapshot?.docs?.map((doc) => doc?.data()?.name))
  //   );
  //   console.log(channelNames);
  // };

  // console.log(fetchChannelNames());
  // const searchChannelName = () => {
  //   fetchChannelNames();

  // }

  // console.log(channelNames);
  return (
    <div className="header">
      <div className="header__main">
        <AccessTimeIcon className="header__history" />
        <input
          // value={searchInput}
          // onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          className="header__searchBar"
          placeholder="Search channel"
        />
        <HelpOutlineIcon className="header__help" />
      </div>
      <div className="header__right">
        <Avatar
          src={user?.photoURL}
          alt={user?.displayName}
          className="header__user"
        />
      </div>
    </div>
  );
};

export default Header;
