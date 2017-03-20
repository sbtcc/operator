import React        from 'react';
import { render }   from 'react-dom';
import Example      from './example';

//import ExampleApp from './exampleApp';

import {
	UFSProvider,
	Workspace,
	AppContainer,

	RootComponent
} from 'ufs-ui';



import store        from './store';
/*
import { Provider } from 'react-redux';
*/

render((
	<UFSProvider reducer={store} logger>
		<Example/>
	</UFSProvider>
), document.getElementById('app'));


/*
const myReducer = (state={}, action) => {
console.log("myReducer", state, action);
	return state || {}
}

render((
	<UFSProvider reducer={myReducer}>
			<RootComponent/>
	</UFSProvider>
), document.getElementById('app'));
*/