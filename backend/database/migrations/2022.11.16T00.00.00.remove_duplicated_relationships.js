"use strict";

/**
 * Get the link tables names that need to be updated
 */
const getLinkTables = ({ strapi }) => {
  const contentTypes = strapi.db.metadata;
  const tablesToUpdate = {};

  contentTypes.forEach((contentType) => {
    // Get attributes
    const attributes = contentType.attributes;

    // For each relation type, add the joinTable name to tablesToUpdate
    Object.values(attributes).forEach((attribute) => {
      if (attribute.type === "relation" && attribute.joinTable) {
        tablesToUpdate[attribute.joinTable.name] = attribute.joinTable;
      }
    });
  });

  return Object.values(tablesToUpdate);
};

async function up(trx) {
  const linkTablesToUpdate = getLinkTables({ strapi });

  // Remove duplicates from link tables
  for (const table of linkTablesToUpdate) {
    const tableExists = await trx.schema.hasTable(table.name);
    if (!tableExists) continue;

    strapi.log.info(`Deleting duplicates of table ${table.name}...`);

    try {
      // Query to delete duplicates from a link table
      let query = `
        CREATE TEMPORARY TABLE tmp as SELECT DISTINCT t2.id as id
        FROM ?? as t1 JOIN ?? as t2
        ON t1.id < t2.id
      `;
      const pivotWhereParams = [];

      // For each pivot column, add a on condition to the query
      table.pivotColumns.forEach((column) => {
        query += ` AND t1.?? = t2.??`;
        pivotWhereParams.push(column, column);
      });

      // Create temporary table with the ids of the repeated rows
      await trx.raw(query, [table.name, table.name, ...pivotWhereParams]);

      // Delete repeated rows from the original table
      await trx.raw(`DELETE FROM ?? WHERE id in (SELECT * FROM tmp)`, [
        table.name,
      ]);
    } finally {
      // Drop temporary table
      await trx.raw(`DROP TABLE IF EXISTS tmp `);
    }
  }
}

async function down() {}

module.exports = { up, down };
