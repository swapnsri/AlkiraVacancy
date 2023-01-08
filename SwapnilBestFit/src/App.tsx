import NbaTeams from "./components/NbaTeams";
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Details from "./components/NbaTeams/Details";


function App() {
  return (
    <div className="ai-app-nba-teams">
      <BrowserRouter basename='/'>
        <Routes>
        <Route path="/" element={<NbaTeams/>}>
           <Route path="/details" element={<Details/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
