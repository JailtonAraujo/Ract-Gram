import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos:[],
    photo:[],
    error: false,
    success: true,
    loading: false,
    message: null
}

//publish user photo
export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async(photo, thunkApi)=>{
        
        const token = thunkApi.getState().auth.user.token

        const data = await photoService.publishPhoto(photo,token);

        if(data.errors){
            return thunkApi.rejectWithValue(data.errors[0])
        }

        return data;
    }
)

// Get all user photos

export const getUserPhotos = createAsyncThunk(
    "photos/get",
    async(id, thunkApi)=>{

        const token = thunkApi.getState().auth.user.token;

        const data = await photoService.getUserPhotos(id, token);

        return data;
    }
)

// delete a photo
export const  deletePhoto = createAsyncThunk (
    "photo/delete",
    async(id, thunkApi)=>{

        const token = thunkApi.getState().auth.user.token;

        const data = await photoService.deletePhoto(id,token);

        if(data.errors){
            return thunkApi.rejectWithValue(data.errors[0])
        }

        return data;

    }
)

// update a photo
const updatePhoto = createAsyncThunk(
    "photo/update",
    async(id, photo, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token;

        const data = photoService.updatePhoto(id, photo, token);

        if(data.error){
            return thunkApi.rejectWithValue(data.erros[0])
        }

        return data;
    }
)

export const photoSlice = createSlice({
    name:"photo",
    initialState,

    reducers:{
        resetMessage : (state)=>{
            state.message = null;
        }
    },

    extraReducers: (builder)=>{
        builder
        .addCase(publishPhoto.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase(publishPhoto.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload.newPhoto;
            state.photos.unshift(state.photo);
            state.message = "Photo publicado com sucesso!"
        }).addCase(publishPhoto.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
        })

        .addCase(getUserPhotos.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase(getUserPhotos.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = action.payload.photos;
        })

        .addCase(deletePhoto.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase(deletePhoto.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photos = state.photos.filter((photo) => {
                return photo._id !== action.payload.id
            })
            state.message = "Photo deletada com sucesso!"
        }).addCase(deletePhoto.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
        })
    }
    
})

export const {resetMessage} = photoSlice.actions;
export default photoSlice.reducer;