import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserDetailClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchUserDetail();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUserDetail();
    }
  }

  fetchUserDetail = async () => {
    try {
      this.setState({ loading: true });
      const userId = this.props.userId;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      this.setState({
        user: data,
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

  render() {
    const { user, loading, error } = this.state;

    if (loading) {
      return <div>Chargement...</div>;
    }

    if (error) {
      return <div>Erreur: {error}</div>;
    }

    if (!user) {
      return <div>Utilisateur non trouvé</div>;
    }

    return (
      <div>
        <h1>Annuaire d'utilisateurs</h1>

        <Link to="/page2">← Retour à la liste</Link>

        <h2>{user.name}</h2>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Téléphone:</strong> {user.phone}
          </p>
          <p>
            <strong>Site:</strong> {user.website}
          </p>
          <p>
            <strong>Société:</strong> {user.company.name}
          </p>
        </div>
      </div>
    );
  }
}

export default UserDetailClass;
