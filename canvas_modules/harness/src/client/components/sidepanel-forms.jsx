import React from 'react';
import {FormControl, Button} from 'react-bootstrap'

export default class SidePanelForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasDiagram: "",
      canvasPalette: ""
    };

    this.onCanvasFileSelect = this.onCanvasFileSelect.bind(this);
    this.isReadyToSubmitCanvasData = this.isReadyToSubmitCanvasData.bind(this);

    this.onCanvasPaletteSelect = this.onCanvasPaletteSelect.bind(this);
    this.isReadyToSubmitPaletteData = this.isReadyToSubmitPaletteData.bind(this);
  }

  // Canvas Diagram JSON
  onCanvasFileSelect(evt) {
    this.setState({canvasDiagram:''});
    if(evt.target.files.length > 0) {
      var filename = evt.target.files[0].name;
      var fileExt = filename.substring(filename.lastIndexOf('.') + 1);
      if (fileExt === "json") {
        this.setState({canvasDiagram:evt.target.files[0]});
        this.props.log("Canvas diagram JSON file selected: " + filename);
      }
    }
  }

  isReadyToSubmitCanvasData() {
    if (this.state.canvasDiagram !== '') {
      return true;
    }
    return false;
  }

  parseCanvasDiagram() {
    this.props.log("Ready to parse file: " + this.state.canvasDiagram.name);
  }

  // Canvas Palette JSON
  onCanvasPaletteSelect(evt) {
    this.setState({canvasPalette:''});
    this.props.showHidePalette(false);
    if(evt.target.files.length > 0) {
      var filename = evt.target.files[0].name;
      var fileExt = filename.substring(filename.lastIndexOf('.') + 1);
      if (fileExt === "json") {
        this.setState({canvasPalette:evt.target.files[0]});
        this.props.log("Canvas palette JSON file selected: " + filename);
      }
    }
  }

  isReadyToSubmitPaletteData() {
    if (this.state.canvasPalette !== '') {
      return true;
    }
    return false;
  }

  parseCanvasPalette() {
    this.props.log("Ready to parse file: " + this.state.canvasPalette.name);
    if(this.isReadyToSubmitPaletteData()) {
      this.props.showHidePalette(true);
    }
  }

  render() {
    var divider = <div className="sidepanel-children sidepanel-divider"/>

    var formInput = <div className="sidepanel-children" id="sidepanel-input">
      <div className="formField">
        <label className="formLabel">Canvas Diagram</label>
        <FormControl required="required" id="formFileInput" type="file" accept=".json" ref="canvasDiagram"
          onChange={this.onCanvasFileSelect}
        />
        <Button light semantic
            disabled={!this.isReadyToSubmitCanvasData()}
            onClick={this.parseCanvasDiagram.bind(this)}
          >
          Submit
        </Button>
      </div>
    </div>

    var paletteInput = <div className="sidepanel-children" id="sidepanel-palette">
      <div className="formField">
        <label className="formLabel">Canvas Palette</label>
        <FormControl required="required" id="paletteJsonInput" type="file" accept=".json" ref="canvasPalette"
          onChange={this.onCanvasPaletteSelect}
        />
        <Button dark semantic
            disabled={!this.isReadyToSubmitPaletteData()}
            onClick={this.parseCanvasPalette.bind(this)}
            onChange={(e) => this.props.showHidePalette(e.target.checked)}
            >
            Submit
        </Button>
      </div>
    </div>

    return (
      <div>
        {formInput}
        {divider}
        {paletteInput}
        {divider}
      </div>
    );
  }
}

SidePanelForms.propTypes = {
  showHidePalette: React.PropTypes.func,
  log: React.PropTypes.func
};
