import React, { useState, useEffect, useContext } from "react";
import examServices from "../../service/examServices";
import { UserContext } from "../../context/userContext";
//import { Checkmark } from "react-checkmark";
import { AiFillCloseCircle } from "react-icons/ai";
import "./style.css";
import { useParams } from "react-router-dom";

const ReviewPaper = () => {
  const { user, admin } = useContext(UserContext);
  const [question, setQuestion] = useState([]);
  const [questionNo, setQuestionNo] = useState<number>(1);
  //const { student } = props.match.params;
  //const { student } = useParams()

  const getStudentAnswer = async () => {
    const res = await examServices.getStudentAnswer(user![0].stuid);
    console.log(res.data);
    setQuestion(res.data);
  };

  useEffect(() => {
    getStudentAnswer();
  }, [user]);

  return (
    <React.Fragment>
      <div className="reviewcontainer">
        <div>QuestionPaper</div>

        {question.map((val: any, idx) => {
          return (
            <div className="reviewcard" key={idx}>
              <>
                <p className="quiz">
                  Q{idx + 1}) {val.qfield}
                </p>
                <span>
                  <input
                    type="radio"
                    name={val.qfield}
                    value={val.ans1}
                    checked={val.ans1 == val.ans}
                  />
                  <label className="labelMargin">{val.ans1}</label>
                  <br />
                  <input
                    type="radio"
                    name={val.qfield}
                    value={val.ans2}
                    checked={val.ans2 == val.ans}
                  />
                  <label className="labelMargin">{val.ans2}</label>
                  <br />
                  <input
                    type="radio"
                    name={val.qfield}
                    value={val.ans3}
                    checked={val.ans3 == val.ans}
                  />
                  <label className="labelMargin">{val.ans3}</label>
                  <br />
                  <input
                    type="radio"
                    name={val.qfield}
                    value={val.ans4}
                    checked={val.ans4 == val.ans}
                  />
                  <label className="labelMargin">{val.ans4}</label>
                </span>
                <span className="check">
                  {val.ans == val.correct_ans ? (
                    // <Checkmark size={"96"} />
                    <div
                      style={{
                        background: "green",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        padding: "20px",
                      }}
                    >
                      Correct
                    </div>
                  ) : (
                    <AiFillCloseCircle size={"106"} color={"red"} />
                  )}
                </span>
              </>
              {/* <button className='' onClick={()=>prevBtn(val.qid)} disabled={indexFirst == 0}>Previous</button>
                        <button className='' onClick={()=>nextBtn(val.qid)} disabled={lastIndex == question.length + 1}>Next</button> */}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ReviewPaper;
