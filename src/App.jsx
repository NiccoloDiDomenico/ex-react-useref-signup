import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialitazion, seetSpecialitazion] = useState("");
  const [expYears, setExpYears] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {
      emptyFields: false,
      invalidExpYears: false,
      noSpecialization: false
    };

    if (!name.trim() || !username.trim() || !password.trim() ||
      !specialitazion.trim() || !description.trim()) {
      newErrors.emptyFields = true;
    }

    if (parseInt(expYears) <= 0) {
      newErrors.invalidExpYears = true;
    }

    if (specialitazion === "") {
      newErrors.noSpecialization = true;
    }

    setErrors(newErrors);
    const errorValues = Object.values(newErrors);
    const hasErrors = errorValues.includes(true);
    return !hasErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isFormValid = validateForm()
    console.log(isFormValid);

    if (isFormValid) {
      console.log(`
        Dati form:
        name: ${name},
        username: ${username},
        password: ${password},
        specialitazion: ${specialitazion},
        expYears: ${expYears},
        description: ${description}
      `);
    }
  }

  return (
    <>
      {/* Form section */}
      <section>
        <h1>Form di registrazione</h1>
        <p>Compila i seguenti campi per effettuare la registrazione!</p>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Inserisci il tuo nome completo</label>
            <input id='name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="username">Crea il tuo username</label>
            <input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Crea una nuova password</label>
            <input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="specialitazion">Scegli la tua specialitazzione</label>
            <select name="specialitazion" id="" value={specialitazion} onChange={(e) => seetSpecialitazion(e.target.value)}>
              <option value=""></option>
              <option value="Full Stack">Full Stack</option>
              <option value="Front-end">Front-end</option>
              <option value="Back-end">Back-end</option>
            </select>
          </div>
          <div>
            <label htmlFor="expYears">Inserigli i tuoi anni di esperienza</label>
            <input id='expYears' type="number" value={expYears} onChange={(e) => setExpYears(e.target.value)} />
          </div>
          <div>
            <label htmlFor="description">Inseerisci una breve descrizione</label>
            <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div className="error-messages">
            {errors.emptyFields && (
              <p className="error">Tutti i campi devono essere compilati</p>
            )}
            {errors.invalidExpYears && (
              <p className="error">Gli anni di esperienza devono essere maggiori di 0</p>
            )}
            {errors.noSpecialization && (
              <p className="error">Devi selezionare una specializzazione</p>
            )}
          </div>
          <button>Invia</button>
        </form>
      </section>
    </>
  )
}

export default App
