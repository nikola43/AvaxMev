/* eslint-env node */

require('dotenv').config({ path: '.env.production' })
const child_process = require('child_process')
const fs = require('fs/promises')
const { promisify } = require('util')
const dataConfig = require('../graphql.data.config')
const thegraphConfig = require('../graphql.thegraph.config')

const exec = promisify(child_process.exec)

const REACT_APP_HOST_NAME = process.env.REACT_APP_HOST_NAME;
function fetchSchema(url, outputFile) {
  exec(`npx --silent get-graphql-schema --h Origin=${REACT_APP_HOST_NAME} ${url}`)
    .then(({ stderr, stdout }) => {
      if (stderr) {
        throw new Error(stderr)
      } else {
        fs.writeFile(outputFile, stdout)
      }
    })
    .catch((err) => {
      console.error(err)
      console.error(`Failed to fetch schema from ${url}`)
    })
}

fetchSchema(process.env.THE_GRAPH_SCHEMA_ENDPOINT, thegraphConfig.schema)
fetchSchema(process.env.REACT_APP_AWS_API_ENDPOINT, dataConfig.schema)
