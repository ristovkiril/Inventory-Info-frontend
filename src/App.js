import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';

import jQuery from 'jquery';
window.$ = jQuery;

// class App extends Component {
//   render() {
//     return (
//       <Router
//         forceRefresh={false}
//         basename="/">
//         <div className="body">
//           <Routes/>
//         </div>
//       </Router>
//     );
//   }
// }

function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [data, setData] = useState([]);
    const [isYearly, setIsYearly] = useState(true);
    const [gasses, setGasses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [years, setYears] = useState([]);


    return (
        <Router
            forceRefresh={false}
            basename="/">
            <div className="body">
                <Routes appData={{data, setData}} appIsYearly={{isYearly, setIsYearly}} appGasses={{gasses, setGasses}} appCategories={{categories, setCategories}} />
            </div>
        </Router>
    );
}

export default App;
