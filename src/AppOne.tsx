import { useEffect, useState } from "react";
import { navigateToUrl } from "single-spa";

export default function Root({ PubSubFunctions }) {
  const [hash, setHash] = useState(window.location.pathname);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    window.addEventListener("popstate", () => {
      console.warn(window.location.pathname);
      setHash(window.location.pathname);
    });
  }, []);
  useEffect(() => {
    PubSubFunctions.publishLib("Click", counter);
  }, [counter]);
  const handleOnclick = (value) => {
    setCounter(counter + value);
    // navigateToUrl("/one")
  };
  const handleOnchangeColor = ({ target }) => {
    PubSubFunctions.publishLib("Color", target.value);
  };
  const handleOnchangeText = ({ target }) => {
    PubSubFunctions.publishLib("Text", target.value);
  };
  return (
    <div className="appOne-container">
      <div className="buttons-container">
        <button
          className="action-button"
          onClick={() => handleOnclick(-1)}
          type="button"
        >
          -1
        </button>
        <button
          className="action-button"
          onClick={() => handleOnclick(+1)}
          type="button"
        >
          +1
        </button>
      </div>
      {hash === "/one" ? (
        <button
          className="action-button"
          type="button"
          onClick={() => navigateToUrl("/")}
        >
          Volver
        </button>
      ) : (
        <>
          <input
            type="color"
            name="color-picker"
            id=""
            onChange={handleOnchangeColor}
          />
          <label htmlFor="input-text">
            Nombre
            <input
              onChange={handleOnchangeText}
              type="text"
              name="input-text"
              id="input-text"
              placeholder="Ingresa tu nombre"
            />
          </label>
        </>
      )}
    </div>
  );
}
