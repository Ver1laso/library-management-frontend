import { Book } from '@mui/icons-material'
import axios from 'axios'
const baseUrl = 'http://localhost:8080'

let token = null
const setToken = newToken => {
    token = `Bearer ${newToken}`
}



const login = async (credentials) => {
    const response = await axios.post(`${baseUrl}/api/auth/login`, credentials);
    return response;
};

const register = async (userData) => {
    const response = await axios.post(`${baseUrl}/api/auth/register`, userData);
    return response.data;
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