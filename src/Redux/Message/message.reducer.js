import {
  CREATE_CHAT_SUCCESS,
  CREATE_GET_ALL_SUCCESS,
  CREATE_MESSAGE_SUCCESS,
} from "./message.actionType";

const initialState = {
  messages: [],
  chats: [],
  loading: false,
  error: null,
  message: null,
};

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        messages: [...state.messages, action.payload],
      };

    case CREATE_CHAT_SUCCESS:
      return { ...state, chats: [action.payload, ...state.chats] };

    case CREATE_GET_ALL_SUCCESS:
      return { ...state, chats: action.payload };

    default:
      return state;
  }
};
