const { ApolloServer, gql } = require("apollo-server");
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(function (err) {
  console.log("MONGOdb connected");
  db = client.db("users"); //mongodb database 
  const Posts = db.collection('books')
});


const typeDefs = gql`
type Query {
  my_query:[books]
  hello: String
}

type Mutation {
  addbook(title: String, author: String): books
}

type books{
_id:String,
title:String,
author:String
}`

const resolvers = {
  Query: {
    hello: () => {
      return `hello`;
    },
    my_query: async () => {
      values = await db.collection('books').find().toArray().then(res => { return res });
      return values
    }
  },
  Mutation:{
    addbook: async (root, args, context, info) => {
      values = await db.collection('books').insert(args);
      values = await db.collection('books').find(args).toArray().then(res => { return res });
      return values
    }
  }
    

  
};
const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(({ url }) => console.log(`Server running at ${ url } `));