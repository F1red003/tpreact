import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserDirectoryClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filteredUsers: [],
      searchTerm: "",
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.users !== this.state.users
    ) {
      this.filterUsers();
    }
  }

  fetchUsers = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      this.setState({
        users: data,
        filteredUsers: data,
        error: null,
        loading: false,
      });
    } catch (err) {
      this.setState({
        error: err.message,
        loading: false,
      });
    }
  };

  filterUsers = () => {
    const { searchTerm, users } = this.state;
    if (searchTerm.trim() === "") {
      this.setState({ filteredUsers: users });
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.setState({ filteredUsers: filtered });
    }
  };

  handleDelete = (userId) => {
    const updatedUsers = this.state.users.filter((user) => user.id !== userId);
    this.setState({ users: updatedUsers });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { filteredUsers, searchTerm, loading, error } = this.state;

    if (loading) {
      return <div>Chargement...</div>;
    }

    if (error) {
      return <div>Erreur: {error}</div>;
    }

    return (
      <div>
        <h1>Annuaire d'utilisateurs</h1>
        <p>
          <Link to="/">Aller à Page 1 (avec Hooks)</Link> |{" "}
          <strong>Page 2 (avec Classes)</strong>
        </p>

        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={this.handleSearchChange}
        />

        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Société</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/user-class/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.email}</td>
                <td>{user.company.name}</td>
                <td>
                  <button onClick={() => this.handleDelete(user.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && <p>Aucun utilisateur trouvé.</p>}
      </div>
    );
  }
}

export default UserDirectoryClass;
