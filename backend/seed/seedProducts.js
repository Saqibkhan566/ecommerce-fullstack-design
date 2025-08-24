// seed/seedProducts.js
import 'dotenv/config'          // loads MONGO_URI from .env
import mongoose from 'mongoose'
import faker from 'faker'
import Product from '../models/Product.js'

const categories = [
    'Automobiles',
    'Clothes and wear',
    'Home interiors',
    'Computer and tech',
    'Tools, equipment',
    'Sports and outdoor',
    'Animal and pets',
    'Machinery tools',
    'More category',
]

const brands = [
    'Acme',
    'Globex',
    'Umbrella',
    'Stark',
    'Wayne',
    'Initech',
    'Soylent',
]

async function runSeeder(totalCount = 1000) {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('✅ Connected to MongoDB')

        // wipe existing data
        await Product.deleteMany({})
        console.log('🗑️  Cleared products')

        const batchSize = 500
        let inserted = 0

        while (inserted < totalCount) {
            const currentBatch = Math.min(batchSize, totalCount - inserted)
            const items = Array.from({ length: currentBatch }).map((_, idx) => {
                const category = faker.random.arrayElement(categories)
                const brand = faker.random.arrayElement(brands)
                return {
                    name: faker.commerce.productName(),
                    description: faker.lorem.sentences(2),
                    category,
                    brand,
                    price: Number(faker.commerce.price(5, 1500, 2)),
                    image: `https://picsum.photos/seed/${inserted + idx}/600/400`,
                    stock: faker.datatype.number({ min: 0, max: 100 }),
                    rating: Math.round(Math.random() * 50) / 10,
                    numReviews: faker.datatype.number({ min: 0, max: 500 }),
                }
            })

            await Product.insertMany(items, { ordered: false })
            inserted += currentBatch
            console.log(`🛠  Inserted ${inserted}/${totalCount}`)
        }

        console.log(`🎉 Seeding complete: ${inserted} products`)
    } catch (err) {
        console.error('❌ Seeder error:', err)
    } finally {
        await mongoose.disconnect()
        console.log('🔌 Disconnected from MongoDB')
        process.exit(0)
    }
}

// allow `npm run seed 5000`
const arg = Number(process.argv[2])
const count = Number.isFinite(arg) && arg > 0 ? arg : 1000
runSeeder(count)