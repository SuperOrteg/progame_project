import { Home } from "./Home";
import { PageDetail } from "./PageDetail";
import { PageList } from "./PageList";

const routes = {
  '': Home,
  'search': PageList,
  'game': PageDetail,
};

export { routes };