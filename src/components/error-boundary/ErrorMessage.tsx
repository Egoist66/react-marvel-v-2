import { FC } from "react";

type ErrorMessageProps = {
  onTryHandler?: () => void;
  errorText: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({errorText, onTryHandler}) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        {errorText}
      </h2>
      <div style={{ textAlign: "center" }}>
        <button style={{ marginTop: 10 }} className="button button__main">
          <div onClick={onTryHandler} className="inner">
            Try again
          </div>
        </button>
      </div>
    </>
  );
};
