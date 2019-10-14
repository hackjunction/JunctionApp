import { createSelector } from 'reselect';
import { Skills, Roles } from '@hackjunction/shared';

export const searchResults = state => state.recruitment.searchResults.data;

export const searchResultsMapped = createSelector(
    searchResults,
    searchResults => {
        return searchResults.map(item => {
            // Skills: generate 1-5 random skills, and a level from 1-5 for each
            item.skills = [
                {
                    skill: 'Javascript', //shared/constants/skills.js
                    level: 5 //1-5
                }
            ];

            // Roles: generate 1-5 random roles, and a 'years' value from 1-5 for each
            item.roles = [
                {
                    role: 'Fullstack Developer', //shared/constants/roles.js
                    years: 3 //1-5
                }
            ];

            return item;
        });
    }
);

export const searchResultsLoading = state => state.recruitment.searchResults.loading;
export const searchResultsError = state => state.recruitment.searchResults.error;
export const searchResultsUpdated = state => state.recruitment.searchResults.updated;
