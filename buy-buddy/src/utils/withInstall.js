export const withInstall = (components) => {
  components.install = (app) => {
    // 當元件是 script setup 的形式時，會自動以文件名稱註冊, 並加載到元件的 __name 屬性上
    // 所以要加上這個條件
    const name = components.name || components.__name;
    // 註冊元件
    app.component(name, components);
  };
  return components;
};
