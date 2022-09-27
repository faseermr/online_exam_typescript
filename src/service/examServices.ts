import http from "../http.common";

// post question
const createQuestion = (data: any) => {
  return http.post(`/question`, data);
};

// get all question
const getAllQuestion = () => {
  return http.get(`/question`);
};
// get student answers
const getStudentAnswer = (student: any) => {
  return http.get(`/answer/${student}`);
};

const answerQuestion = (data: any) => {
  return http.post(`/answer`, data);
};

const answerByStudent = (student: any) => {
  return http.get(`/answer/student/${student}`);
};

// get question by subject and student
const getQuestionBySubjectAndStudent = (subject: any, student: any) => {
  return http.get(`/question/${subject}/${student}`);
};

// get question by subject
const getQuestionBySubject = (subject: any) => {
  return http.get(`/question/subject/${subject}`);
};

const submitAnswer = (data: any) => {
  return http.post(`/answer/submit`, data);
};

const getQuestionById = (qid: any) => {
  return http.get(`/question/quiz/${qid}`);
};

const updateQuiz = (qid: any, data: any) => {
  return http.put(`/question/quiz/update/${qid}`, data);
};

const deleteQuiz = (qid: any) => {
  return http.delete(`/question/quiz/delete/${qid}`);
};

export default {
  createQuestion,
  getAllQuestion,
  getStudentAnswer,
  answerQuestion,
  answerByStudent,
  getQuestionBySubjectAndStudent,
  submitAnswer,
  getQuestionBySubject,
  getQuestionById,
  updateQuiz,
  deleteQuiz,
};
