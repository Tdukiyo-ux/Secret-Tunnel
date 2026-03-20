import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");

 
  async function signup(username) {
    const response = await fetch(`${API}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    setToken(data.token);
    setLocation("TABLET");
  }

  async function authenticate() {
    if (!token) throw new Error("No token found!");

    const response = await fetch(`${API}/authenticate`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
//  Authorization — a standard HTTP header specifically for sending credentials
// Bearer — a keyword that tells the server "what follows is a JWT token"
// `Bearer ${token}` — builds the string: "Bearer eyJhbGci..."
// The server reads this header, verifies the token's signature, and decides if you're legit

    if (!response.ok) throw new Error("Authentication failed!");
    setLocation("TUNNEL");
  }

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
```

// ### 📓 Notes — AuthContext
// ```
// - createContext() creates the "shared bucket" all components can reach into
// - AuthProvider wraps the whole app and PROVIDES the bucket's contents
// - value={{ location, signup, authenticate }} — this is WHAT gets shared
// - useAuth() is a custom hook — a cleaner way to consume the context
//   instead of writing useContext(AuthContext) in every component
// - async function signup(username) — "async" means it uses await inside
// - body: JSON.stringify({ username }) — converts JS object → JSON string for the API
// - Authorization: `Bearer ${token}` — the standard way to send a JWT to a server
