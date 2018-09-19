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
  Tooltip,
  Table,
  TableColumn,
  Button,
  Select,
  Option,
  Input,
  Message,
  MessageBox
} from "element-ui";

import "assets/css/table.scss";

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
Vue.use(Tooltip);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;