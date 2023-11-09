module.exports = (sequelize, Sequelize) => {
  const ImperfectSubjunctiveRa = sequelize.define("ImperfectSubjunctiveRa", {
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
      tableName: "ImperfectSubjunctiveRa",
      timestamps: false, // disable timestamps
    });

    return ImperfectSubjunctiveRa
}