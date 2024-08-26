import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}



// import React from "react";
// import { useParams, /* ...other hooks */ } from 'react-router-dom';

// const withRouter = WrappedComponent => props => {
//   const params = useParams();
//   // ...other hooks

//   return (
//     <WrappedComponent
//       {...props}
//       {...{ params, /* other hook props */ }}
//     />
//   );
// };

export default withRouter;