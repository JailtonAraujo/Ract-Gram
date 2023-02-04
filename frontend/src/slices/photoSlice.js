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
export const updatePhoto = createAsyncThunk(
    "photo/update",
    async(photo, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token;

        //console.log(photo)

        const data = await photoService.updatePhoto({title:photo.title},  photo.id ,token);

        if(data.error){
            return thunkApi.rejectWithValue(data.erros[0])
        }

        return data;
    }
)

//get photo by ID
export const getPhotoById = createAsyncThunk(
    "photo/id",
    async(id, thunkApi)=>{
        const token = thunkApi.getState().auth.user.token;

        const data = await photoService.getPhotoById(id,token);

        return data;
    }
)

//Like a photo
export const likePhoto = createAsyncThunk(
    "photo/like",
    async(id, thunkApi)=>{

        const token = thunkApi.getState().auth.user.token;

        const data = await photoService.photoLike(id,token);

        if(data.errors){
            return thunkApi.rejectWithValue(data.errors[0]);
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
        },
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

        .addCase(updatePhoto.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase(updatePhoto.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.message = "Photo atualizada com sucesso!"
            state.photos.map((photo)=>{
                if(photo._id === action.payload.photo._id){
                    return (photo.title = action.payload.photo.title)
                }
                return photo;
            })
        }).addCase(updatePhoto.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
            state.message = null;
        })

        .addCase(getPhotoById.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase(getPhotoById.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.photo = action.payload
        })

        
        .addCase(likePhoto.pending,(state)=>{
            state.loading = true;
            state.error = false;
        }).addCase(likePhoto.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;

            if(state.photo.likes){
                state.photo.likes.push(action.payload.userId)
            }

            state.photos.map((photo)=>{
                if(photo._id === action.payload.photoId){
                    return photo.likes.push(action.payload.userId);
                }
                return photo;
            })

            state.message = action.payload.message
        }).addCase(likePhoto.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;

        })
    }
    
})

export const {resetMessage} = photoSlice.actions;
export default photoSlice.reducer;