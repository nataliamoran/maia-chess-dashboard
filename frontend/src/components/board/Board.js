import { Chessground as NativeChessground } from 'chessground'
import React from "react";


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fen: props.fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
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
    
    
      render() {
        const props = { style: { ...this.props.style } }

        props.style.width = this.state.size


        props.style.height = this.state.size

        return <div ref={el => this.el = el} {...props} />
      }
    }

