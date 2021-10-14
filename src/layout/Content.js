import React from "react";
import { TransitionGroup } from "react-transition-group";
import { Route } from "react-router-dom";
//import CreateTask from '../pages/admin/task/CreateTask';
//import TaskList from '../pages/admin/task/TaskList';
// import AddConsumo from '../pages/logistica/consumos/AddConsumo';
// import HomeTrat from "../pages/especialista/paciente/ActualTratamiento/Home";
// import Receta from '../pages/especialista/Receta';
//import Ticket from '../pages/asistente/formatos/Tickets';
import Perfil from "../pages/usuario/Perfil";

const Content = ({ anim, content }) => {
  const renderContent = (route) => {
    if (route.type === "link") {
      return (
        <Route
          key={route.path}
          exact
          path={route.path}
          component={route.component}
        />
      );
    } else if (route.type === "sub") {
      return route.children.map((subitem) => {
        if (subitem.type === "sub") {
          return subitem.children.map((childrenItem) => {
            return (
              <Route
                key={childrenItem.path}
                exact
                path={childrenItem.path}
                component={childrenItem.component}
              />
            );
          });
        } else {
          return (
            <Route
              key={subitem.path}
              exact
              path={subitem.path}
              component={subitem.component}
            />
          );
        }
      });
    }
  };

  return (
    <div className="page-body">
      <TransitionGroup>
        {content.map((route) => renderContent(route))}
        {/* <Route exact path="/admin/create/:id" component={CreateTask} />
                <Route exact path="/admin/tareas/lista/:id" component={TaskList} /> */}
        {/* <Route exact path="/modulo/tarea/detalle/:id" component={TaskDetail} /> */}
        {/* <Route exact path="/modulo/consumos/nuevo" component={AddConsumo} />
                <Route exact path="/modulo/especialista/tratamientoactual" component={HomeTrat} />
                <Route exact path="/modulo/especialista/receta" component={Receta} /> */}
        {/* <Route exact path="/modulo/especialista/recibo" component={Ticket} /> */}
        {/*<Route exact path="/perfil" component={Perfil} />*/}
        {/* <Route exact path="/modulo/compras/proveedores/nuevo" component={AddProveedor} /> */}
      </TransitionGroup>
    </div>
  );
};

export default Content;
