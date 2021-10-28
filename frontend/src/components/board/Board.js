import { Chessground as NativeChessground } from 'chessground'
import React from "react";


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fen: props.fen,
            lastMove: props.lastMove,
            arrows: props.arrows ||[{orig: "a2", dest: "a4", brush: 'green', modifiers: {lineWidth: 10} }, 
									{orig: "a2", dest: "a4", brush: 'blue', modifiers: {lineWidth: 5} },
									{orig: "c2", dest: "c4", brush: 'red' }],
			/* Color available:  brush:
				green: { key: 'g', color: '#15781B', opacity: 1, lineWidth: 10 },
                red: { key: 'r', color: '#882020', opacity: 1, lineWidth: 10 },
                blue: { key: 'b', color: '#003088', opacity: 1, lineWidth: 10 },
                yellow: { key: 'y', color: '#e68f00', opacity: 1, lineWidth: 10 },
                paleBlue: { key: 'pb', color: '#003088', opacity: 0.4, lineWidth: 15 },
                paleGreen: { key: 'pg', color: '#15781B', opacity: 0.4, lineWidth: 15 },
                paleRed: { key: 'pr', color: '#882020', opacity: 0.4, lineWidth: 15 },
                paleGrey: { key: 'pgr', color: '#4a4a4a', opacity: 0.35, lineWidth: 15 }
			*/
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
			const config = {
				fen: this.props.fen, 
				lastMove: this.props.lastMove,
            	viewOnly: true,
            	resizable: true,
			};
			const arrows = this.props.arrows;
			this.setState({fen: this.props.fen, lastMove: this.props.lastMove});

			this.cg = NativeChessground(this.el, config);
			if(this.props.arrows){
				this.cg.setShapes (arrows);
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

