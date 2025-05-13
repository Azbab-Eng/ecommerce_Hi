import { PureComponent } from "react";
import { composeWithDevTools } from "redux-devtools-extension";

class Scrollview extends PureComponent {
  componentDidMount = () => window.scrollTo(0, 0);

  componentDidUpdate = prevProps => {
    if (this.props.location !== prevProps.location) window.scrollTo(0, 0);
  };

  render = () => this.props.children;
}

export default composeWithDevTools(Scrollview);