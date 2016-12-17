require('../../styles/base.scss');
require('../../styles/layout.scss');
import Actions from '../../actions';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

  handlePlot(e) {
    Actions.plot({});
  }

	render() {
		return (
			<div>
        Hello world
        <button onClick={this.handlePlot.bind(this)}>Plot</button>
        <img src="plot.png"></img>
			</div>
		);
	}
}

export default Home;
