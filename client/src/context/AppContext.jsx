import axios from "axios";
import { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
import * as ACTIONS from "./actions";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

export const initialState = {
  user: user || null,
  token: token || null,
  allDrivers: null,
  allTrips: null,
  allUsers: null,
  passengerTrips: null,
  currentTrips: null,
  driverCurrentTrip: null,
  singleTrip: null,
  driverTrips: null,
  selectedDirection: "",
  numOfPages: 1,
  page: 1,
  cardStats: null,
  monthlyStats: null,
  searchUser: "",
  searchDriver: "",
  sort: "latest",
  sortOptions: [
    { _id: "latest" },
    { _id: "oldest" },
    { _id: "a-z" },
    { _id: "z-a" },
  ],
  errorMessage: "",
  successMessage: "",
  isLoading: false,
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Instance Setup
  const authFetch = axios.create({
    baseURL: "/api/",
  });

  //request Interceptor
  authFetch.interceptors.request.use(
    (config) => {
      dispatch({ type: ACTIONS.FETCH_START });
      config.headers.Authorization = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      return response;
    },
    (error) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      const err = error.response;
      // console.log(err);

      if (err.status === 401 || err.status === 500) {
        logout();
        dispatch({ type: ACTIONS.INIT_STATE });
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const getUsers = async () => {
    try {
      const { searchUser, sort, page } = state;
      let url = `/users?sort=${sort}&page=${page}`;
      if (searchUser) {
        url = url + `&search=${searchUser}`;
      }
      const res = await authFetch.get(url);
      dispatch({ type: ACTIONS.SET_USERS, payload: { allUsers: res.data } });

      return res.data;
    } catch (error) {
      handleErrorMsg(error?.response?.data?.msg);
    }
  };

  const deleteUsers = async (id) => {
    try {
      const res = await authFetch.delete(`/users/${id}`);

      await getUsers();
      handleMessage(res.data.msg);
    } catch (error) {
      handleErrorMsg(error?.response?.data?.msg);
    }
  };
 
  const getDrivers = async () => {
    try {
      const { searchDriver, sort, page } = state;
      let url = `/drivers?sort=${sort}&page=${page}`;
      if (searchDriver) {
        url = url + `&search=${searchDriver}`;
      }
      const res = await authFetch.get(url);
      dispatch({
        type: ACTIONS.SET_DRIVERS,
        payload: { allDrivers: res.data },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      handleErrorMsg(error?.response?.data?.msg);
    }
  };

  const deleteDrivers = async (id) => {
    try {
      const res = await authFetch.delete(`/drivers/${id}`);

      await getDrivers();
      handleMessage(res.data.msg);
    } catch (error) {
      handleErrorMsg(error?.response?.data?.msg);
    }
  };

  const getTrips = async () => {
    try {
      const { searchDriver, sort, page } = state;
      let url = `/trips?sort=${sort}&page=${page}`;
      if (searchDriver) {
        url = url + `&search=${searchDriver}`;
      }
      const res = await authFetch.get(url);
      dispatch({ type: ACTIONS.SET_TRIPS, payload: { allTrips: res.data } });

      return res.data;
    } catch (error) {
      handleErrorMsg(error?.response?.data?.msg);
    }
  };

  const addDriver = async (payload) => {
    try {
      const res = await authFetch.post(`/drivers/`, payload);

      handleMessage(res.data.msg);
      await getDriverTrips();
      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const getStats = async () => {
    try {
      const { data: cardStats } = await authFetch.get("/stats/");
      const { data: monthlyStats } = await authFetch.get("/stats/monthly");
      dispatch({
        type: ACTIONS.SET_STATS,
        payload: { cardStats, monthlyStats },
      });
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const getUserTrips = async () => {
    try {
      const res = await authFetch.get("/trips/passenger");

      dispatch({
        type: ACTIONS.SET_PASSENGER_TRIPS,
        payload: { passengerTrips: res.data },
      });
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const getSingleTrip = async (_id) => {
    try {
      const res = await authFetch.get(`/trips/${_id}`);

      dispatch({
        type: ACTIONS.SET_SINGLE_TRIP,
        payload: { singleTrip: res.data },
      });
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };
  const getDriverTrips = async (id) => {
    try {
      const res = await authFetch.get(`/trips/driver`);
      const { driverCurrentTrip, ...others } = res.data;
      const { driverTrips } = others;
      dispatch({
        type: ACTIONS.SET_DRIVER_TRIPS,
        payload: {
          driverTrips,
          driverCurrentTrip: driverCurrentTrip,
        },
      });
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const createTrip = async (payload) => {
    try {
      const { departureTime, direction } = payload;
      if (!departureTime || !direction) {
        handleErrorMsg("Please Enter all Fields");
        return;
      }
      const res = await authFetch.post(`/trips/`, payload);

      handleMessage(res.data.msg);
      await getDriverTrips();
      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const findBuses = async (direction) => {
    try {
      if (!direction) {
        handleErrorMsg("Please Select a Direction");

        return;
      }
      const res = await authFetch.get(
        `/trips/current?direction=${direction}&search=${state.searchDriver}`
      );

      dispatch({
        type: ACTIONS.SET_CURRENT_TRIPS,
        payload: { currentTrips: res.data },
      });
      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const bookBus = async (tripId) => {
    try {
      const { firstname, lastname, _id } = state.user;

      const res = await authFetch.patch(`/trips/book/${tripId}`, {
        fullname: `${firstname} ${lastname}`,
        passengerId: _id,
      });

      await getSingleTrip(tripId);

      handleMessage(res.data.msg);

      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const unbookBus = async (tripId) => {
    try {
      const { firstname, lastname, _id } = state.user;

      const res = await authFetch.patch(`/trips/book/${tripId}`, {
        fullname: `${firstname} ${lastname}`,
        passengerId: _id,
        action: "unbook",
      });

      await getSingleTrip(tripId);

      handleMessage(res.data.msg);

      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };
  const updateTripStatus = async (tripId, payload) => {
    try {
      const res = await authFetch.patch(`/trips/${tripId}`, payload);

      await getSingleTrip(tripId);

      handleMessage(res.data.msg);

      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const login = async (data) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const res = await axios.post("/api/auth/login", data);
      const { user, token } = res.data;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user,
          token,
        },
      });

      addUserToLocalStorage({ user, token });
      dispatch({ type: ACTIONS.FETCH_STOP });
      return user;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP });
      handleErrorMsg(error.response.data.msg);
    }
  };
  const register = async (data) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const res = await axios.post("/api/auth/register", data);
      const { user, token } = res.data;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user,
          token,
        },
      });

      addUserToLocalStorage({ user, token });
      dispatch({ type: ACTIONS.FETCH_STOP });
      return user;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP });
      handleErrorMsg(error.response.data.msg);
    }
  };

  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT });
    removeUserFromLocalStorage();
  };

  const getDirection = (direction, setDirection) => {
    if (direction === "back-to-front") {
      setDirection(`Back gate to Front gate`);
    } else if (direction === "front-to-back") {
      setDirection(`Front gate to Back gate`);
    }
  };

  const handleInputChange = (name, value) => {
    dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  };

  const clearMessage = () => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGE });
  };

  const handleMessage = (message) => {
    dispatch({
      type: ACTIONS.SUCCESS_MSG,
      payload: { successMessage: message },
    });
    setInterval(() => {
      clearMessage();
    }, 5000);
  };

  const handleErrorMsg = (message) => {
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: { msg: message },
    });
    setInterval(() => {
      clearMessage();
    }, 5000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getUsers,
        deleteUsers,
        getDrivers,
        deleteDrivers,
        getTrips,
        getStats,
        addDriver,
        getUserTrips,
        getSingleTrip,
        getDriverTrips,
        createTrip,
        findBuses,
        bookBus,
        unbookBus,
        updateTripStatus,
        login,
        register,
        logout,
        clearMessage,
        clearFilters,
        handleInputChange,
        getDirection,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
