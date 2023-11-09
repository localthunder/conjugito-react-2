const db = require('../models');

exports.getAllTenses = async (req, res) => {
  try {
    const tenses = await db.tense.findAll();
    res.json(tenses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getTenseWithVerb = async (req, res) => {
  try {
    const { tense } = req.params;
    const tenseData = await db[tense].find({
      include: [{
        model: db[tense], // assuming this is your junction table name between Verb and Tense
      }]
    });
    res.json(verbs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getPresentConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    console.log("db.Present: ", db.Present)
    const data = await db.Present.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getPreteriteConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Preterite.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getFutureConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Future.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getImperfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Imperfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getConditionalConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Conditional.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getPresentPerfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.PresentPerfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getPreteritePerfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.PreteritePerfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getPluperfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Pluperfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getFuturePerfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.FuturePerfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getConditionalPerfectConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.ConditionalPerfect.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getImperativeConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.Imperative.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getNegativeImperativeConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.NegativeImperative.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getPresentSubjunctiveConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.PresentSubjunctive.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getImperfectSubjunctiveRaConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.ImperfectSubjunctiveRa.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.getImperfectSubjunctiveSeConjugations = async (req, res) => {
  try {
    const { infinitive } = req.params;
    const data = await db.ImperfectSubjunctiveSe.findOne({
      where: {infinitive: infinitive}
    });
    if (data) {
      res.json(data);
    } else {
      res.status(404).send('Verb not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};





// exports.getVerbForTense = async (req, res) => {
//   try {
//     const { tense, verb } = req.params;

//     // Choose the model based on the tense
//     let Model;
//     console.log('db.present:', db.present)
//     switch (tense.toLowerCase()) {
//       case 'present':
//         Model = db.present;
//         break;  
//       case 'preterite':
//         Model = db.preterite;
//         break;
//       case 'future':
//         Model = db.future;
//         break;
//       case 'imperfect':
//         Model = db.imperfect;
//         break;
//       case 'conditional':
//         Model = db.conditional;
//         break;
//       case 'presentperfect':
//         Model = db.PresentPerfect;
//         break;
//       case 'preteriteperfect':
//         Model = db.PreteritePerfect;
//         break;
//       case 'futureperfect':
//         Model = db.FuturePerfect;
//         break;
//       case 'conditionalperfect':
//         Model = db.ConditionalPerfect;
//         break;
//       case 'pluperfect':
//         Model = db.Pluperfect;
//         break;
//       case 'presentsubjunctive':
//         Model = db.PresentSubjunctive;
//         break;
//       case 'imperfectsubjunctivera':
//         Model = db.ImperfectSubjunctiveRa;
//         break;
//       case 'imperfectsubjunctivese':
//         Model = db.ImperfectSubjunctiveSe;
//         break;
//       case 'imperative':
//         Model = db.Imperative;
//         break;
//       case 'negativeimperative':
//         Model = db.NegativeImperative;
//         break;
//         default:
//         res.status(400).send('Invalid tense');
//         return;
//     }

//     // Now use the model to query the database
//     const result = await Model.findOne({
//       where: { infinitive: verb }
//     });

//     if (result) {
//       res.json(result);
//     } else {
//       res.status(404).send('Verb not found');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// };
