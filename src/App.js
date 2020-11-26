import React, { useState, useEffect } from "react";
import { Card, Icon, Image, Form } from "semantic-ui-react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  // api
  useEffect(() => {
    fetch("https://api.github.com/users/example")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data); to see our data
        setData(data);
      });
  }, []);

  // pass in the data we git from our api
  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  // search
  const handelSearch = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  const handelSubmit = () => {
    // to submit ou form

    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        //  handel invalid user
        if (data.message) {
          setError(data.message);
        } else {
          // render our data
          setData(data);
          setError(null);
        }
      });
  };

  // handel invalid user

  return (
    <div>
      <div className="navbar">Github Search</div>
      <div className="search">
        <Form onSubmit={handelSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Github user"
              name="github user"
              onChange={handelSearch}
            />
            <Form.Button content="Search" />
          </Form.Group>
        </Form>
      </div>
      {/* checking for error*/}
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div className="card">
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{userName}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {followers} followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {repos} Repos
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="user" />
                {following} Following
              </a>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
