export const API_URL = `${process.env.APP_URL}/api`

export const getAuthUrl = (str: string) => `/auth${str}`
export const getUsersUrl = (str: string) => `/users${str}`
export const getMoviesUrl = (str: string) => `/movies${str}`
export const getGenresUrl = (str: string) => `/genres${str}`
export const getActorsUrl = (str: string) => `/actors${str}`
export const getRatinsUrl = (str: string) => `/ratings${str}`
