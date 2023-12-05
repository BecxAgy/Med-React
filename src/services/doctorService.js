import { doctorApi, requestConfig } from "../config/config";

//get method
const getAllDoctors = async (page) => {
  const config = requestConfig("GET", null);

  try {
    debugger;
    const res = await fetch(doctorApi + "get-all?page=" + page, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//GET BY ID
// const getDoctorById = async (id, token) => {
//   const config = requestConfig("GET", null, token);

//   try {
//     const res = await fetch(doctorApi + id, config)
//       .then((res) => res.json())
//       .catch((err) => err);

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

//post method
const createDoctor = async (data) => {
  const config = requestConfig("POST", data);

  try {
    debugger;
    const res = await fetch(doctorApi + "create", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//delete method
const deleteDoctor = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(doctorApi + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

//edit method
const updateDoctor = async (id, data, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(doctorApi + "find" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const doctorService = {
  getAllDoctors,
  createDoctor,
  deleteDoctor,
  updateDoctor,
};

export default doctorService;
