import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileImageSection: true,
  personalInformationSection: false,
  changePasswordSection: false,
}

const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    showProfileImageSection: (state) => {
      state.profileImageSection = true;
      state.personalInformationSection = false;
      state.changePasswordSection = false;
    },
    showPersonalInformationSection: (state) => {
      state.personalInformationSection = true;
      state.profileImageSection = false;
      state.changePasswordSection = false;
    },
    showChangePasswordSection: (state) => {
      state.changePasswordSection = true;
      state.profileImageSection = false;
      state.personalInformationSection = false;
    }
  }
});

export const {
  showProfileImageSection,
  showPersonalInformationSection,
  showChangePasswordSection,
} = editProfileSlice.actions;

export const editProfileState = (state) => state.editProfile;

export default editProfileSlice.reducer;