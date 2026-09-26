import { createApp } from "vue";
import "./style.css";

import App from "./App.vue";
import router from "./router";

import { useAuth } from "./stores/auth";

async function bootstrap() {
  const auth = useAuth();

  await auth.initialize();

  createApp(App)
    .use(router)
    .mount("#app");
}

bootstrap();