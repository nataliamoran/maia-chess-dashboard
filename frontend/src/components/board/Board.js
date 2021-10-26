import { Chessground as NativeChessground } from 'chessground'
import React from "react";


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fen: props.fen,
            lastMove: props.lastMove,
            arrows: props.arrows || [{orig: "a2", dest: "a4", brush: 'green' }, 
                                   {orig: "b2", dest: "b4", brush: 'yellow' },
                                   {orig: "c2", dest: "c4", brush: 'red' }],
            size: props.size || 300
        }
    }
    
    componentDidMount() {
        const config = {
                fen: this.state.fen, 
                lastMove: this.state.lastMove,
                viewOnly: true,
                resizable: true,

            };
        this.cg = NativeChessground(this.el, config);
        this.cg.setShapes (this.state.arrows);
      }

      componentDidUpdate(prevProps) {
        console.log();
        if(prevProps.fen !== this.props.fen ||this.props.arrows !== prevProps.arrows ||this.props.lastMove !== prevProps.lastMove) {
          this.setState({fen: this.props.fen,arrows: this.props.arrows, lastMove: this.props.lastMove});
          const config = {
            fen: this.state.fen, 
            lastMove: this.state.lastMove,
            viewOnly: true,
            resizable: true,

        };
        this.cg = NativeChessground(this.el, config);
        if(this.state.arrows){
          this.cg.setShapes (this.state.arrows);
        }
        }
      }
    
    
      render() {
        const props = { style: { ...this.props.style } }

        props.style.width = this.state.size


        props.style.height = this.state.size

        return <div ref={el => this.el = el} {...props} />
      }
    }


