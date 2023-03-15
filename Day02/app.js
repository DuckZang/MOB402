var uttils = require('./uttils')
const express = require("express");
const app = express();
import Student from './student';



app.listen(4000, () => {
    console.log("Application started and Listening on port 4000");
});

app.get("/", (req, res) => {

    // let date = new Date();
    // let year = date.getFullYear();
    
    // let myCar = new Car("Ford", 2014);

    // var cars = [];
    
    var students = new Student();

    students.push(new Student("Giang", "PH27260", 10));
    students.push(new Student("PhamDucGiang", "PH272601", 6));
    students.push(new Student("DuckZang", "PH2260", 6.4));
    students.push(new Student("FamDuckZang", "PH27210", 8.3));

    console.log(students.test()) ;

    // var studentInfo = "";
    // for (var i = 0; i < students.length; i++){
    //  var info = students[i].getInfo;
    //  studentInfo += info;
    // }

    // cars.push(myCar);
    // cars.push(new Car("Toyota",2015))
    // cars.push(new Car("Honda",2011))
    // cars.push(new Car("BMW",2016))
    // cars.push(new Car("Mec",2014))

    // cars.splice(1,1);
    // console.log(Number(new Date()));

    // var carInfo ='';

    // for(var i=0; i<cars.length; i++){
    //     var car = cars[i];
    //     var info = "xe " + car.name + " - NamSX :" + car.year + "\n"
    //     carInfo += info;
    // }

    // cars.forEach((car) => {
    //     var info = "xe " + car.name + " - NamSX :" + car.year + "\n" ;
    //     carInfo += info;
    // });

    // res.send(studentInfo);
    // res.send("My car is : " + myCar.age(year) + " years old.");
    // res.send(uttils.showInfor2("hehe"));
    // res.send(uttils.showInfor2(2));
    // res.send(uttils.showInfor('Ngay 10/03/2023') + "\n");
    // res.send("6 + 3 = " + uttils.tinhtong(6, 3) + "\n");

    

    

});

class Car {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
    age(x) {
        return x - this.year;
      }
}
