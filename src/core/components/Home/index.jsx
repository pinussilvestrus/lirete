require('../../styles/base.scss');
require('../../styles/layout.scss');
require('./index.scss');
import Actions from '../../actions';
import Table from '../Table';
import Loader from 'react-loader';

class Home extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      loaded: true,
      tableHead: ["x", "y", "dx", "dy"],
      tableBody: [ [1, 2, 0.5, 1], [3, 4, 0.5, 1], [3, 6, 0.5, 1], [4, 8, 0.5, 1] ],
      newTableRow: [1,2,3,4]
    };
	}

  handlePlot(e) {
    this.setState({
      loaded: false
    });

    Actions.plot({
      header: this.state.tableHead,
      body: this.state.tableBody
    });
  }

  handleDeleteRow(rowIndex, e) {
    let stateCopy = this.state.tableBody;
    stateCopy.splice(rowIndex, 1);
    this.setState({tableBody: stateCopy});
  }

  handleHeadElementChange(cellsIndex, e) {
    let stateCopy = this.state.tableHead;
    stateCopy[cellsIndex] = e.target.value;
    this.setState({tableHead: stateCopy});
  }

  handleNewTableRowElementChange(cellsIndex, e) {
    let stateCopy = this.state.newTableRow;
    stateCopy[cellsIndex] = e.target.value;
    this.setState({newTableForm: stateCopy});
  }

  handleAddNewRow(e) {
    let stateCopy = this.state.tableBody;
    stateCopy.push(this.state.newTableRow);
    this.setState({tableBody: stateCopy});
  }

  handleImageNotFound(e) {
    e.target.style.display = "none";
  }

	render() {
		return (
			<div className="container home">
        <h2>Lirete (Linear Regression Template)</h2><br></br>
        <Table
          head={this.state.tableHead}
          handleOnHeadElementChange={this.handleHeadElementChange.bind(this)}
          body={this.state.tableBody}
          handleOnRowDelete={this.handleDeleteRow.bind(this)}
          newTableRow={this.state.newTableRow}
          handleOnNewTableRowElementChange={this.handleNewTableRowElementChange.bind(this)}
          handleOnAddNewRow={this.handleAddNewRow.bind(this)}/>
        <Loader loaded={this.state.loaded}>
          <button className="btn btn-success btn-large" onClick={this.handlePlot.bind(this)}>Plot</button><br></br>
          <img src="plot.png" onError={this.handleImageNotFound.bind(this)}></img>
        </Loader>
			</div>
		);
	}
}

export default Home;
