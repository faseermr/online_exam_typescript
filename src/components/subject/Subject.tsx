import React, { Component, ComponentState } from "react";
import classServices from "../../service/classServices";
import subjectServices from "../../service/subjectServices";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import {
  addSubjectAction,
  getAllSubjectAction,
  updateSubjectAction,
  deleteSubjectAction,
} from "../../redux/action/subjectAction";
import { getAllClassAction } from "../../redux/action/classAction";
import { connect } from "react-redux";
import { classlist, subjectlist } from "../../model/index";

interface DispatchProps {
  getAllSubject: () => void;
  addSubject: (data: any) => Promise<void>;
  updateSubject: (id: any, data: any) => Promise<void>;
  deleteSubject: (id: any) => void;
  getAllClass: () => void;
  state: any;
}

type MyProps = {};
type MyState = {
  classList: classlist[];
  subjectList: subjectlist[];
  editData: subjectlist | null;
  grade: number;
  subject: string;
  clsid?: number;
  isEdit: boolean;
  //gradeError: string;
};

class Subject extends Component<DispatchProps, MyState> {
  constructor(props: DispatchProps) {
    super(props);
    this.state = {
      classList: [],
      editData: null,
      subjectList: [],
      grade: 0,
      subject: "",
      isEdit: false,
    };
  }
  handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target as typeof event.target;
    this.setState({
      [name]: value,
    } as ComponentState);
  }

  handleSubmit(data: React.FormEvent) {
    data.preventDefault();
    let grade = this.state.grade;
    let subject = this.state.subject;
    if (this.state.isEdit) {
      this.props
        .updateSubject(this.state.editData!.subid, {
          subject: subject,
          clsid: grade,
        })
        .then((res: any) => {
          if (res.message) {
            alert(res.message);
            this.props.getAllSubject();
            this.setState({
              subject: "",
              grade: 0,
              isEdit: false,
            });
          }
        });
    } else {
      this.props
        .addSubject({
          subject: subject,
          clsid: grade,
        })
        .then((res: any) => {
          //console.log(res.subject.error);
          if (res.message) {
            alert(res.message);
            this.props.getAllSubject();
            this.setState({
              grade: 0,
              subject: "",
            });
          }
        });
    }
  }

  handleUpdate = (data: subjectlist) => {
    this.setState({
      editData: data,
      subject: data.name,
      grade: data.clsid,
      isEdit: true,
    });
  };

  handleDelete = async (id: number) => {
    let option = window.confirm("Are you want to delete");
    if (option) {
      const response = await subjectServices.deleteSubject(id);
      console.log(response.data);
      if (response.data.message) {
        alert(response.data.message);
        // this.getAllSubject();
      }
    }
  };

  // getAllClass() {
  //   classServices.getAllClass().then((res) => {
  //     this.setState({
  //       classList: res.data.data,
  //     });
  //   });
  // }

  // getAllSubject() {
  //   subjectServices.getAllSubject().then((res) => {
  //     this.setState({
  //       subjectList: res.data,
  //     });
  //   });
  // }

  componentDidMount() {
    this.props.getAllClass();
    // this.getAllSubject();
    this.props.getAllSubject();
  }

  render() {
    //console.log(this.props.state);
    let { subjectList } = this.props.state.subjectData;
    let { classList } = this.props.state.classData;
    return (
      <React.Fragment>
        <div className="container">
          <div className="card p-4 m-4">
            <form autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group mt-2">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Maths"
                  onChange={this.handleChange.bind(this)}
                  name="subject"
                  value={this.state.subject}
                />
              </div>

              <div className="form-group mt-4">
                <label>Grade:</label>
                <select
                  className="form-select"
                  name="grade"
                  value={this.state.grade}
                  onChange={this.handleChange.bind(this)}
                >
                  <option selected disabled>
                    -- Select One --
                  </option>
                  {classList &&
                    classList.map((val: any, idx: number) => {
                      return (
                        <React.Fragment key={idx}>
                          <option value={val.clsid}>{val.grade}</option>
                        </React.Fragment>
                      );
                    })}
                </select>
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                {this.state.isEdit ? "Update" : "Submit"}
              </button>
            </form>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th className="id">ID</th>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th className="action">Action</th>
                </tr>
              </thead>

              <tbody>
                {subjectList.map((val: any, idx: number) => {
                  return (
                    <tr key={idx}>
                      <td>{val.subid}</td>
                      <td>{val.name}</td>
                      <td>{val.grade}</td>
                      <td>
                        <button onClick={() => this.handleUpdate(val)}>
                          <RiEdit2Line />
                        </button>
                        <button
                          onClick={() => this.props.deleteSubject(val.subid)}
                        >
                          <RiDeleteBinLine />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: MyState) => {
  return { state };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllSubject: () => dispatch(getAllSubjectAction()),
    addSubject: (data: any) => dispatch(addSubjectAction(data)),
    updateSubject: (id: any, data: any) =>
      dispatch(updateSubjectAction(id, data)),
    deleteSubject: (id: any) => dispatch(deleteSubjectAction(id)),
    getAllClass: () => dispatch(getAllClassAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subject);
