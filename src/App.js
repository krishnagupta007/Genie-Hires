import { Home } from './Screens/Home';
import {
  Routes,
  Route
} from "react-router-dom";
import { Login } from './Screens/Login';
import { SignUp } from './Screens/SignUp';
import { ForgotPassword } from './Screens/ForgotPassword';
import { EmailSignUp } from './Screens/EmailSignUp';
import { PostJob } from './Screens/PostJob';
import { JobDetails } from './Screens/JobDetails';
import { BrowseJobs } from './Screens/BrowseJobs';
import { FullDetails } from './Screens/FullDetails';
import Page404 from './Components/Page404';
import Admin from './Screens/Admin';
import AdminPanel from './Screens/AdminPanel';
import About from './Components/About';
import Contact from './Components/Contact';

function App() {
  const user = localStorage.getItem("authToken")
  const admin = localStorage.getItem("admin")
  console.log("Auth Token: " + user);
  return (
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/about' element={<About/>} />
        <Route exact path='/contact' element={<Contact/>} />
        {!user && ( 
        <>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<SignUp/>} />
        <Route exact path='/emailsignup' element={<EmailSignUp/>} />
        <Route exact path='/postjob' element={<PostJob/>} />
        <Route exact path='/postjob/jobdetails' element={<JobDetails/>} />
        </>
        )}
        <Route exact path='/forgotpassword' element={<ForgotPassword/>} />
        <Route exact path='/jobs' element={<BrowseJobs/>}/>
        <Route exact path='/jobdetails' element={<FullDetails/>}/>
        {!admin && ( 
          <Route exact path='/admin' element={<Admin/>}/>
        )}
        {admin && (
          <Route exact path='/adminPanel' element={<AdminPanel/>}/>
        )}
        <Route exact path='*' element={<Page404/>}/>
      </Routes>
  );
}

export default App;
