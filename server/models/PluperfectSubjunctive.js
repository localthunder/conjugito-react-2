module.exports = (sequelize, Sequelize) => {
  const PluperfectSubjunctive = sequelize.define("PluperfectSubjunctive", {
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
      tableName: "PluperfectSubjunctive",
      timestamps: false, // disable timestamps
    });

    return PluperfectSubjunctive;
}