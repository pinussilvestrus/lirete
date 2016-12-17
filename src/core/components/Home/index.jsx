require('../../styles/base.scss');
require('../../styles/layout.scss');
require('./index.scss');
import Actions from '../../actions';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

  handlePlot(e) {
    Actions.plot({});
  }

  handleImageNotFound(e) {
    e.target.style.display = "none";
  }

	render() {
		return (
			<div className="container home">
        <h2>Lirete (Linear Regression Template)</h2><br></br>
        <button className="btn btn-default btn-large" onClick={this.handlePlot.bind(this)}>Plot</button><br></br>
        <img src="plot.png" onError={this.handleImageNotFound.bind(this)}></img>
			</div>
		);
	}
}

export default Home;
