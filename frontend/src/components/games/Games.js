import { ListGroup, Card, Form  } from "react-bootstrap";
import { SERVER_URL } from "../../env";
import React from "react";
import postEventLog from "../util.js";
import './games.css';

class BoardState extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          currIDs: [],
          username: props.username || "maia1",
          maxHeight: props.maxHeight||400,
          maiaGames: [],
          count: 0,
          numGames: 0
        }
      }
      //for the given username, check if the username is still the same as the states'
      //Check if numGames return > state.numGames, if true call fetchData
      checkNumGames(username){
        fetch(SERVER_URL+'/api/analysis/num_games/'+username) 
        .then(response => response.json())
        .then(res => {
            if(username === this.state.username && res > this.state.numGames){
                this.fetchData(username);
            }
        })
        .catch(err => {
            console.log(err);
        });
      }
      fetchData(username){
        fetch(SERVER_URL+'/api/get_games?username='+username) 
        .then(response => response.json())
        .then(res => {
            //initalize maia games as a state
            if(res.number_of_games !== 0 && username === 'maia1' && this.state.maiaGames.length === 0){
                this.setState({maiaGames: res.games, data: res.games, numGames: res.number_of_games});
            }
            //need to use maia temporary
            else if(res.number_of_games <= 0 && username === this.state.username){
                this.setState({data: this.state.maiaGames, numGames: 0});
            }
            //actual data
            else if(username === this.state.username){
                if(this.state.numGames !== res.number_of_games){
                    this.setState({data: res.games, numGames: res.number_of_games});
                }
            }
            //old calls
            else if(this.state.data.length === 0){
                this.setState({data: this.state.maiaGames, numGames: 0});
            }
        })
        .catch(err => {
            this.setState({games: this.state.maiaGames, numGames: 0});
        });
    }

    tick() {
        this.setState(state => ({
          count: state.count + 1
        }));
      }

      componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);
        this.fetchData("maia1");
        this.fetchData(this.state.username);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currIDs !== this.state.currIDs){
            this.props.parentCallback(this.state.currIDs);
            postEventLog("User change games to be searched",
            {
                username: this.state.username,
                games_ids: this.state.currIDs,
                log_time_fe: Date().toLocaleString()
            }
            );
        }
        //console.log(prevProps.numGames + 'vs' + this.props.numGames);
        if(prevProps.username !== this.props.username) {
          this.setState({username: this.props.username || "maia1", currIDs: [], data: this.state.maiaGames, numGames: 0});
          this.fetchData(this.props.username);
        }
        if(prevProps.maxHeight !== this.props.maxHeight){
            this.setState({maxHeight: this.props.maxHeight});
        }
        //timer as reached 3 secs, check if the num games increased
        if(this.state.count === 3){
            if(this.state.data.length < 5 || this.state.numGames === 0){
                this.checkNumGames(this.props.username);
                
            }
            this.setState({count: 0});
        }
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <Card bg="dark" variant="dark" style={{ width: '180px'}}>
                <Card.Body style={{"textAlign": "left"}}>
                    <ListGroup variant="flush" style={{"overflowY": "auto", "maxHeight": (this.state.maxHeight-100)}}>
                    {this.state.data.map(d => (
                        <ListGroup.Item key={d.ID}
                        variant="dark">
                            <Form.Check 
                            id={d.ID} 
                            style={{'fontSize': '12px','fontWeight': 'bold'}}
                            label = {<div style={{'width': '100%','height': '100%'}}><div>{d.whitePlayer+" vs "+d.blackPlayer} </div>
                                   <div style={{'fontSize': '10px'}}>{d.date.substring(5, 10).replaceAll('.', '/')}/{d.date.substring(0, 4)}&nbsp;{d.date.substring(11, 16)}</div>
                                   </div>} 
                            checked = {this.state.currIDs.includes(d.ID)}
                            onChange={(event) => {
                                if(this.state.currIDs.includes(d.ID)){
                                    this.setState({currIDs: this.state.currIDs.filter(function(ids) { 
                                        return ids !== d.ID
                                    })});
                                }
                                else{
                                    this.setState(prevState => ({
                                        currIDs: [...prevState.currIDs, d.ID]
                                    }));
                                }
                                }}
                            />
                            
                            
                        </ListGroup.Item>
                    ))} 
                    
                    </ListGroup>
                    {this.state.numGames > 0 &&
                                <span style={{color: 'white'}}>{this.state.numGames} games analyzed</span>
                            }
                    {this.state.numGames === 0 &&
                                <span style={{color: 'white'}}>Your games are being analyzed, plz wait!</span>
                            }
                    
                </Card.Body>
            </Card>
        )
    }
}

export default BoardState
