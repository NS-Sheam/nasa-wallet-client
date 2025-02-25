import { baseApi } from "../redux/api/baseApi";
import { store } from "../redux/store";
import { tagTypeList } from "../redux/tagType";

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("deviceId");
  localStorage.removeItem("refreshToken");
  store.dispatch(baseApi.util.invalidateTags(Object.values(tagTypeList)));
};

export default logout;
