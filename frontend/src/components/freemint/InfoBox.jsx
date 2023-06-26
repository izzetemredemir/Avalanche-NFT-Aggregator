const InfoBox = ({ wallet, shortDesc }) => {
  return (
    <div className="info-box">
      <div>
        <p className="little-text">short description</p>
        <p>{shortDesc}</p>
      </div>
      <div>
        <p className="little-text">Owner Address</p>
        <p>{wallet}</p>
      </div>
    </div>
  );
};

export default InfoBox;
