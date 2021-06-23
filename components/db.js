import mongoose from 'mongoose'

let dbName = 'foodDB'

function connectToDB(db){
    return mongoose.connect('mongodb://localhost:27017/' + db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    type: {
        type: String,
        required: [true, 'type is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
})
const FoodItem = mongoose.model('foodItems', foodSchema)

export async function addOne(item){
    let entry = new FoodItem({
        name: item.name,
        type: item.type,
        description: item.description
    })
    await connectToDB(dbName);
    await entry.save()
    let data = await FoodItem.find({})
    await mongoose.connection.close()
    return data;
}

export async function deleteOne(id){
    await connectToDB(dbName);
    await FoodItem.deleteOne({_id: id})
    let data = await FoodItem.find({})
    await mongoose.connection.close()
    return data;
}

export async function getAll(){
    await connectToDB(dbName);
    let data = await FoodItem.find({})
    await mongoose.connection.close()
    return data;
}
export async function checkForDuplicate(name){
    await connectToDB(dbName);
    let duplicate = false;
    let searchResult = await FoodItem.countDocuments({name: name})
    await mongoose.connection.close()
    if(searchResult > 0){
        throw Error('document already exists')
    }
    return searchResult
}