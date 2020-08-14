import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Components/Home";
import Results from "./Components/Results";
import Admission from "./Components/Admission";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path='/results' component={Results} />
					<Route exact path='/admissions' component={Admission} />
					<Route exact path='/' component={Home} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
