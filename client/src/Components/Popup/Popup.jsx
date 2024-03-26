import "./Popup.css";

function Popup({success, message, handleOkClick}) {
  return (
    <>
      <div className="popup-parent">
        <div className="popup">
          <div className="popup-container">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
            <img src="/popup_image/404-tick.png" alt="tick-image" />
            <h1 style={{ color: "black" }}>{success ? "Success!" : "Failed!"}</h1>
            <p style={{ color: "#aeadba" }}>
             {message}
            </p>
            <button className="popup-btn" style={{backgroundColor : success?"#208835":"red"} } onClick={handleOkClick} >Ok</button>
          </div>
          <div className="popup-footer" style={{backgroundColor : success?"#208835":"red"}} />
        </div>
      </div>
    </>
  );
}

export default Popup;
