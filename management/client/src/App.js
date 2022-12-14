import React, { Component } from 'react';
import Customer from './components/Customer';
import './App.css';
import { Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { withStyles } from '@material-ui/core/styles';
// import {Table, TableHead, TableBody, TableRow, TableCell, Paper} from '@mui/material';

/*
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  }
  progress: {
    margin: theme.spacing.unit * 2
  }
});
*/
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/


class App extends Component {
  
  state = {
    customers: "",
    completed: 0
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  render() {
    // const { classes } = this.props;
    return (
      <Paper sx={{overflowX:"auto"}}>
        <Table stickyHeader sx={{maxWidth: '1080px', minWidth: '1080px'}}>
          <TableHead>
            <TableRow>
              <TableCell>??????</TableCell>
              <TableCell>?????????</TableCell>
              <TableCell>??????</TableCell>
              <TableCell>????????????</TableCell>
              <TableCell>??????</TableCell>
              <TableCell>??????</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ? this.state.customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />);
            }) : 
            <TableRow>
              <TableCell colSpan={"6"} align="center">
                <CircularProgress className='classes.progress' variant='determinate' value={this.state.completed}/>
              </TableCell>
            </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

// export default withStyles(styles)(App);
export default App;