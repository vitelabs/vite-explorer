import ax from "./axios";

// get user info
export function getAuth() {
  return ax.get("/auth")
    .then(res => res.data);
}
