import { useContext, useState } from "react";
import { UserInfoContext } from "../../UserInfoProvider/UserInfoProvider";
import { resetBDD } from "./resetBDD";

import "./styles.css";

const ResetBDDButton = () => {
  const { userInfo } = useContext(UserInfoContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setStep(0);
    setPassword("");
    setError("");
    setIsModalOpen(false);
  };

  const validateReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await resetBDD(userInfo.userID, password);
    setIsLoading(false);

    if (result.success) {
      handleModalClose();
      alert(result.msg);
    } else {
      setError(result.msg);
    }
  };

  return (
    <>
      <button id="resetButton" onClick={handleResetButtonClick}>
        Réinitialiser la base de données
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="error">ATTENTION</h2>
            <p className="error">
              Voulez-vous réellement réinitialiser la base de données?
            </p>

            <form onSubmit={validateReset}>
              {step === 1 && (
                <>
                  <label>Mot de Passe :</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    required
                  />
                </>
              )}
              <span>
                <button type="button" onClick={handleModalClose}>Annuler</button>
                {step === 0 ? (
                  <button onClick={() => setStep(1)}>Valider</button>
                ) : (
                  <button type="submit" disabled={isLoading || !password}>
                    {isLoading ? "Chargement..." : "Réinitialiser"}
                  </button>
                )}
              </span>
            </form>
            <p className="error">{error}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetBDDButton;
