/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventDetail: null,
  createEvent: {
    title: '',
    description: '',
    maxParticipants: 2,
    open: true,
    skill: 'novice',
    allowInvitations: null,
    allowReplacementsType: null,
    externalLink: null,
    when: null,
    costPerParticipant: null,
    visibility: null,
    distance: null,
    allowedGender: false,
    allowedParticipants: false,
    duration: null,
    activity: 'type_one',
  },
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEventDetail(state, action) {
      state.eventDetail = action.payload.event;
    },
    changeVisibility(state, action) {
      state.eventDetail.visibility = action.payload.visibility;
    },
    changeSkill(state, action) {
      state.eventDetail.skill = action.payload.skill;
    },
    changeGender(state, action) {
      state.eventDetail.allowedGender = action.payload.gender;
    },
    changeInvitations(state, action) {
      state.eventDetail.allowInvitations = action.payload.allowInvitations;
    },
    changeParticipation(state, action) {
      state.eventDetail.allowedParticipants =
        action.payload.allowedParticipants;
    },
    changeActivity(state, action) {
      state.eventDetail.activity = action.payload.activity;
    },
    changeMaxParticipants(state, action) {
      state.eventDetail.maxParticipants = action.payload.maxParticipants;
    },
    changeEventOpeness(state, action) {
      state.eventDetail.open = action.payload.open;
    },
    addTitleAndDescription(state, action) {
      state.createEvent.title = action.payload.title;
      state.createEvent.description = action.payload.description;
      state.createEvent.externalLink = action.payload.externalLink;
    },
    // setupTheEventCreation
    setupEventCreation(state, action) {
      state.createEvent.visibility = action.payload.visibility;
      state.createEvent.allowInvitations = action.payload.allowInvitations;
      state.createEvent.activity = action.payload.activity;
      state.createEvent.allowReplacementsType =
        action.payload.allowReplacementsType;
      state.createEvent.allowedGender = action.payload.allowedGender;
      state.createEvent.allowedParticipants =
        action.payload.allowedParticipants;
      state.createEvent.maxParticipants = action.payload.maxParticipants;
      state.createEvent.skill = action.payload.skill;
    },
    // options
    createEventVisibility(state, action) {
      state.createEvent.visibility = action.payload.visibility;
    },
    createEventActivity(state, action) {
      state.createEvent.activity = action.payload.activity;
      state.createEvent.maxParticipants = action.payload.maxParticipants;
    },
    createEventMaxParticipants(state, action) {
      state.createEvent.maxParticipants = action.payload.maxParticipants;
    },
    createEventReplacements(state, action) {
      state.createEvent.allowReplacementsType =
        action.payload.allowReplacementsType;
    },
    createEventParticipation(state, action) {
      state.createEvent.allowedParticipants =
        action.payload.allowedParticipants;
    },
    createEventInvitations(state, action) {
      state.createEvent.allowInvitations = action.payload.allowInvitations;
    },
    createEventSkill(state, action) {
      state.createEvent.skill = action.payload.skill;
    },
    createEventGender(state, action) {
      state.createEvent.allowedGender = action.payload.allowedGender;
    },
    resetState(state, action) {
      state.createEvent = initialState.createEvent;
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice.reducer;
