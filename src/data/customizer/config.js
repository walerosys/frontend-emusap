export class ConfigDB {
  static data = {
    settings: {
      layout_type: "ltr",
      sidebar: {
        type: "default",
        body_type: "default",
      },
      sidebar_setting: "default-sidebar",
      sidebar_background_setting: "color1-sidebar",
    },
    color: {
      layout_version: "light",
      color: "color-5",
      primary_color: "#7c4dff",
      secondary_color: "#7b1fa2",
      mix_background_layout: "light-only",
    },
    router_animation: "fadeIn",
  };

  // static data = {
  //     settings: {
  //         layout_type: 'ltr',
  //         sidebar: {
  //             type: 'default',
  //             body_type: 'default'
  //         },
  //         sidebar_setting: 'default-sidebar',
  //         sidebar_background_setting: ''
  //     },
  //     color: {
  //         layout_version: 'dark-only',
  //         color: 'color-2',
  //         primary_color: '#0288d1',
  //         secondary_color: '#26c6da',
  //         mix_background_layout: '',
  //     },
  //     router_animation: 'fadeIn'
  // }
}
export default ConfigDB;
