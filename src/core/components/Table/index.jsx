require('./index.scss');
class Table extends React.Component {

  constructor(props) {
    super(props);
  }

  newRowUI() {
    return (
      <tr>
        {this.props.head.map((cell, cellIndex) => (<td key={cellIndex}>
          <input type="text" value={this.props.newTableRow[cellIndex]} onChange={this.props.handleOnNewTableRowElementChange.bind(null, cellIndex)}></input>
        </td>))}
        <td><i className="fa fa-plus-square-o" onClick={this.props.handleOnAddNewRow.bind(null)}></i></td>
      </tr>
    );
  }
  headElementUi(cellIndex, cell) {
    return (
      <input  type="text" value={cell} onChange={this.props.handleOnHeadElementChange.bind(this, cellIndex)}></input>
    );
  }

  headUI() {
    if(!this.props.head) return;
    return (
      <thead>
      <tr>
        {this.props.head.map((cell, cellIndex) => (<th key={cellIndex}>{this.headElementUi(cellIndex, cell)}</th>))}
        <th></th>
      </tr>
      </thead>
    );
  }

  bodyUI() {
    if(!this.props.body) return;

    return (
      <tbody>
      {this.props.body.map((cells, cellsIndex) => (
        <tr key={cellsIndex}>
          {cells.map((cell, cellIndex) => (<td key={cellIndex}>{cell}</td>))}
          <td><i className="fa fa-trash-o" onClick={this.props.handleOnRowDelete.bind(null, cellsIndex)}></i></td>
        </tr>
      ))}
      {this.newRowUI()}
      </tbody>
    );
  }

  render() {
    const classes = this.props.className || 'table table-hover table-bordered';
    return (
      <table className={classes}>
        {this.headUI()}
        {this.bodyUI()}
      </table>
    );
  }

}

export default Table;
