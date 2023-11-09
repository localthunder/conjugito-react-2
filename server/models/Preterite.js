module.exports = (sequelize, Sequelize) => {
  const Preterite = sequelize.define("Preterite", {
    infinitive: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      yo: {
        type: Sequelize.STRING,
      },
      tu: {
        type: Sequelize.STRING,
      },
      el: {
        type: Sequelize.STRING,
      },
      nosotros: {
        type: Sequelize.STRING,
      },
      vosotros: {
        type: Sequelize.STRING,
      },
      ellos: {
        type: Sequelize.STRING,
      },
    }, {
      tableName: "Preterite",
      timestamps: false, // disable timestamps
    });

    return Preterite;
}