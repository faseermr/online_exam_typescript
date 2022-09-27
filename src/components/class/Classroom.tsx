import React, { Component, ComponentState } from "react";
import classServices from "../../service/classServices";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { classlist } from "../../model/index";
import ClassroomList from "./ClassroomList";
type MyProps = {};
type MyState = {
  classList: classlist[];
  editData: classlist | null;
  grade: string;
  clsid?: number;
  isEdit: boolean;
  gradeError: string;
  // like this
};

class Classroom extends Component<{}, MyState> {
  constructor({}) {
    super({});
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      classList: [],
      editData: null,
      grade: "",
      clsid: 0,
      isEdit: false,
      gradeError: "",
    };
  }

  handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void {
    // const { name, value } = e.target as typeof e.target;

    this.setState({ [e.target.name]: e.target.value } as ComponentState);
  }

  getAllClass() {
    classServices.getAllClass().then((res: any) => {
      this.setState({
        classList: res.data.data,
      });
    });
  }

  handleUpdate(e: React.FormEvent, data: classlist) {
    this.setState({
      editData: data,
      grade: data.grade,
      clsid: data.clsid,
      isEdit: true,
    });
  }

  handleDelete(grade: number) {
    let option = window.confirm("Are you want to delete");

    if (option) {
      classServices.deleteClass(grade).then((res: any) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert(res.data.message);
          this.getAllClass();
        }
      });
    }
  }

  validate() {
    let gradeError = "";

    if (!this.state.grade) {
      gradeError = "required";
    }

    if (gradeError) {
      this.setState({ gradeError });
      return false;
    }
    return true;
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (this.validate()) {
      let grade = this.state.grade;
      if (this.state.isEdit) {
        let clsid = this.state.editData!.clsid;
        classServices
          .updateClass(clsid!, {
            grade: grade,
          })
          .then((res) => {
            if (res.data.error) {
              alert(res.data.error);
            } else {
              alert(res.data.message);
              this.getAllClass();
              this.setState({
                grade: "",
                clsid: 0,
              });
            }
          });
      } else {
        classServices
          .create({
            grade: grade,
          })
          .then((res) => {
            if (res.data.error) {
              alert(res.data.error);
            } else {
              alert(res.data.message);
              this.getAllClass();
              this.setState({
                grade: "",
              });
            }
          });
      }
    }
  }

  componentDidMount() {
    this.getAllClass();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="card m-4 p-4">
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <div className="form-group mt-2">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Grade 11"
                  onChange={this.handleChange.bind(this)}
                  name="grade"
                  value={this.state.grade}
                />
                <div className="text-danger">{this.state.gradeError}</div>
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                {this.state.isEdit ? "Update" : "Submit"}
              </button>
            </form>
          </div>
          <div>
            <ClassroomList
              handleDelete={this.handleDelete}
              handleUpdate={this.handleUpdate}
              classList={this.state.classList}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Classroom;
