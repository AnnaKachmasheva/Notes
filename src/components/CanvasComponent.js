import React from 'react';
import {Component} from "react";
import Immutable from "immutable";

class CanvasComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            lines: new Immutable.List(),
            isDrawing: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseDown(e) {
        if (e.button !== 0)
            return;

        const point = this.relativeCoordinatesForEvent(e);

        this.setState(prevState => ({
            lines: prevState.lines.push(new Immutable.List([point])),
            isDrawing: true
        }));
    }

    handleMouseMove(e) {
        if (!this.state.isDrawing)
            return;

        const point = this.relativeCoordinatesForEvent(e);

        this.setState(prevState => ({
            lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
        }));
    }

    handleMouseUp() {
        this.setState({isDrawing: false});
    }

    relativeCoordinatesForEvent(mouseEvent) {
        const boundingRect = this.refs.drawArea.getBoundingClientRect();
        return new Immutable.Map({
            x: mouseEvent.clientX - boundingRect.left,
            y: mouseEvent.clientY - boundingRect.top,
        });
    }

    render() {
        return (
            <div className="canvas"
                 ref="drawArea"
                 onMouseDown={this.handleMouseDown}
                 onMouseMove={this.handleMouseMove}
            >
                <Drawing lines={this.state.lines}/>
            </div>
        );
    }
}

function Drawing({lines}) {
    return (
        <svg className="area"
             id="area">
            {lines.map((line, index) => (
                <DrawingLine key={index}
                             line={line} />
            ))}
        </svg>
    );
}

function DrawingLine({line}) {
    const pathData = "M " +
        line.map(p => {
            return `${p.get('x')} 
                    ${p.get('y')}`;
        }).join(" L ");

    return <path className="path"
                 d={pathData}/>;
}

export default CanvasComponent;