import React from 'react';
import { Link } from 'react-router-dom';


const AddRoute = ({webId}) => {
 
  return (
    <header role="navigation" className="header header__desktop fixed">
      <section className="header-wrap">
        <div className="logo-block">
          <Link to="/addroute">
            <img src="/img/icon/addroute.png" alt="ruta nueva" />
          </Link>
        </div>
      </section>
    </header>
  );
};


export default AddRoute;
