import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./components/Chat";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { useStateValue } from "./slackContext/StateProvider";
// import Home from "./todo-may12/Home.js";

function App() {
  // const [user, setUser] = useState(null);
  const [{ user }] = useStateValue();

  console.log(user);
  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
        <Router>
          <div className="app__header">
            <Header />
          </div>

          <div className="content">
            <div className="sidebar">
              <Sidebar />
            </div>

            <div className="chat">
              <Switch>
                <Route exact path="/">
                  <Chat />
                </Route>
                <Route exact path="/channel/:channelId">
                  <Chat />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      )}
    </div>

    // <div>
    //   <Home />
    // </div>
  );
}

export default App;
