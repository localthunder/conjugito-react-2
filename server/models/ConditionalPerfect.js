module.exports = (sequelize, Sequelize) => {
  const ConditionalPerfect = sequelize.define("ConditionalPerfect", {
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
      tableName: "ConditionalPerfect",
      timestamps: false, // disable timestamps
    });
    
    return ConditionalPerfect;
}