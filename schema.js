'use strict';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

//Harcoded data
const customers = [
    {id: '1', name: 'John doe', email: 'johnd@gmail.com', age: 35},
    {id: '2', name: 'Jan doe', email: 'jand@gmail.com', age: 33},
    {id: '3', name: 'jad doe', email: 'jadd@gmail.com', age: 15},
]

//Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: _ => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type:GraphQLInt}
    })
});

//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                for (let i = 0; i < customers.length; i++) {
                    if (customers[i].id === args.id) {
                        return customers[i];
                    }
                }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});