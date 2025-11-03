import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

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

      <Link to="/">← Retour à la liste</Link>

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

export default UserDetail;
