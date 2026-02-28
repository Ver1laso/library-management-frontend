import { Book } from '@mui/icons-material'
import axios from 'axios'
const baseUrl = 'http://localhost:8080'

// Global axios config
const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type' : 'application/json',
    },
});

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`

    api.defaults.headers.common['Authorization'] = token;
}



const login = async (credentials) => {
    console.log("Sending login request to: ", `${baseUrl}/api/auth/login`);
    console.log("Credentials:", credentials)

    try{
        const response = await axios.post(`${baseUrl}/api/auth/login`, credentials);
        console.log("Login response: ", response.data);
        return response;
    } catch (error){
        console.error("Loging error details", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            condig: error.condig
        });
        throw error;
    }
};

const register = async (userData) => {

    try{
        const response = await axios.post(`${baseUrl}/api/auth/signup`, userData);
        return response.data;
    } catch (error) {
        console.error("Register error: ", error);
        throw error;
    }
    
}

const getBookByISBN = (isbn) => {
    const request = axios.get(`${baseUrl}/api/books/search/isbn`, {
        params: {
            isbn: isbn
        }
    })
    return request.then(response => response.data)
}

const getBookByTitle = (title, language) => {
    const request = axios.get(`${baseUrl}/api/books/search/title`, {
        params: {
            title: title,
            langRestrict: language
        }
    })
    return request.then(response => response.data)
}

const getBookByAuthor = (author) => {
    const request = axios.get(`${baseUrl}/api/books/search/author`, {
        params: {
            author: author
        }
    })
    return request.then(response => response.data)
}

const saveSelectedBook = (Book) => {
    const request = axios.post(`${baseUrl}/api/books/save`, book)
    .then(response => response.data)
    .catch(error => {
        console.error("Error saving book: ". error);
        throw error;
    })

}

export default {
    login,
    register,
    getBookByISBN,
    getBookByTitle,
    getBookByAuthor,
    saveSelectedBook,
    setToken
}