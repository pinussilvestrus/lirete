require('./index.scss');
class Table extends React.Component {

  constructor(props) {
    super(props);
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
