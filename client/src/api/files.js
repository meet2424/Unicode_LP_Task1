import axios from "axios";

const apiUrl = "http://localhost:5000/api/";
// const token = localStorage.getItem('token')

export const singleFileUpload = async (formData) => {
    try {
        const response = await axios.post(apiUrl + "singleFileUpload", formData)
        return response;
    }
    catch (err) {
        throw err;
    }
}

export const getAllSingleFiles = async () => {
    try {
        const response = await axios.get(apiUrl + "getAllSingleFiles");
        // console.log(response);
        return response;
    }
    catch (err) {
        throw err;
    }
}

export const multipleFilesUpload = async (formData) => {
    try {
        const response = await axios.post(apiUrl + "multipleFilesUpload", formData);
        // console.log('s');
        return response;
    }
    catch (err) {
        throw err;
    }
}

export const getMultipleFiles = async () => {
    try {
        const response = await axios.get(apiUrl + "getAllMultipleFiles");
        // console.log(response);
        // console.log('m');
        return response;
    }
    catch (err) {
        throw err;
    }
}