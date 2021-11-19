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
          username: props.username | "maia1",
          maxHeight: props.maxHeight||400
        }
      }

      componentDidMount(){
            fetch(SERVER_URL+'/api/get_games/') 
        .then(response => response.json())
        .then(res => {
            this.setState({data: res.games});
        });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.username !== this.props.username) {
          this.setState({username: this.props.username});
          fetch(SERVER_URL+'/api/get_games/') //http://dash-dev.maiachess.com
                .then(response => response.json())
                .then(res => {
                    this.setState({data: res.games});
                });
        }
        if(prevProps.maxHeight !== this.props.maxHeight){
            this.setState({maxHeight: this.props.maxHeight});
        }
      }


    render() {
        return (
            <Card bg="dark" variant="dark" style={{ width: '200px'}}>
                <Card.Body style={{"textAlign": "left"}}>
                    <Card.Title style={{color:'white'}}>Games</Card.Title>
                    <ListGroup variant="flush" style={{"overflowY": "auto", "maxHeight": (this.state.maxHeight+"px")}}>
                    {this.state.data.map(d => (
                        <ListGroup.Item key={d.ID}
                        variant="dark"
                        >
                            <Form.Check 
                            inline 
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
                                this.props.parentCallback(this.state.currIDs);
                                //event.preventDefault();
                                }}
                            />
                            
                            
                        </ListGroup.Item>
                    ))} 
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}

export default BoardState
