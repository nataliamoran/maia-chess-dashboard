import { Card  } from "react-bootstrap";
import { SERVER_URL } from "../../env";
import React from "react";
import "./playerStat.css"

class BoardState extends React.Component {

    constructor(props){
        super(props)
        this.state = {
          stats: undefined,
          username: props.username || "maia1"
        }
      }

      componentDidMount(){
          if(this.state.username === "maia1"){
            this.setState({stats: undefined});
          }
          else{
            fetch(SERVER_URL+'/api/dashboard/lichess_users/'+this.state.username) 
            .then(response => response.json())
            .then(res => {
                this.setState({stats: res.lichess_info});
            })
            .catch(err => {
                console.error(err);
            });
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.username !== this.props.username) {
            this.setState({username: this.props.username});
            if(this.props.username === "maia1"){
                this.setState({stats: undefined});
              }
              else{
                fetch(SERVER_URL+'/api/dashboard/lichess_users/'+this.props.username) 
                .then(response => response.json())
                .then(res => {
                    this.setState({stats: res.lichess_info});
                })
                .catch(err => {
                    console.error(err);
                });
            }
        }
      }

    render() {
        if(this.state.username === "maia1" || !this.state.stats || this.state.stats.disabled){
            return (<div></div>)
        }
        console.log(this.state.stats);

        var totalGames = this.state.stats.count.rated;
        var winRate = ((this.state.stats.count.win / totalGames)*100).toFixed(2);


        return (
            <Card bg="dark" variant="dark" style={{ width: '450px', color:'white'}}>
                <Card.Body style={{"textAlign": "center"}}>
                    <Card.Title>Player Stats For {this.state.username}</Card.Title>
                    <div>
                    <div>Total games: {totalGames} </div>
                    <div>Win Rate: {winRate}% </div>
                    <table style={{marginTop: '5px', marginBottom: '10px', padding: '5px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <tr>
                    <th></th>
                    <th>Blitz</th>
                    <th>Bullet</th>
                    <th>Correspondence</th>
                    <th>Classical</th>
                    <th>Rapid</th>
                    </tr>
                    <tr>
                    <th>Games</th>
                    <td>{this.state.stats.perfs.blitz.games}</td>
                    <td>{this.state.stats.perfs.bullet.games} </td>
                    <td>{this.state.stats.perfs.correspondence.games} </td>
                    <td>{this.state.stats.perfs.classical.games} </td>
                    <td>{this.state.stats.perfs.rapid.games}</td>
                    </tr>
                    <tr>
                    <td>Rating</td>
                    <td>{this.state.stats.perfs.blitz.rating} </td>
                    <td>{this.state.stats.perfs.bullet.rating} </td>
                    <td>{this.state.stats.perfs.correspondence.rating} </td>
                    <td>{this.state.stats.perfs.classical.rating} </td>
                    <td>{this.state.stats.perfs.rapid.rating} </td>
                    </tr>
                    </table>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default BoardState
