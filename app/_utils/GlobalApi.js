import axios from 'axios';
import { request, gql } from 'graphql-request'

// const MASTER_URL = process.env.HYGRAPH_API_KEY
const MASTER_URL = "https://api-sa-east-1.hygraph.com/v2/clt24nk7r1jus07w7oca7ff9q/master"


const getAllDocList = async () => {
  const query = gql`
  query Sliders {
    sliders {
      createdAt
      id
      name
      publishedAt
      updatedAt
      img {
        url
      }
    }
  }
  
    `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching doc list:", error);
    throw error;
  }
}

const getCategoryList = async () => {
  const query = gql`
  query categories {
    categories {
      category
      id
      icon {
        url
      }
    }
  }
  `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw error;
  }
}

const getDoctorsList = async () => {
  const query = gql`
  query doctors {
    doctors {
      categories {
        ... on Category {
          id
          category
          icon {
            url
          }
        }
      }
      hospitals {
        name
      }
      image {
        url
      }
      name
      patients
      id
    }
  }
 `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw error;
  }
}

const searchDocsByCategory = async (category) => {
  const query = gql`
  query docsByCategory {
    doctors(where: {categories_some: {Category: {category_contains: "`+ category + `"}}}) {
      id
    name
    image {
      url
    }
    patients
    hospitals {
      name
    }
    categories {
      ... on Category {
        category
      }
    }
  }
}
 `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error searching docs by category:", error);
    throw error;
  }
}

const searchDocsById = async (id) => {
  const query = gql`
  query searchDocById {
    doctor(where: {id: "`+ id + `"}) {
      categories {
        ... on Category {
          id
          category
          icon {
            url
          }
        }
      }
      gender
      hospitals {
        address
        id
        name
      }
      image {
        url
      }
      patients
      name
      id
    }
  }
 `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error searching docs by id:", error);
    throw error;
  }
}

const suggestedDoctors = async (id) => {
  const query = gql`
  query suggestions {
    doctors(where: {NOT: {id: "`+ id + `"}}, first: 5) {
      categories {
        ... on Category {
          category
        }
      }
      name
      id
      image {
        url
      }
      patients
    }
  }
 `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error searching suggested docs by id:", error);
    throw error;
  }
}
const bookAppointment = async (data) => {
  const query = gql`
  mutation bookAppoitment {
    createAppointment(
      data: {
        doctor: {connect: {id: "`+ data.doctorId + `"}},
        email: "` + data.email + `", 
        date: "` + data.date + `", 
        time: "` + data.time + `", 
        username: "` + data.username + `", 
        hospital: {connect: {id: "` + data.hospitalId + `"}},userid: "`+data.userId+`"}
    ) {
      id
      date
      doctor {
        name
      hospitals {
          address
          name
        }
      }
      time
      username
      userid
    }
  }
 `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error booking appointment", error);
    throw error;
  }
}

const publishAppointment = async (id) => {
  const query = gql`
  mutation publishAppointment {
    publishAppointment(where: {id: "`+id+`"}, to: PUBLISHED) {
      id
    }
  }
 `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error publishing appointment", error);
    throw error;
  }
}

const listAppointmentsUser = async (email) => {
  const query = gql`
  query userAppointments {
    appointments(where: {email: "`+email+`"}, stage: DRAFT) {
      date
      email
      doctor {
        name
        image {
          url
        }
        categories {
          ... on Category {
            category
            icon {
              url
            }
          }
        }
      }
      hospital {
        name
        address
      }
      time
      username
      id
    }
  }
 `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error listing appointments user", error);
    throw error;
  }
}

const deleteAppointment = async (id) => {
  const query = gql`
  mutation deleteBooking {
    deleteAppointment(where: {id: "`+id+`"}) {
      id
    }
  }
 `
  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error("Error deleting appointment", error);
    throw error;
  }
}


const sendEmail = (data) => {axios.post('/api/sendemail', data)}



export default {
  getAllDocList,
  getCategoryList,
  getDoctorsList,
  searchDocsByCategory,
  searchDocsById,
  suggestedDoctors,
  bookAppointment,
  sendEmail,
  listAppointmentsUser,
  deleteAppointment,
  publishAppointment
}