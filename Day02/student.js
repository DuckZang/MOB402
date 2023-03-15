export default class Student {
    constructor ( name, mssv, diemTB){
        this.name = name;
        this.mssv = mssv;
        this.diemTB = diemTB;
    }

    constructor (){

    }
    test() {
        console.log('hello world');
      }

    static getInfo(){
        return "TenSV : "+this.name + "- MSSV " + this.mssv + "- DiemTB " + this.diemTB
    }
}