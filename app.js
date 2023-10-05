let carMaster = [
 {model: "Swift Dzire VXi", make: "Maruti", fuel: "Diesel", 
  colors: ["White", "Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"},
 {model: "Etios SMi", make: "Toyota", fuel: "Diesel",
  colors: ["White", "Steel Grey", "Black"], type: "Hatchback", transmission: "Manual"},
 {model: "minprice AXi", make: "Honda", fuel: "Petrol",
  colors: ["Silver Grey", "Metallic Blue", "Black"], type: "Sedan", transmission: "Automatic"},
 {model: "Swift DXi", make: "Maruti", fuel: "Diesel",
  colors: ["White", "Red", "Black"], type: "Hatchback", transmission: "Manual"},
 {model: "Etios VXi", make: "Toyota", fuel: "Diesel",
  colors: ["White", "Silver Grey", "Black"], type: "Sedan", transmission: "Manual"},
 {model: "minprice ZXi", make: "Honda", fuel: "Petrol",
  colors: ["Silver Grey", "Metallic Blue", "Red"], type: "Sedan", transmission: "Manual"}
];

let cars = [
 {id: "ABR12", price: 400000, year: 2015, kms: 25000, model: "Swift Dzire VXi", color: "White"},
 {id: "CBN88", price: 480000, year: 2012, kms: 75000, model: "Etios SMi", color: "Steel Grey"},
 {id: "XER34", price: 300000, year: 2013, kms: 55000, model: "minprice AXi", color: "Metallic Blue"},
 {id: "MPQ29", price: 400000, year: 2015, kms: 25000, model: "Swift DXi", color: "Black"},
 {id: "PYQ88", price: 480000, year: 2012, kms: 75000, model: "Etios VXi", color: "White"},
 {id: "DFI61", price: 300000, year: 2013, kms: 55000, model: "minprice ZXi", color: "Red"},
 {id: "JUW88", price: 400000, year: 2015, kms: 25000, model: "Swift Dzire VXi", color: "White"},
 {id: "KPW09", price: 285000, year: 2012, kms: 76321, model: "Swift Dzire VXi", color: "White"},
 {id: "NHH09", price: 725000, year: 2018, kms: 15000, model: "minprice ZXi", color: "Silver Grey"},
 {id: "CTT26", price: 815000, year: 2016, kms: 42500, model: "minprice AXi", color: "Metallic Blue"},
 {id: "VAU55", price: 345000, year: 2014, kms: 81559, model: "Swift DXi", color: "Red"},
 {id: "BTR31", price: 184000, year: 2011, kms: 120833, model: "Etios VXi", color: "Silver Grey"}
];
let express = require('express');
let app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

const port =  2410;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

app.get('/carmaster', function (req, res) {
    res.send(carMaster);
});
app.get('/cars', function (req, res) {
    let minprice = req.query.minprice;
    let maxprice = req.query.maxprice;
    let fuel = req.query.fuel;
    let type = req.query.type;
    let sort = req.query.sort;
    let cust = cars;
    if (minprice) {
        cust = cust.filter((a) => a.price>= minprice);
    }
    if (maxprice) {
         cust = cust.filter((a) => a.price<= maxprice);
    }
    if (fuel) {
        cust = cust.filter((car) => {
            let car1 = carMaster.find((a) => a.model === car.model);
            return car1.fuel === fuel;
         });
    }
    if (type) {
        cust = cust.filter((car) => {
            let car1 = carMaster.find((a) => a.model === car.model);
            return car1.type===type;
         });
    }
    if (sort === 'kms')
        cust.sort((a, b) => (+a.kms)-(+b.kms));
    if (sort === 'price')
        cust.sort((a, b) => (+a.price)-(+b.price));
    if (sort === 'year')
        cust.sort((a, b) => (+a.year)-(+b.year));
    res.send(cust);
});
app.get('/cars/:id', function (req, res) {
    let id = req.params.id;
    let findcar = cars.find((a) => a.id === id);
    if (findcar) {
        res.send(findcar);
    } else {
        res.status(500).send("Enter a valid id");
    }
});
app.post('/cars', function (req, res) {
    let cust = req.body;
    let findcar = cars.find((a) => a.id === cust.id);
    if (findcar) {
        res.status(500).send("Enter a unique id");
    } else {
        cars.push(cust);
         res.status(202).send('car Added');
    }
});
app.put('/cars/:id', function (req, res) {
    let cust = req.body;
    let id = req.params.id;
    //console.log(cust, id);
    let custInd = cars.findIndex((a) => a.id === id);
    if (custInd<0) {
        res.status(500).send("No car found with the id");
    } else {
        cars[custInd]=cust;
        res.status(202).send('car Updated');
    }
});
app.delete('/cars/:id', function (req, res) {
    let id = req.params.id;
    
    let custInd = cars.findIndex((a) => a.id === id);
    // if (custInd<0) {
    //     res.status(500).send("No car found with the id");
    // } 
    if(custInd>=0) {
        //console.log(custInd);
        cars.splice(custInd, 1);
         res.status(202).send('Car Deleted');
    }
  
});