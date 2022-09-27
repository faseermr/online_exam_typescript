import http from '../http.common';
import {classlist} from '../model/index'
// get all class list
const getAllClass = () => {
    return http.get(`/classroom`)
}

// insert class details
const create = (data:classlist) => {
    return http.post(`/classroom`,data)
}

// delete class
const deleteClass = (grade:Number) => {
    return http.delete(`/classroom/${grade}`)
}

// update class
const updateClass = (id:Number,data:classlist) => {
    return http.put(`/classroom/update/${id}`,data)
}


export default {
    getAllClass,
    create,
    deleteClass,
    updateClass
}