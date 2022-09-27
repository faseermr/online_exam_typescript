import React, { Component } from "react";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { classlist } from "../../model";

interface CProps {
  handleDelete: (id: any) => void;
  handleUpdate: (e: React.FormEvent, data: classlist) => void;
  classList: classlist[];
}

class ClassroomList extends Component<CProps, {}> {
  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th className="id">ID</th>
              <th>Grade</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.classList.map((val, idx) => {
              return (
                <tr key={idx}>
                  <td>{val.clsid}</td>
                  <td>{val.grade}</td>
                  <td>
                    <button
                      onClick={(e) =>
                        this.props.handleUpdate.bind(this)(e, val)
                      }
                    >
                      <RiEdit2Line />
                    </button>
                    <button onClick={() => this.props.handleDelete(val.clsid!)}>
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ClassroomList;
