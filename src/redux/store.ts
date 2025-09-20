import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { slices } from './slices'
import { apis } from './api'

// Build rootReducer by combining slices and API reducers
const rootReducer = combineReducers({
  ...slices,
  ...apis.reduce((acc, api) => {
    acc[api.reducerPath] = api.reducer
    return acc
  }, {} as Record<string, typeof apis[number]['reducer']>),
})

// RootState type
export type RootState = ReturnType<typeof rootReducer>

// Factory store function
export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apis.map((api) => api.middleware)),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
  })
}

// Singleton store
export const store = makeStore()
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

// Typed hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
