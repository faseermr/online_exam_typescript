import {
  Get_All_Class,
  Create_Class,
  Update_Class,
  Delete_Class,
} from "../action/actionType";
//import {classlist} from '../../model/index'
const initialState = {
  classList: [],
};

export const classReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Get_All_Class:
      return {
        ...state,
        classList: action.payload.data,
      };

    case Create_Class:
      return {
        ...state,
        //...action.payload
      };

    case Update_Class:
      return {
        ...state,
      };

    case Delete_Class:
      // console.log(action.payload,state);
      return {
        ...state,
        classList: state.classList.filter(
          (cls: any) => cls.clsid !== action.payload
        ),
      };

    default:
      return state;
  }
};
