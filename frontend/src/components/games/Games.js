import { ListGroup, Card, Form  } from "react-bootstrap";
import { SERVER_URL } from "../../env";
import React from "react";
import './games.css';

class BoardState extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          currIDs: [],
          username: props.username || "maia1",
          maxHeight: props.maxHeight||400,
          count: 0,
          numGames: 0
        }
      }

      fetchData(username, updateNumGames){
        console.log(username);
        fetch(SERVER_URL+'/api/get_games?username='+username) 
        .then(response => response.json())
        .then(res => {
            console.log(res);
            console.log(updateNumGames);
            console.log(this.state.username);
            //need to use maia temporary
            if(res.number_of_games === 0 && updateNumGames && username === this.state.username){
                this.fetchData('maia1', false);
            }
            //actual data
            else if(username === this.state.username || (username === 'maia1' && !updateNumGames)){
                if(updateNumGames || this.state.data.length !== 0){
                    this.setState({data: res.games});
                    if(updateNumGames){
                        this.setState({numGames: res.number_of_games});
                    }
                    else{
                        this.setState({numGames: 0});
                    }
                }
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    tick() {
        this.setState(state => ({
          count: state.count + 1
        }));
      }

      componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);
        this.fetchData(this.state.username, true);
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currIDs !== this.state.currIDs){
            this.props.parentCallback(this.state.currIDs);
        }
        //console.log(prevProps.numGames + 'vs' + this.props.numGames);
        if(prevProps.username !== this.props.username  ||prevProps.numGames !== this.props.numGames ) {
          this.setState({username: this.props.username || "maia1", numGames: this.props.numGames, currIDs: [], data: []});
          this.fetchData(this.props.username, true);
        }
        if(prevProps.maxHeight !== this.props.maxHeight){
            this.setState({maxHeight: this.props.maxHeight});
        }
        if(this.state.count === 3){
            this.fetchData(this.props.username, true);
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
                                   <div style={{'fontSize': '10px'}}>{(new Date(d.date)).toLocaleDateString()}</div>
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
