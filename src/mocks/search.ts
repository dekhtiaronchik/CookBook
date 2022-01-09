import { SearchState } from 'store/search/types'

export const clearSearchForm: SearchState = {
  title: '',
  author: '',
  typeOfMeal: '',
  cuisine: '',
  kindOfFood: '',
  chips: [],
  time: 0,
  rating: 0,
}