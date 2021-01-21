import axios from 'axios'

let SERVER_URL = process.env.REACT_APP_SERVER_URL

export const addFormStepOne = async (
  metaData,
  projectDetails,
  projectTimeline,
  commercials,
  commitment,
  negotiation,
  designElement,
  others,
  { endpoint, method }
) => {
  // step1/add
  //post
  try {
    const response = await axios({
      method,
      url: `${SERVER_URL}api/form/${endpoint}`,
      data: {
        metaData: metaData,
        projectDetails: projectDetails,
        projectTimeline: projectTimeline,
        commercials: commercials,
        commitment: commitment,
        negotiation: negotiation,
        designElement: designElement,
        others: others,
      },
    })

    const data = response
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const addFormStepTwo = async (
  formId,
  competition,
  { method, endpoint }
) => {
  try {
    console.log('competation in method service')
    console.log(typeof competition)
    console.log(competition)

    // `form/step2/add`
    const response = await axios({
      method,
      url: `${SERVER_URL}api/${endpoint}`,
      data: {
        formId: formId,
        competition: competition,
      },
    })

    // const response = await axios.post(`${SERVER_URL}api/form/step2/add`, {
    //   formId: formId,
    //   competition: competition,
    // })
    const data = response
    return data
  } catch (error) {
    console.log(error)
    return error
  }
}
