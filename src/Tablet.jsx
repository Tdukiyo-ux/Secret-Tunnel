/** Users can enter their name to receive a token from the API. */
import { useAuth } from "../AuthContext";

export default function Entrance() {
  const { signup } = useAuth(); // pull signup out of context

  async function handleSubmit(e) {
    e.preventDefault(); // stop page from refreshing
    const username = e.target.name.value; // grab the input value
    await signup(username);
  }

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" />
        </label>
        <button type="submit">Respond</button>
      </form>
    </>
  );
}
```

// ### 📓 Notes — Entrance.jsx
// ```
// - import { useAuth } from "../AuthContext" — pulls in our custom hook
// - const { signup } = useAuth() — destructures signup from the context value
// - handleSubmit(e) — "e" is the event object React gives us automatically
// - e.preventDefault() — WITHOUT this, the browser reloads the page on submit
// - e.target.name.value — "name" matches the input's name="name" attribute
//   e.target = the form element
//   .name   = the input with name="name"
//   .value  = what the user typed
// - await signup(username) — we await because signup is async (it fetches)
