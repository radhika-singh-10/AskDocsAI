const { ApolloServer, gql } = require('apollo-server');
const { analyzeClause } = require('./llm');

const typeDefs = gql`
  type Query {
    analyze(text: String!): ClauseAnalysis
  }

  type ClauseAnalysis {
    riskLevel: String
    insights: String
    clauseType: String
  }
`;

const resolvers = {
  Query: {
    analyze: async (_, { text }) => {
      return await analyzeClause(text);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
