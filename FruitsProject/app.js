const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true })

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

const Fruit = mongoose.model("Fruit", fruitSchema)

// const fruit = new Fruit ({
//     rating: 10,
//     review: "Pretty solid as a fruit."
// })

// fruit.save()

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema)

Fruit.findOne({name: "Orange"}, function (err, fruit) {
    if (err)
        console.log(err)
    else {
        Person.updateOne({name: "John"}, {favoriteFruit: fruit}, function (err) {
            if (err)
                console.log(err)
            else
                console.log("Successfully update John's favorite fruit.")
        })
    }
})



// Fruit.find(function (err, fruits) {
//     if (err)
//         console.log(err)
//     else {
//         mongoose.connection.close()

//         fruits.forEach (fruit => console.log(fruit.name))
//     }
// })

// Fruit.updateOne ({_id: "5ffa59136e581b46c84e16e1"}, {name: "Peach"}, function (err) {
//     if (err)
//         console.log(err)
//     else
//         console.log("Successfully updated the document.")
// })

// Fruit.deleteOne({name: "Peach"}, function (err) {
//     if (err)
//         console.log(err)
//     else 
//         console.log("Successfully delete the document.")
// })

