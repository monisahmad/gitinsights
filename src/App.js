import React, { Component } from 'react';
import OauthPopup from 'react-oauth-popup';
import {
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@material-ui/core/';
import './App.css';
import fetchUserInfo from './helpers/fetchUserInfo';
import getRepos from './helpers/getRepos';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      loading: false,
    };
    this.connectGithub = this.connectGithub.bind(this);
  }

  async connectGithub(code) {
    this.setState({ connected: true, loading: true });
    const userInfo = await fetchUserInfo(code);
    const user = userInfo.apiData;
    this.setState({
      avatar: user.avatar_url,
      username: user.login,
    });
    const rows = await getRepos(userInfo.access_token);
    this.setState({ rows, loading: false });
  }
  render() {
    const {
      connected, loading, rows, avatar, username,
    } = this.state;
    if (!connected) {
      return (
        <div className="App">
          <Paper elevation={1} className="connect">
            <Typography variant="headline" component="h1">
              <br /> GitInsights <br />
            </Typography>
            <Typography component="p">
              Connect your Github account to view the list of Repos. <br /> <br />
            </Typography>
            <OauthPopup
              url="https://github.com/login/oauth/authorize?client_id=87ba5c2e8f3c6bbb0773&scope=repo"
              onCode={this.connectGithub}
            >
              <Button variant="contained" color="primary">Click here to connect your github account</Button>
            </OauthPopup>
            <br /><br />
            <Typography variant="caption" gutterBottom align="center">
              made with <span role="img" aria-label="heart">❤️</span> by <a href="https://github.com/monisahmad">Monis Ahmad</a>
            </Typography>
          </Paper>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="App">
          <LinearProgress />
        </div>
      );
    }
    return (
      <div className="content">
        <Card>
          <CardMedia
            className="cardMedia"
            component="img"
            image={avatar}
            title="User Profile"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2" className="username">
              {username}
            </Typography>
          </CardContent>
        </Card>
        <Paper >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>Repo Name</TableCell>
                <TableCell>Last Update</TableCell>
                <TableCell>Check Repo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow key={row.index}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.updated_at}</TableCell>
                    <TableCell><a href={row.html_url} target="_blank">View Repo On Github</a></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
        <br /><br />
        <Typography variant="caption" gutterBottom align="center">
              made with <span role="img" aria-label="heart">❤️</span> by <a href="https://github.com/monisahmad">Monis Ahmad</a>
        </Typography>
      </div>
    );
  }
}

export default App;
