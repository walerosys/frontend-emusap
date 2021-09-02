const data = localStorage.getItem("data") || "";
const AuthStatus = localStorage.getItem("AuthStatus") || false;
const perfil = localStorage.getItem("perfil") || "";

const initialState = {
  token: data,
  perfil: perfil,
  AuthStatus: AuthStatus,
  notification: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      console.log(action.payload);
      localStorage.setItem("data", action.payload.token);
      localStorage.setItem("AuthStatus", true);
      localStorage.setItem("perfil", action.payload.usuario[0].tipo_de_usuario);
      return {
        ...state,
        token: action.payload.token,
        AuthStatus: true,
        perfil: action.payload.usuario[0].tipo_de_usuario,
      };
    case "SIGNOUT":
      localStorage.removeItem("data");
      localStorage.removeItem("AuthStatus");
      return { ...state, data: "", AuthStatus: false };
    case "CHANGE_ROLE":
      localStorage.setItem("data", JSON.stringify(action.payload));
      return { ...state, data: action.payload };
    case "NOTIFY":
      return { ...state, notification: action.payload };
    case "LOADING_AUTH":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
