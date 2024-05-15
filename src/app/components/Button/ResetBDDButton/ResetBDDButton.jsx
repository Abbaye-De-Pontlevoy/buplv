import { useContext, useState } from "react";
import { UserInfoContext } from "../../UserInfoProvider/UserInfoProvider";
import { resetBDD } from "./resetBDD";

import "./styles.css";

const ResetBDDButton = ({className}) => {
  // Get user info from the context
  const { userInfo } = useContext(UserInfoContext);

  // Initialize state variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  // Step 0: Ask for confirmation
  // Step 1: Ask for password
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the reset button click
  const handleResetButtonClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle the modal close
  const handleModalClose = () => {
    setStep(0);
    setPassword("");
    setError("");
    setIsModalOpen(false);
  };

  // Final validation of the reset
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
    <div className={className}>
      {/* Reset Button */}
      <button id="resetButton" onClick={handleResetButtonClick}>
        Réinitialiser la base de données
      </button>

      {/* Modal */}
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
                <button className="fullwidth" type="button" onClick={handleModalClose}>Annuler</button>
                {step === 0 ? (
                  <button className="fullwidth" onClick={() => setStep(1)}>Valider</button>
                ) : (
                  <button className="fullwidth" type="submit" disabled={isLoading || !password}>
                    {isLoading ? "Chargement..." : "Réinitialiser"}
                  </button>
                )}
              </span>
            </form>
            <p className="error">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetBDDButton;
