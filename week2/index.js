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

const resolvers = {
  Query: {
    hello: () => {
      return `hello`;
    },
    my_query: async () => {
      values = await db.collection('products').find().toArray().then(res => { return res });
      return values
    }
  },
  Mutation:{
    addbook: async (root, args, context, info) => {
      values = await db.collection('products').insert(args);
      values = await db.collection('products').find(args).toArray().then(res => { return res });
      return values
    }
  }
    

  
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(({ url }) => console.log(`Server running at ${ url } `));