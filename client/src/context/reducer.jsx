import * as ACTIONS from "./actions";
import { initialState } from "./AppContext";

export default function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        errorMessage: action.payload.msg,
      };
    case ACTIONS.SUCCESS_MSG:
      return {
        ...state,
        successMessage: action.payload.successMessage,
      };
    case ACTIONS.FETCH_START:
      return {
        ...state,
        isLoading: true,
      };
    case ACTIONS.FETCH_STOP:
      return {
        ...state,
        isLoading: false,
      };
    case ACTIONS.INIT_STATE:
      return {
        ...initialState,
      };

    case ACTIONS.SEARCH_DEFAULTS:
      return {
        ...state,
        searchRegNum: "all",
        search: "",
        searchEntryYear: "all",
      };
    case ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
        successMessage: null,
      };
    case ACTIONS.CLEAR_FILTERS:
      return {
        ...state,
        search: "",
        searchEntryYear: "all",
        searchDepartment: "all",
        sort: "latest",
      };

    case ACTIONS.SET_STATS:
      return {
        ...state,
        cardStats: action.payload.cardStats,
        monthlyStats: action.payload.monthlyStats,
      };
    case ACTIONS.HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case ACTIONS.SET_USERS:
      return {
        ...state,
        allUsers: action.payload.allUsers,
      };
    case ACTIONS.SET_DRIVERS:
      return {
        ...state,
        allDrivers: action.payload.allDrivers,
      };
    case ACTIONS.SET_TRIPS:
      return {
        ...state,
        allTrips: action.payload.allTrips,
      };
    case ACTIONS.SET_PASSENGER_TRIPS:
      return {
        ...state,
        passengerTrips: action.payload.passengerTrips,
      };

    case ACTIONS.SET_CURRENT_TRIPS:
      return {
        ...state,
        currentTrips: action.payload.currentTrips,
      };
    case ACTIONS.SET_SINGLE_TRIP:
      return {
        ...state,
        singleTrip: action.payload.singleTrip,
      };
    case ACTIONS.SET_DRIVER_TRIPS:
      return {
        ...state,
        driverTrips: action.payload.driverTrips,
        driverCurrentTrip: action.payload.driverCurrentTrip,
      };

    default:
      return state;
  }
}
