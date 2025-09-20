import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { slices } from './slices'
import middleware from '@/middleware'
import { apis } from './api'
import ReduxProvider from '@/redux/provider'
// RootState type

// RootState type
export type RootState = ReturnType<typeof rootReducer>

// Build rootReducer by combining slices and API reducers
const rootReducer = combineReducers({
  ...slices,
  ...apis.reduce((acc, api) => {
    acc[api.reducerPath] = api.reducer
    return acc
  }, {} as Record<string, typeof apis[number]['reducer']>),
})

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

// Types for dispatch & state
export type AppDispatch = typeof store.dispatch

export default ReduxProvider