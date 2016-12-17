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
      loaded: true
    };
	}

  handlePlot(e) {
    this.setState({
      loaded: false
    });

    Actions.plot({});
  }

  handleImageNotFound(e) {
    e.target.style.display = "none";
  }

  getTableHead() {
    return [
      "x",
      "y"
    ]
  }

  getTableBody() {
    return [
      [1, 2],
      [3, 4]
    ]
  }

	render() {
		return (
			<div className="container home">
        <h2>Lirete (Linear Regression Template)</h2><br></br>
        <Table head={this.getTableHead()} body={this.getTableBody()} />
        <Loader loaded={this.state.loaded}>
          <button className="btn btn-success btn-large" onClick={this.handlePlot.bind(this)}>Plot</button><br></br>
          <img src="plot.png" onError={this.handleImageNotFound.bind(this)}></img>
        </Loader>
			</div>
		);
	}
}

export default Home;
