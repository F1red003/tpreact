# User Directory Application

Cette application React affiche un annuaire d'utilisateurs avec les fonctionnalités suivantes :

## Fonctionnalités

### Page d'annuaire (/)

- Affichage de tous les utilisateurs dans un tableau
- Recherche par nom d'utilisateur
- Suppression d'un utilisateur
- Clic sur le nom pour accéder au détail

### Page de détail (/user/:id)

- Affichage des détails complets d'un utilisateur
- Lien de retour vers la liste

## Technologies utilisées

- React (avec Hooks: useState, useEffect)
- React Router DOM pour la navigation
- Fetch API pour les appels REST
- JSONPlaceholder API

## Structure du projet

```
src/
├── App.js                      # Configuration du routage
├── components/
│   ├── UserDirectory.js        # Page de l'annuaire
│   └── UserDetail.js           # Page de détail
└── index.js                    # Point d'entrée
```

## Composants

### UserDirectory

- **Hooks utilisés**: useState, useEffect
- **États**: users, filteredUsers, searchTerm, loading, error
- **Fonctions**: fetchUsers, filterUsers, handleDelete, handleSearchChange

### UserDetail

- **Hooks utilisés**: useState, useEffect, useParams
- **États**: user, loading, error
- **Fonctions**: fetchUserDetail

## API

- Liste des utilisateurs: `https://jsonplaceholder.typicode.com/users`
- Détail d'un utilisateur: `https://jsonplaceholder.typicode.com/users/{id}`

## Lancer l'application

```bash
npm start
```

L'application s'ouvrira automatiquement sur http://localhost:3000
