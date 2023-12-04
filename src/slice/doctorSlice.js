import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import doctorService from "../services/doctorService";

const initialState = {
  doctors: [],
  doctor: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

//slice get
export const getDoctors = createAsyncThunk("doctor/get-all", async () => {
  const data = await doctorService.getAllDoctors();
  return data;
});

export const createDoctor = createAsyncThunk(
  "doctor/create",
  async (doctor, thunkAPI) => {
    const data = await doctorService.createDoctor(doctor);

    if (data.error) {
      return thunkAPI.rejectWithValue();
    }

    return data;
  }
);

export const deleteDoctor = createAsyncThunk(
  "doctor/delete",
  async (id, thunkAPI) => {
    const data = await doctorService.deleteDoctor(id);

    // if (data.erro) {
    //   return thunkAPI.rejectWithValue(data.erro);
    // }
    return data;
  }
);

export const updateDoctor = createAsyncThunk(
  "doctor/update",
  async (data, thunkAPI) => {
    const { id, doctor } = data; // Destructure os valores do objeto data

    console.log(doctor);

    const response = await doctorService.updateSolictacao(id, doctor);

    // if (response.error) {
    //   return thunkAPI.rejectWithValue(response.error);
    // }

    return response;
  }
);

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.doctors = action.payload;
      })

      .addCase(createDoctor.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.doctor = action.payload;
        //adicionando no primeiro lugar do array
        state.doctors.unshift(state.doctor);
        state.message = "!!";
      })
      .addCase(createDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.doctor = {};
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.doctors = state.doctors.filter((doctor) => {
          //console.log(action.payload);
          return doctor.id !== action.payload.id;
        });
        state.message = "Doctor !";
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.doctor = {};
      })
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.doctors = state.doctors.map((sol) => {
          //tem que testar

          if (sol.id === action.payload.id) {
            return (sol = action.payload);
          }
          return sol;
        });
        state.message = " sucesso!";
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.doctor = {};
      });
  },
});

export const { resetMessage } = doctorSlice.actions;
export default doctorSlice.reducer;
