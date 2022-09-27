import http from "../http.common";
import { subjectlist } from "../model";

const getAllSubject = () => {
  return http.get(`/subject`);
};

const getSubjectByGrade = (grade: number, student: number) => {
  return http.get(`/subject/grade/${grade}/${student}`);
};

const updateSubjectStatus = (sub_status: any, subid: number) => {
  return http.put(`/subject/update/${sub_status}/${subid}`);
};

const create = (data: subjectlist) => {
  return http.post(`/subject`, data);
};

const update = (subid: number, data: subjectlist) => {
  return http.put(`/subject/update/${subid}`, data);
};

const deleteSubject = (subid: number) => {
  return http.delete(`/subject/${subid}`);
};

export default {
  getAllSubject,
  getSubjectByGrade,
  updateSubjectStatus,
  create,
  update,
  deleteSubject,
};

// getAllSubject() {
//     subjectServices.getAllSubject().then(res => {
//         console.log(res.data);
//       this.setState({
//         subjectList : res.data
//       })
//     })
//   }

//    async getAllSubject() {
//     const response = await subjectServices.getAllSubject()
//         this.setState({
//             subjectList : response.data
//         })

//       }
