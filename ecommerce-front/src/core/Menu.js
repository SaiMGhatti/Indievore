import React, { Fragment } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import withRouter from "./withCustomRouter";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (location, path) => {
    if (location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = (props) => { 
    const location = useLocation();
    const navigate = useNavigate()
    return (
    <div>
        <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(location, "/")}
                    to=""
                >
                    Home
                </Link>
        </li>
        <li className="nav-item">
                 <Link
                    className="nav-link"
                    style={isActive(location, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>
            </li>
            
             <li className="nav-item">
                 <Link
                    className="nav-link"
                    style={isActive(location, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(location, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}

            
             {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(location, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        Dashboard
                    </Link>
                </li>
            )}
        {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                         <Link
                            className="nav-link"
                            style={isActive(location, "/signin")}
                            to="signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(location, "/signup")}
                            to="signup"
                        >
                            Signup
                        </Link>
                    </li>
                    </Fragment>
        )}
                    {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{cursor: "pointer", color: "#ffffff"}}
                            onClick={()=>
                                signout(() => {
                                    navigate("/");
                                })
                            }
                        >
                            Signout
                        </span>
                    </li>
                    )}
        </ul>
    </div>
)
};

// const Menu = ({ history }) => (
//     <div>
//         <ul className="nav nav-tabs bg-primary">
//             <li className="nav-item">
//                 <Link
//                     className="nav-link"
//                     style={isActive(history, "/")}
//                     to="/"
//                 >
//                     Home
//                 </Link>
//             </li>

//             <li className="nav-item">
//                 <Link
//                     className="nav-link"
//                     style={isActive(history, "/shop")}
//                     to="/shop"
//                 >
//                     Shop
//                 </Link>
//             </li>

//             <li className="nav-item">
//                 <Link
//                     className="nav-link"
//                     style={isActive(history, "/cart")}
//                     to="/cart"
//                 >
//                     Cart{" "}
//                     <sup>
//                         <small className="cart-badge">{itemTotal()}</small>
//                     </sup>
//                 </Link>
//             </li>

//             {isAuthenticated() && isAuthenticated().user.role === 0 && (
//                 <li className="nav-item">
//                     <Link
//                         className="nav-link"
//                         style={isActive(history, "/user/dashboard")}
//                         to="/user/dashboard"
//                     >
//                         Dashboard
//                     </Link>
//                 </li>
//             )}

//             {isAuthenticated() && isAuthenticated().user.role === 1 && (
//                 <li className="nav-item">
//                     <Link
//                         className="nav-link"
//                         style={isActive(history, "/admin/dashboard")}
//                         to="/admin/dashboard"
//                     >
//                         Dashboard
//                     </Link>
//                 </li>
//             )}

//             {!isAuthenticated() && (
//                 <Fragment>
//                     <li className="nav-item">
//                         <Link
//                             className="nav-link"
//                             style={isActive(history, "/signin")}
//                             to="/signin"
//                         >
//                             Signin
//                         </Link>
//                     </li>

//                     <li className="nav-item">
//                         <Link
//                             className="nav-link"
//                             style={isActive(history, "/signup")}
//                             to="/signup"
//                         >
//                             Signup
//                         </Link>
//                     </li>
//                 </Fragment>
//             )}

//             {isAuthenticated() && (
//                 <li className="nav-item">
//                     <span
//                         className="nav-link"
//                         style={{ cursor: "pointer", color: "#ffffff" }}
//                         onClick={() =>
//                             signout(() => {
//                                 history.push("/");
//                             })
//                         }
//                     >
//                         Signout
//                     </span>
//                 </li>
//             )}
//         </ul>
//     </div>
// );

export default withRouter(Menu);
