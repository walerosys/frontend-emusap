//import MenuItems from '../../config/Roles2';
//const { Items } = MenuItems();
import {
  Home,
  Award,
  List,
  BarChart2,
  Aperture,
  Users,
  User,
} from "react-feather";
import Actividades from "../../pages/Actividades/Actividades";
import Instalacion from "../../pages/Instalacion/Instalacion";
import Tipos from "../../pages/Tipo/Tipo";
import Perfil from "../../pages/usuario/Perfil";
import Usuario from "../../pages/usuario/Usuario";
import Reportes from "../../pages/Reporte/Reporte";
import PanelPrincipal from "../../pages/PanelPrincipal/PanelPrincipal";
//export const MENUITEMS = Items;
export const MENUADMIN = [
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
    title: "Perfil",
    icon: User,
    type: "link",
    path: `${process.env.PUBLIC_URL}/perfil`,
    component: Perfil,
    active: false,
    bookmark: true,
  },
  {
    title: "Instalación",
    icon: Aperture,
    type: "link",
    path: `${process.env.PUBLIC_URL}/instalacion`,
    component: Instalacion,
    active: false,
    bookmark: true,
  },
  {
    title: "Actividades",
    icon: List,
    type: "link",
    path: `${process.env.PUBLIC_URL}/Actividades`,
    component: Actividades,
    active: false,
    bookmark: true,
  },
  {
    title: "Tipos Inst.",
    icon: List,
    type: "link",
    path: `${process.env.PUBLIC_URL}/tipos`,
    component: Tipos,
    active: false,
    bookmark: true,
  },
  {
    title: "Usuarios",
    icon: Users,
    type: "link",
    path: `${process.env.PUBLIC_URL}/usuarios`,
    component: Usuario,
    active: false,
    bookmark: true,
  },
  {
    title: "Reporte",
    icon: BarChart2,
    type: "link",
    path: `${process.env.PUBLIC_URL}/reportes`,
    component: Reportes,
    active: false,
    bookmark: true,
  },
];

export const MENUUSUARIO = [
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
    title: "Perfil",
    icon: User,
    type: "link",
    path: `${process.env.PUBLIC_URL}/perfil`,
    component: Perfil,
    active: false,
    bookmark: true,
  },
  {
    title: "Instalación",
    icon: Aperture,
    type: "link",
    path: `${process.env.PUBLIC_URL}/instalacion`,
    component: Instalacion,
    active: false,
    bookmark: true,
  },
  {
    title: "Actividades",
    icon: List,
    type: "link",
    path: `${process.env.PUBLIC_URL}/Actividades`,
    component: Actividades,
    active: false,
    bookmark: true,
  },
  {
    title: "Tipos Inst.",
    icon: List,
    type: "link",
    path: `${process.env.PUBLIC_URL}/tipos`,
    component: Tipos,
    active: false,
    bookmark: true,
  },
];
