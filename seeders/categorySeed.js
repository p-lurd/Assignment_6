const db = require('../db');
const CategoryModel = require ('../models/category');


db.connect();


const categoryData = [
    {
        _id: '1',
        name: 'foodstuffs'
    }
];


async function seedIntoDb(){
    try {
        await CategoryModel.insertMany(categoryData);
        console.log('seeding successful');
        return
    } catch (error) {
        console.error('Error while seeding:', error);
        return
    }
};

seedIntoDb();