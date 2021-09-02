//import MenuItems from '../../config/Roles2';
//const { Items } = MenuItems();
import { Home, Award } from "react-feather";
import Reportes from "../../pages/Reporte/Reporte";
import PanelPrincipal from "../../pages/PanelPrincipal/PanelPrincipal";
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
    title: "Instalaciones",
    icon: Award,
    type: "link",
    path: `${process.env.PUBLIC_URL}/reportes`,
    component: Reportes,
    active: false,
    bookmark: true,
  },
];
