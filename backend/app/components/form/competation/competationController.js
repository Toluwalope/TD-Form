"use strict";
import Competition from "./competationSchema.js";
import Form from "./../formSchema.js";
import errorHandler from "../../../utils/errorHandler/index.js";

class CompetitionController {
  //Add form step 2
  addCompetition = async (req, res) => {
    try {
      let competitions = req.body.competition;
      let formId = req.body.formId;
      let competitionsArray = [];
      for (let index = 0; index < competitions.length; index++) {
        // console.log(`itertraing ${index + 1} times`);
        competitionsArray.push({
          formId: formId,
          form: formId,
          shareCount: competitions[index].shareCount,
          finalTransfer: competitions[index].finalTransfer,
          averageDistance: competitions[index].averageDistance,
          deltaFirst: competitions[index].deltaFirst,
          bmLeader: competitions[index].bmLeader,
          averageBMScore: competitions[index].averageBMScore,
          rangeBMScore: competitions[index].rangeBMScore,
          bmBenchmark: competitions[index].bmBenchmark,
          noSuppliersRFQ: competitions[index].noSuppliersRFQ,
          noOfSuppliersAdmitted: competitions[index].noOfSuppliersAdmitted,
          noOfNeededSuppliers: competitions[index].noOfNeededSuppliers,
          sourceToMorethanOneSupplier:
            competitions[index].sourceToMorethanOneSupplier,
          methodOfNegotiation: competitions[index].methodOfNegotiation,
          noOfSharesAwarded: competitions[index].noOfSharesAwarded,
        });
      }
      let response = await Competition.insertMany(competitionsArray);
      let currentForm = await Form.findById(formId);
      let ids = [];
      let responseId = response.map((x) => {
        let id = x._id;
        ids.push(id);
      });
      // for (let index = 0; index < ids.length; index++) {
      // const element = ids[index];
      // currentForm.competition.push(element);
      currentForm.currentStep = 7;

      currentForm.competition = ids;
      await currentForm.save();
      // }
      return res.status(200).json({
        code: 200,
        response: response,
      });
    } catch (error) {
      console.log(error);
      errorHandler(res, error);
    }
  };

  //Get the competation
  getCompetation = async (req, res) => {
    try {
      const competitionId = req.params.competitionId;
      let response = await Competition.findById(competitionId);
      return res.status(200).json({
        code: 200,
        response: response,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  };

  //Update competation
  updateCompetation = async (req, res) => {
    try {
      const competitionId = req.params.competitionId;
      let response = await Competition.findOneAndUpdate(
        {
          _id: competitionId,
        },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.status(200).json({
        code: 200,
        message: "Updated Successfully!!! :)",
        response: response,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  };

  //Delete competation
  deleteCompetition = async (req, res) => {
    try {
      let competitionId = req.params.competitionId;
      let response = await Competition.findByIdAndRemove(competitionId);
      let currentFormId = response.formId;
      let currentForm = await Form.findById(currentFormId);
      let index = await currentForm.competition.indexOf(competitionId);
      if (index !== -1) {
        await currentForm.competition.splice(index, 1);
        await currentForm.save();
      }
      return res.status(200).json({
        code: 200,
        message: "Deleted Successfully!!! :)",
        response: response,
      });
    } catch (error) {
      errorHandler(res, error);
    }
  };
}

const competitionController = new CompetitionController();
export default competitionController;
