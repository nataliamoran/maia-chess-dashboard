import { Card  } from "react-bootstrap";
import { SERVER_URL } from "../../env";
import React from "react";

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
            fetch(SERVER_URL+'/api/stats?username='+this.state.username) 
            .then(response => response.json())
            .then(res => {
                this.setState({stats: res.stats});
            })
            .catch(err => {
                console.error(err);
            });
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.username !== this.props.username) {
            if(this.props.username === "maia1"){
                this.setState({stats: undefined});
              }
              else{
                fetch(SERVER_URL+'/api/stats?username='+this.state.username) 
                .then(response => response.json())
                .then(res => {
                    this.setState({stats: res.stats});
                })
                .catch(err => {
                    console.error(err);
                });
            }
        }
      }

    render() {
        if(this.state.username === "maia1" || !this.state.stats){
            return (<div></div>)
        }

        var p_color = 'red';
        var p_length = Math.round(((this.state.stats.p + 1)/2)*10)*5+2; //0-2, divide to 10 uniform "bars", add a bit in case it's 0
        if(this.state.stats.p > 0.5) p_color = 'green';
        else if(this.state.stats.p > -0.5) p_color = 'orange';

        var t_color = 'red';
        var t_length = Math.round(((this.state.stats.t))*10)*5+2; //0-1, divide to 10 uniform "bars"
        if(this.state.stats.t > 0.6) t_color = 'green';
        else if(this.state.stats.t > 0.4) t_color = 'orange';

        var e_color = 'red';
        var e_length = Math.round(((this.state.stats.e - 0.5)/2.5)*10)*5+2; //usually 0.5-3, divide to 10 uniform "bars"
        if(this.state.stats.e > 2) e_color = 'green';
        else if(this.state.stats.e > 1.5) e_color = 'orange';

        return (
            <Card bg="dark" variant="dark" style={{ width: '60vw', color:'white'}}>
                <Card.Body style={{"textAlign": "left"}}>
                    <Card.Title>Player Stats For {this.state.username}</Card.Title>
                    <div>
                    <div>Performance</div>
                    <div style={{"background": p_color, width: p_length+"vw", height: "10px"}}></div>
                    <div>Trickness</div>
                    <div style={{"background": t_color, width: t_length+"vw", height: "10px"}}></div>
                    <div>Entropy</div>
                    <div style={{"background": e_color, width: e_length+"vw", height: "10px"}}></div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default BoardState
