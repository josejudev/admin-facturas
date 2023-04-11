import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {fetchClients} from '../clients/clientSlice';

export const offerSlice = createSlice({
    name: 'offers',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        getOfferRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getOfferSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        getOfferError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
        ,
        addOfferRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addOfferSuccess: (state, action) => {
            state.loading = false;
            state.data.push(action.payload);
        },
        addOfferError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOfferRequest:(state) => {
            state.loading = true;
            state.error = null;
        },
        deleteOfferSuccess:(state, action) => {
            state.loading = false;
            state.data = state.data.filter((offer) => offer.id !== action.payload)
        },
        deleteOfferError:(state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.data = state.data.filter((offer) => offer.id !== action.payload)
        },
        updateOfferRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateOfferSuccess: (state, action) => {
            state.loading = false;
            state.data = state.data.map((offer) =>
                offer.id === action.payload.id ? action.payload : offer
            );
        },
        updateOfferError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getofferByIdRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getofferByIdSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        getofferByIdError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
        


    }
});

export const {
    getOfferRequest,
    getOfferSuccess,
    getOfferError,
    addOfferRequest,
    addOfferSuccess,
    addOfferError,
    deleteOfferRequest,
    deleteOfferSuccess,
    deleteOfferError,
    updateOfferRequest,
    updateOfferSuccess,
    updateOfferError,
    getofferByIdRequest,
    getofferByIdSuccess,
    getofferByIdError

} = offerSlice.actions;


export const fetchOffers = () => {
    return async (dispatch) => {
        dispatch(getOfferRequest());
        try {
            const response = await axios.get('api/offers');
            dispatch(getOfferSuccess(response.data));
        } catch (error) {
            dispatch(getOfferError(error.message));
        }
    }
}

export const addOffer = (offer) => {
    return async (dispatch) => {
      try {
        dispatch(addOfferRequest());
        const { project_name, fileName, final_client, activity_resumen, client_id } = offer;
        const currentDate = new Date();
  
        // Extract year, month, and day from the current date
        const year = currentDate.getFullYear();
        const day = currentDate.getDate();
        const monthWithZero = (currentDate.getMonth() + 1).toLocaleString('en-US', { minimumIntegerDigits: 2 });

        const allDay = day + "" + monthWithZero + "" + year;
        
  
        // Extract the uploaded file object
        const file = fileName[0];
        // Modify the file name as needed

        const union =allDay +"-"+ offer.project_name.substring(0, 2) + "-" + offer.final_client.substring(0, 2) + "-" + offer.activity_resumen.substring(0, 2)+".jpg"

        // Create a new FormData object
        const formData = new FormData();
        formData.append('project_name', project_name);
        formData.append('fileName', new File([file], union, { type: file.type }));
        formData.append('final_client', final_client);
        formData.append('activity_resumen', activity_resumen);
        formData.append('client_id', client_id)
  
        const response = await axios.post('api/offers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        dispatch(addOfferSuccess(response.data));
        dispatch(fetchOffers());
      } catch (error) {
        dispatch(addOfferError(error.message));
      }
    }
  }


  export const deleteOffer = (id) =>{
    return async (dispatch) =>{
        try {
            dispatch(deleteOfferRequest());
            await axios.delete(`/api/offers/${id}`);
            dispatch(deleteOfferSuccess(id));
        }catch (error) {
            dispatch(deleteOfferError(error.message));
        }
    }
  }

  export const updateOffer = (offer, id) =>{
    return async (dispatch) =>{
        try{
            dispatch(updateOfferRequest())
            const response = await axios.put(`/api/offers/${id}`, offer);
            dispatch(updateOfferSuccess(response.data));
            dispatch(fetchOffers());

        }catch (error){
            dispatch(updateOfferError(error.message))
            console.log(error.message)
        }
    }
  }

  export const fetchOfferById = (id) => {
    return async (dispatch) => {
        try {
            dispatch(getofferByIdRequest());
            const response = await axios.get(`/api/offers/${id}`);
            dispatch(getofferByIdSuccess(response.data));
        } catch (error) {
            dispatch(getofferByIdError(error.message));
            console.log(error.message+ "-------------------")
        }
    }
  }



export default offerSlice.reducer;