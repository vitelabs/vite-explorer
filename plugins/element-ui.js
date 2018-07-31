import Vue from "vue";
import {
  Loading, 
  Icon, 
  Pagination, 
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown, 
  DropdownMenu, 
  DropdownItem, 
  Popover, 
  Table,
  TableColumn,
  Button
} from "element-ui";

import "assets/css/table.scss";

Vue.prototype.$ELEMENT = { size: "small" };

Vue.use(Loading.directive);
Vue.use(Icon);
Vue.use(Pagination);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Popover);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);

Vue.prototype.$loading = Loading.service;