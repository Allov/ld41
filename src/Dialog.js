import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dialog.css";

export class Dialog extends Component {
  static propTypes = {
    lines: PropTypes.array,
    onStartLine: PropTypes.func,
    onClickNext: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentLine: 1,
      done: false,
    };
  }

  showNextLine() {
    let { currentLine } = this.state;
    currentLine = currentLine + 1;
    if (currentLine > this.props.lines.length) {
      this.setState({
        done: true,
      })
      return;
    }

    this.setState({
      currentLine
    });

    if (this.props.onStartLine)
      this.props.onStartLine(this.props.lines[currentLine - 1].text.length);
    setTimeout(
      this.showNextLine.bind(this),
      this.props.lines[currentLine - 1].delay
    );
  }

  componentDidMount() {
    if (this.props.lines.length > 1) {
      if (this.props.onStartLine)
        this.props.onStartLine(this.props.lines[0].text.length);
      setTimeout(this.showNextLine.bind(this), this.props.lines[1].delay);
    }
  }

  render() {
    const { lines, onClickNext } = this.props;
    const { currentLine, done } = this.state;

    const classFromText = text => {
      if (text.startsWith("0: ") > 0) return "first-character";
      return "second-character";
    };

    const removeStart = text => text.match(/^[0-9]: /) ? text.slice(2, text.length) : text;
    return [
      lines.map(
        (line, i) =>
          i < currentLine && (
            <div key={i} className={`dialog typewriter ${i !== currentLine - 1 ? 'done' : ''}`}>
              <p className={classFromText(line.text)}>
                {removeStart(line.text)}
              </p>
            </div>
          )
      ),
      done && <div key={lines.length} className="button"><button className="next" onClick={onClickNext}></button></div>
    ];
  }
}

export default Dialog;
