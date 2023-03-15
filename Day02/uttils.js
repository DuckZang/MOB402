exports.tinhtong = function (a,b) {
    var tong = (a + b);
    return tong;
}
// cach 1 :
exports.showInfor = function (mess = "") { // khai bao bien 'mess' la string
    return "Thong bao dua ra : " + mess.toUpperCase();
}

// cach 2:
exports.showInfor2 = function (mess) {
    if(typeof mess == 'string'){
        return "Thong bao dua ra : " + mess.toUpperCase();
    }else{
        return "Du lieu dua ra khong dung"
    }
}
