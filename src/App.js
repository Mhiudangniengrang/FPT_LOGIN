
import Login from "./components/login/Login";

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ButtonLink from "./components/ButtonLink";
import Header from "./components/Header"
import Language from "./components/Language";
function App() {
  return (
    <div className="App">
     {/* <Login/> */}
     <ButtonLink/>
    <Header/>
    <Language/>
    </div>
  );
}

export default App;
