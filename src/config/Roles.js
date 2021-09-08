import {
  File,
  Monitor,
  Home,
  Award,
  PhoneCall,
  Airplay,
  Users,
  Settings,
} from "react-feather";
//import Task from "../pages/admin/task/Task";
import MonitorActual from "../pages/Monitor/Monitor";
import PanelPrincipal from "../pages/PanelPrincipal/PanelPrincipal";
import Reportes from "../pages/Reporte/Reporte";
import Actividades from "../pages/Actividades/Actividades";

export const MENU = () => {
  let Items = [
    {
      title: "Panel Principal",
      icon: Home,
      type: "link",
      path: `${process.env.PUBLIC_URL}/principal`,
      component: PanelPrincipal,
      active: false,
      bookmark: true,
    },
    {
      title: "Actividades",
      icon: Award,
      type: "link",
      path: `${process.env.PUBLIC_URL}/actividades`,
      component: Actividades,
      active: false,
      bookmark: true,
    },
    {
      title: "Reportes",
      icon: Award,
      type: "link",
      path: `${process.env.PUBLIC_URL}/reportes`,
      component: Reportes,
      active: false,
      bookmark: true,
    },
  ];

  let cleanArray = Items.filter(function (el) {
    return Object.keys(el).length !== 0;
  });

  let page = "";
  if (typeof cleanArray[0].path !== "undefined") {
    page = cleanArray[0].path;
  } else if (typeof cleanArray[0].children[0].path !== "undefined") {
    page = cleanArray[0].children[0].path;
  } else {
    page = cleanArray[0].children[0].children[0].path;
  }

  return { cleanArray, page };
};
