import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {    
    
    const app = express()
    const PORT = Number(process.env.PORT || 8000)
    const gqlServer = new ApolloServer({
        typeDefs:`
        type Query{
            hello:String
            say(name:String): String

        }`, //schema
        resolvers:{
            Query:{
                hello:()=>'Hello, World!',
                say: (_,{name}:{name:string})=>`hello {name}, how are you? `
                }
        }, //
      });
    
    await gqlServer.start()
    app.use(express.json())
    
    app.get(
        "/",
        (req, res) => {
            res.send("Hello, World!");
    
        }
    )

    app.use(
        "/graphql",
        expressMiddleware(gqlServer),
        )
    
    app.listen(
        PORT,
        () => {
            console.log(`Server is running on port ${PORT}`);
        }
    )
    
}

init()