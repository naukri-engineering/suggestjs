function setCookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '=' + encodeURI(value) +
        ((expires) ? ';expires=' + expires_date.toGMTString() : '') + //expires.toGMTString()
        ((path) ? ';path=' + path : '') +
        ((domain) ? ';domain=' + domain : '') +
        ((secure) ? ';secure' : '');
}

function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return "";
    }
    if (start == -1) return "";
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return decodeURI(document.cookie.substring(len, end));
}

function delSingleCookie(name){
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

function deleteCookie(name) {
    if (Object.prototype.toString.call(name) == "[object Array]") {
        for (var x in name) {
          delSingleCookie(name[x]);
        }
    }else{
      delSingleCookie(name);
    }
}
