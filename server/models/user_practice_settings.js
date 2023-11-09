module.exports = (sequelize, Sequelize) => {
    const UserPracticeSettings = sequelize.define("user_practice_settings", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      showIrregularVerbs: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showReflexiveVerbs: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showUncommonVerbs: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showPresent: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showPreterite: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showFuture: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showConditional: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showImperfect: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showPresentProgressive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showPreteriteProgressive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showImperfectProgressive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showConditionalProgressive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showFutureProgressive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showPresentPerfect: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showPreteritePerfect: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showPluperfect: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showConditionalPerfect: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showFuturePerfect: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showPresentSubjunctive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showImperfectSubjunctiveRa: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showImperfectSubjunctiveSe: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showFutureSubjunctive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showPresentPerfectSubjunctive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showPluperfectSubjunctive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showFuturePerfectSubjunctive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      showImperative: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      showNegativeImperative: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
    }, {
      tableName: "user_practice_settings",
      timestamps: true,
    });
  
    return UserPracticeSettings;
  };
  