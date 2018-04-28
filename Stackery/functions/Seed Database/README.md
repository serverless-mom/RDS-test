# Seed Database Function
Create, migrate, and seed a MySQL compatible database using [knex.js](http://knexjs.org). This function is run once upon stack creation.

## Schema
A database named 'accounts' will be created. Within the database, an 'accounts' table will be created with the following schema:

id: integer, primary column
name: string, value must be unique among all records

## Seed Data
Once the database has been initialized, a seed record with one account is inserted. After seeding, the table will contain:

| id | name |
| --- | --- |
| 1 | Stackery |

# General Stackery Information
## Dependencies
You can add dependencies on other files and packages.
Within this directory, local dependencies can be added as individual files and
package dependencies can be added to [package.json](https://docs.npmjs.com/files/package.json).
Package dependencies will be installed when the stack is deployed.

## Stackery Documentation
Documentation for Stackery function nodes can be found at [https://docs.stackery.io/nodes/Function/](https://docs.stackery.io/nodes/Function/).
