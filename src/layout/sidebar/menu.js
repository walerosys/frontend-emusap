//import MenuItems from '../../config/Roles2';
//const { Items } = MenuItems();
import { Home, Award } from "react-feather";
import Actividades from "../../pages/Actividades/Actividades";
import Reportes from "../../pages/Reporte/Reporte";
import PanelPrincipal from "../../pages/PanelPrincipal/PanelPrincipal";
import Reporte from "../../pages/Reporte/Reporte";
//export const MENUITEMS = Items;
export const MENUITEMS = [
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
    path: `${process.env.PUBLIC_URL}/Actividades`,
    component: Actividades,
    active: false,
    bookmark: true,
  },
  {
    title: "Reporte",
    icon: Award,
    type: "link",
    path: `${process.env.PUBLIC_URL}/reportes`,
    component: Reportes,
    active: false,
    bookmark: true,
  }
];
