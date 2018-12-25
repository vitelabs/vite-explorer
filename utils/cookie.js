export function getCookie(cname) {
  let cookie = document.cookie;
  let i = cookie.indexOf(cname);
  if(i === -1) { return null; }
  else {
    let starti=i+cname.length+1;
    let endi=cookie.indexOf(";",starti);
    if(endi === -1){
      return cookie.slice(starti);
    }else{
      return cookie.slice(starti,endi);
    }
  }
}