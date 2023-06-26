const AttBox = ({ attributes, tokenuri }) => {
  return (
    <div className="att-box">
      <div style={{ marginTop: 20 }}>
        <p
          className="little-text"
          style={{ fontSize: "2rem", marginBottom: 10, textAlign: "center" }}
        >
          Token Uri
          <br />
          {tokenuri}
        </p>

        <p
          className="little-text"
          style={{ fontSize: "3rem", marginBottom: 30, textAlign: "center" }}
        >
          Attributes
        </p>
        {attributes.map((item) => {
          return (
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {item.displayType === null ? (
                item.displayType
              ) : (
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: 20,
                    marginBottom: 20,
                  }}
                >
                  <p>displayType: {item.displayType}</p>
                </div>
              )}

              {item.value === null ? (
                item.value
              ) : (
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: 20,
                    marginBottom: 20,
                  }}
                >
                  <p>value: {item.value}</p>
                </div>
              )}
              {item.traitType === null ? (
                item.traitType
              ) : (
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: 20,
                    marginBottom: 20,
                  }}
                >
                  <p>traitType: {item.traitType}</p>
                </div>
              )}
              {item.count === null ? (
                item.count
              ) : (
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: 20,
                    marginBottom: 20,
                  }}
                >
                  <p>count: {item.count}</p>
                </div>
              )}
              {item.countPercentage === null ? (
                item.countPercentage
              ) : (
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: 20,
                    marginBottom: 20,
                  }}
                >
                  <p>countPercentage: {item.countPercentage}</p>
                </div>
              )}
              {item.rarityScore === null ? (
                item.rarityScore
              ) : (
                <div
                  className=""
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: 20,
                    marginBottom: 20,
                  }}
                >
                  <p>rarityScore: {item.rarityScore}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttBox;
