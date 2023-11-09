module.exports = (sequelize, Sequelize) => {
    const Verb = sequelize.define("Verb", {
      infinitive: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      gerund: {
        type: Sequelize.STRING
      },
      pastParticiple: {
        type: Sequelize.STRING
      },
      irregular: {
        type: Sequelize.BOOLEAN
      },
      reflexive: {
        type: Sequelize.BOOLEAN
      },
      common: {
        type: Sequelize.BOOLEAN
      },
      englishInfinitive: {
        type: Sequelize.STRING
      }
    }, {
      tableName: "Verb"
    });
  
    return Verb;
  };
  