import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (pokemon) => {
    setFavorites(prev => {
      if (prev.find(p => p.id === pokemon.id)) return prev
      return [...prev, pokemon]
    })
  }

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(p => p.id !== id))
  }

  const isFavorite = (id) => favorites.some(p => p.id === id)

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('Error inesperado')
  return ctx
}
