import { DataTypes } from 'sequelize';

  const UserPracticeSettings = (sequelize) => {
    const model = sequelize.define("user_practice_settings", {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      showIrregularVerbs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showReflexiveVerbs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showUncommonVerbs: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showPresent: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showPreterite: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showFuture: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showConditional: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showImperfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showPresentProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPreteriteProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showImperfectProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showConditionalProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showFutureProgressive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPresentPerfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showPreteritePerfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showPluperfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showConditionalPerfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showFuturePerfect: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showPresentSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showImperfectSubjunctiveRa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showImperfectSubjunctiveSe: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showFutureSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPresentPerfectSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showPluperfectSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showFuturePerfectSubjunctive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      showImperative: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      showNegativeImperative: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    }, {
      tableName: "user_practice_settings",
      timestamps: true,
    });
  
    return model;
  }

export default UserPracticeSettings
  