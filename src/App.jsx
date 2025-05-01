import { useEffect, useState } from 'react'
import './App.css'

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

function App() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [expYears, setExpYears] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [validationErrors, setValidationErrors] = useState({});

  const realTimeValidateForm = () => {
    const newValidationErrors = {
      username: "",
      password: "",
      description: ""
    }

    // real time check for username
    if (username.length < 6) {
      newValidationErrors.username = "Username deve contenere almeno 6 caratteri"
    } else {
      const hasSpaces = username.includes(' ');
      const hasSymbols = [...username].some(char => symbols.includes(char));

      if (hasSpaces || hasSymbols) {
        newValidationErrors.username = "Username può contenere solo lettere e numeri";
      }
    }

    // real time check for password
    if (password.length < 8) {
      newValidationErrors.password = "La password deve contenere almeno 8 caratteri"
    } else {
      const hasLetter = [...password].some(char => letters.includes(char.toLowerCase()));
      const hasNumber = [...password].some(char => numbers.includes(char));
      const hasSymbol = [...password].some(char => symbols.includes(char));

      if (!hasLetter || !hasNumber || !hasSymbol) {
        newValidationErrors.password = "La password deve contenere almeno una lettera, un numero e un simbolo";
      }
    }

    // real time check for description
    if (description.trim().length < 10 || description.trim().length > 100) {
      newValidationErrors.description = "La deescrizione deve contenere min 10 e max 100 caratteri"
    } else if (description !== description.trim()) {
      newValidationErrors.description = "La descrizione non può iniziare o finire con degli spazi"
    }

    setValidationErrors(newValidationErrors);
  }

  const validateForm = () => {
    const newErrors = {
      emptyFields: false,
      invalidExpYears: false,
      noSpecialization: false
    };

    if (!name.trim() || !username.trim() || !password.trim() ||
      !specialization.trim() || !description.trim()) {
      newErrors.emptyFields = true;
    }

    if (parseInt(expYears) <= 0) {
      newErrors.invalidExpYears = true;
    }

    if (specialization === "") {
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

    if (isFormValid) {
      console.log(`
        Dati form:
        name: ${name},
        username: ${username},
        password: ${password},
        specialization: ${specialization},
        expYears: ${expYears},
        description: ${description}
      `);
    } else {
      console.log(`Errore nel form`);
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
            <input
              id='name'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="username">Crea il tuo username</label>
            <input
              id='username'
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                realTimeValidateForm();
              }}
            />
            {username && (
              <p className={validationErrors.username ? 'error' : 'success'}>
                {validationErrors.username || "Username valido!"}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password">Crea una nuova password</label>
            <input
              id='password'
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                realTimeValidateForm();
              }}
            />
            {password && (
              <p className={validationErrors.password ? 'error' : 'success'}>
                {validationErrors.password || "Password valida!"}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="specialization">Scegli la tua specializzazione</label>
            <select
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option value=""></option>
              <option value="Full Stack">Full Stack</option>
              <option value="Front-end">Front-end</option>
              <option value="Back-end">Back-end</option>
            </select>
          </div>
          <div>
            <label htmlFor="expYears">Inserisci i tuoi anni di esperienza</label>
            <input
              id='expYears'
              type="number"
              value={expYears}
              onChange={(e) => setExpYears(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Inserisci una breve descrizione</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                realTimeValidateForm();
              }}
            />
            <small> Caratteri: {description.trim().length}</small>
            {description && (
              <p className={validationErrors.description ? 'error' : 'success'}>
                {validationErrors.description || "Descrizione valida!"}
              </p>
            )}
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
