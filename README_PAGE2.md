# Page 2 - Annuaire d'Utilisateurs (Composant de Classe)

## Description

Page 2 est une implémentation alternative de l'annuaire d'utilisateurs utilisant des **composants de classe** au lieu des hooks React.

## Composants Créés

### UserDirectoryClass (Composant de Classe)

**Fichier**: `src/components/UserDirectoryClass.js`

#### Lifecycle Methods utilisés:

- **constructor()** - Initialise le state
- **componentDidMount()** - Appelle l'API au montage du composant
- **componentDidUpdate()** - Filtre les utilisateurs quand le searchTerm ou users change

#### State:

```javascript
{
  users: [],
  filteredUsers: [],
  searchTerm: '',
  loading: true,
  error: null
}
```

#### Méthodes:

- `fetchUsers()` - Récupère les utilisateurs depuis l'API
- `filterUsers()` - Filtre les utilisateurs selon le terme de recherche
- `handleDelete()` - Supprime un utilisateur
- `handleSearchChange()` - Gère les changements dans le champ de recherche

### UserDetailClass (Composant de Classe)

**Fichier**: `src/components/UserDetailClass.js`

#### Lifecycle Methods utilisés:

- **constructor()** - Initialise le state
- **componentDidMount()** - Appelle l'API au montage
- **componentDidUpdate()** - Re-fetch si l'userId change

#### State:

```javascript
{
  user: null,
  loading: true,
  error: null
}
```

#### Méthodes:

- `fetchUserDetail()` - Récupère les détails d'un utilisateur spécifique

### UserDetailClassWrapper

**Fichier**: `src/components/UserDetailClassWrapper.js`

Composant fonctionnel simple qui utilise `useParams` de React Router et passe l'ID au composant de classe.

## Routes

| Route             | Composant              | Description                   |
| ----------------- | ---------------------- | ----------------------------- |
| `/`               | UserDirectory          | Page 1 (avec Hooks)           |
| `/user/:id`       | UserDetail             | Détail utilisateur Page 1     |
| `/page2`          | UserDirectoryClass     | **Page 2 (avec Classes)**     |
| `/user-class/:id` | UserDetailClassWrapper | **Détail utilisateur Page 2** |

## Navigation

- **Page 1 → Page 2**: Cliquez sur "Aller à Page 2 (avec Classes)"
- **Page 2 → Page 1**: Cliquez sur "Aller à Page 1 (avec Hooks)"
- **Liste → Détail**: Cliquez sur le nom d'un utilisateur
- **Détail → Liste**: Cliquez sur "← Retour à la liste"

## API Utilisée

- **Liste**: `https://jsonplaceholder.typicode.com/users`
- **Détail**: `https://jsonplaceholder.typicode.com/users/{id}`

## Différences: Hooks vs Classes

| Aspect            | Page 1 (Hooks)                 | Page 2 (Classes)                              |
| ----------------- | ------------------------------ | --------------------------------------------- |
| Déclaration       | `function UserDirectory()`     | `class UserDirectoryClass extends Component`  |
| State             | `useState()`                   | `this.state = {}`                             |
| Mise à jour State | `setUsers(data)`               | `this.setState({ users: data })`              |
| Effets de bord    | `useEffect()`, `useCallback()` | `componentDidMount()`, `componentDidUpdate()` |
| Accès au State    | `users`                        | `this.state.users`                            |
| Méthodes          | Fonctions                      | `methodName = () => {}`                       |

## Accéder à la Page 2

1. Ouvrez l'application: http://localhost:3000
2. Cliquez sur "Aller à Page 2 (avec Classes)"
3. Ou allez directement à: http://localhost:3000/page2

## Fonctionnalités de la Page 2

✅ Affichage de tous les utilisateurs dans un tableau  
✅ Recherche par nom d'utilisateur  
✅ Suppression d'un utilisateur  
✅ Navigation vers la page de détail  
✅ Implémentation avec composants de classe (class components)  
✅ Utilisation des lifecycle methods au lieu des hooks
