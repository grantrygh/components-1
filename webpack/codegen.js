const path = require('path');
const { GraphQLCodegenPlugin } = require('graphql-codegen-webpack');

module.exports = new GraphQLCodegenPlugin({
    schema: 'src/schema.graphql',
    documents: 'src/**/*.{ts,tsx}',
    config: path.join(process.cwd(), 'codegen.yml'),
    out: 'src/gqlTypes.ts',
    overwrite: true,
});
