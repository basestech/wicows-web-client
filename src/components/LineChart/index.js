import React, {Component} from "react"
import PropTypes from "prop-types"

import "./LineChart.css"

import Axis from './Axis';


class LineChart extends Component {

    // GET MAX & MIN X
    getMinX = () =>{
        const {data} = this.props;
        return data[0].x;
    }
    getMaxX = () => {
        const {data} = this.props;
        return data[data.length - 1].x;
    }
    // GET MAX & MIN Y
    getMinY = () => {
        const {data} = this.props;
        return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
    }
    getMaxY = () => {
        const {data} = this.props;
        return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
    }

    getSvgX = x => {
        const {svgWidth} = this.props;
        return (x / this.getMaxX() * svgWidth);
    }
    getSvgY = y => {
        const {svgHeight} = this.props;
        return svgHeight - (y / this.getMaxY() * svgHeight);
    }
    makePath = () => {
        const {data, color} = this.props;
        let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";
        pathD += data.map((point, i) => {
        return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
        });
        return (
        <path className="path" d={pathD} style={{stroke: color}} />
            );
        }

    render() {
        const {svgHeight, svgWidth} = this.props;

        const commonProps = {
            getSvgX: this.getSvgX.bind(this),
            getSvgY: this.getSvgY.bind(this),
            maxX: this.getMaxX(),
            maxY: this.getMaxY(),
            minX: this.getMinX(),
            minY: this.getMinY(),
          }
        return (
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {this.makePath()}
                <Axis {...commonProps}/>
                </svg>
            );
    }
}
LineChart.defaultProps = {
  data: [],  
  color: '#2196F3',  
  svgHeight: 300,  
  svgWidth: 700
}
export default LineChart;