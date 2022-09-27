import React from "react";
import {
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import routes from "../routes";

const Content = () => {
  return (
    <React.Fragment>
      <Routes>
        {routes.map((route, idx) => {
          return (
            route.element && (
              <Route
                key={idx}
                path={route.path}
                //  exact={route.exact}
                element={<route.element />}
              />
            )
          );
        })}
      </Routes>
    </React.Fragment>
  );
};

export default Content;
