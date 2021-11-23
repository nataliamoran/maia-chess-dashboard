import { ListGroup, Card  } from "react-bootstrap";
import { SERVER_URL } from "../../env";
import React from "react";
import './BoardState.css';

class BoardState extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          data: [],
          gameIDs: props.gameIDs || [],
          curr: "",
          filter: props.searchfilter,
          maxHeight: props.maxHeight||400
        }
      }

      componentDidMount(){
          if(this.state.filter){
              var games = '';
              if(this.state.gameIDs){
                games = '&games='+this.state.gameIDs.toString();
              }
            fetch(SERVER_URL+'/api/filters?gameFilter='+this.props.searchfilter+games) 
        .then(response => response.json())
        .then(res => {
            this.setState({data: res.games});
        });
          }
          else{
              this.setState({data:[]});
          }
    }

    componentDidUpdate(prevProps) {
        var games;
        if(this.props.gameIDs !== prevProps.gameIDs){
            this.setState({gameIDs: this.props.gameIDs});
            if(this.props.searchfilter){
            games = '';
              if(this.props.gameIDs){
                games = '&games='+this.props.gameIDs.toString();
              }
            fetch(SERVER_URL+'/api/filters?gameFilter='+this.props.searchfilter+games)
                .then(response => response.json())
                .then(res => {
                    //console.log(SERVER_URL+'/api/filters?gameFilter='+this.props.searchfilter+games);
                    this.setState({data: res.games});
                });
            }
        }
        if(prevProps.searchfilter !== this.props.searchfilter) {
          this.setState({filter: this.props.searchfilter});
          games = '';
              if(this.props.gameIDs){
                games = '&games='+this.props.gameIDs.toString();
              }
            fetch(SERVER_URL+'/api/filters?gameFilter='+this.props.searchfilter+games)
                .then(response => response.json())
                .then(res => {
                   // console.log(SERVER_URL+'/api/filters?gameFilter='+this.props.searchfilter+games);
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
                    <Card.Title style={{color:'white'}}>Board State</Card.Title>
                    <ListGroup variant="flush" style={{"overflowY": "auto", "maxHeight": (this.state.maxHeight+"px")}}>
                    {this.state.data.map(d => (
                        <ListGroup.Item key={(d.ID+d.state.round)}
                        action variant="dark"
                        onClick={(event) => {
                            this.setState({
                                curr: d.ID
                              });
                            this.props.parentCallback(d);
                            event.preventDefault();
                            }} >
                                 <div style={{'fontSize': '16px','fontWeight': 'bold'}}>{d.state.round}.&nbsp;{d.state.move}</div>
                            <div>{d.whitePlayer} vs {d.blackPlayer}</div>
                            <div>{d.date}</div>
                           
                            <div style={{float: 'left', 'fontWeight': 'bold'}}>P:</div> 
                            {d.state.stat.p > 0.5 &&
                                <span className="dot-green" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.p > -0.5 && d.state.stat.p <=0.5 &&
                                <span className="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.p <= -0.5 &&
                                <span className="dot-red" style={{float: 'left'}}></span>
                            }
                             <div style={{float: 'left', 'marginLeft': '5px', 'fontWeight': 'bold'}}>T:</div> 
                            {d.state.stat.t > 0.6 &&
                                <span className="dot-green" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.t > 0.4 && d.state.stat.t <=0.6 &&
                                <span className="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.t <= 0.4 &&
                                <span className="dot-red" style={{float: 'left'}}></span>
                            }
                             <div style={{float: 'left', 'marginLeft': '5px','fontWeight': 'bold'}}>E:</div> 
                            {d.state.stat.e > 2 &&
                                <span className="dot-red" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.e > 1.5 && d.state.stat.e <=2 &&
                                <span className="dot-orange" style={{float: 'left'}}></span>
                            }
                            {d.state.stat.e <= 1.5 &&
                                <span className="dot-green" style={{float: 'left'}}></span>
                            }
                        </ListGroup.Item>
                    ))} 
                    </ListGroup>
                </Card.Body>
            </Card>
        )
    }
}

export default BoardState
