import { Link } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="nav">
      <Link className='nav-item nav-link' to='/'>Home</Link>
      <Link className='nav-item nav-link' to='/SavedCandidates'>Saved Candidates</Link>
    </nav>
  )
};

export default Nav;
