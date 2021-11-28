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
          maxHeight: props.maxHeight||400,
          customString: props.customString,
          username: props.username
          
        }
    }
    
    fetchData(gameIDs, filter, customString, username){
        var games = '';
        if(gameIDs && gameIDs.length > 0){
            games = '&games='+gameIDs.toString();
        
        var customStringFilter = '';
        if(filter === 'custom'){
            customStringFilter = "&filterString="+customString;
        }
        fetch(SERVER_URL+'/api/filters?gameFilter='+filter+customStringFilter+games+'&username='+username) 
            .then(response => response.json())
            .then(res => {
                //console.log('/api/filters?gameFilter='+filter+customStringFilter+games+'&username='+username);
                if(res.games.length === 0 && username !== 'maia1'){
                    this.fetchData(gameIDs, filter, customString, 'maia1')
                }
                else{
                    this.setState({data: res.games})
                }
            })
            .catch(err => {
                console.log(err);
                    console.log('/api/filters?gameFilter='+filter+customStringFilter+games+'&username='+username);
                });
       
        }
    }
    
    componentDidMount(){
        if(this.state.filter){
            this.fetchData(this.state.gameIDs, this.state.filter, this.state.customString, this.state.username);
        }
        else{
            this.setState({data:[]});
        }
    }

    componentDidUpdate(prevProps) {
        /*if(this.props.gameIDs !== prevProps.gameIDs){
            
            if(this.props.searchfilter){
                this.fetchData(this.props.gameIDs, this.props.searchfilter, this.props.customString, this.props.username);
            }
        }*/
        //console.log(prevProps);
        //console.log(this.props);
        if(this.props.username !== prevProps.username || 
            this.props.gameIDs !== prevProps.gameIDs || 
            prevProps.searchfilter !== this.props.searchfilter || 
            this.props.customString !== prevProps.customString){
            this.setState({gameIDs: this.props.gameIDs, username: this.props.username, filter: this.props.searchfilter, customString: this.props.customString});
            if(this.props.searchfilter){
                this.fetchData(this.props.gameIDs, this.props.searchfilter, this.props.customString, this.props.username);
            }
        }
        /*if(prevProps.searchfilter !== this.props.searchfilter || this.props.customString !== prevProps.customString) {
            
            this.fetchData(this.props.gameIDs, this.props.searchfilter, this.props.customString, this.props.username);
        }   */   
        if(prevProps.maxHeight !== this.props.maxHeight){
            this.setState({maxHeight: this.props.maxHeight});
        }
      }


    render() {
        return (
            <Card bg="dark" variant="dark" style={{ width: '180px'}}>
                <Card.Body style={{"textAlign": "left"}}>
                    {/*<Card.Title style={{color:'white'}}>Board State</Card.Title>*/}
                    <ListGroup variant="flush" style={{"overflowY": "auto", "maxHeight": (this.state.maxHeight-50)}}>
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
                            <div style={{'fontSize': '12px'}}>{d.whitePlayer} vs {d.blackPlayer}</div>
                            <div style={{'fontSize': '10px'}}>{d.date.substring(5, 10).replaceAll('.', '/')}/{d.date.substring(0, 4)}&nbsp;{d.date.substring(11, 16)}</div>
                           
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
