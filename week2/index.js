const { ApolloServer, gql } = require("apollo-server");
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err) {
  console.log("MONGOdb connected");
  db = client.db("users"); //mongodb database 
  const Posts = db.collection('products')
});


const typeDefs = gql`

type Product {
    _id: ID!
    title: String!
    qty: Int
   }
   type Query {
    getProduct(_id: ID!): Product
    allProducts: [Product]
   }
   input ProductInput {
    title: String!
    qty: Int
   }
   type Mutation {
    createProduct(input: ProductInput) : Product
    updateProduct(_id: ID!, input: ProductInput): Product
    deleteProduct(_id: ID!) : Product
   }`

   export  const resolvers = {
    Query : {
       async getProduct(root, {_id}){
           return await Product.findById(_id);
       },
       async allProducts(){
           return await Product.find();
        }
    },
    Mutation: {
        async createProduct(root, {input}){
           return await Product.create(input);
        },
        async updateProduct(root, {_id, input}){
            return await Product.findOneAndUpdate({_id},input,{new: true})
        },
        async deleteProduct(root, {_id}){
            return await Product.findOneAndRemove({_id});
        }
    }
    

  
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(({ url }) => console.log(`Server running at ${ url } `));