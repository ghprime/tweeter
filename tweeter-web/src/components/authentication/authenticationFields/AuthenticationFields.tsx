interface Props {
  authenticateOnEnter: (event: React.KeyboardEvent<HTMLElement>) => void;
  setAlias: (value: React.SetStateAction<string>) => void;
  setPassword: (value: React.SetStateAction<string>) => void;
  isLast?: boolean;
}

const AuthenticationFields = ({
  authenticateOnEnter,
  setAlias,
  setPassword,
  isLast,
}: Props) => {
  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          placeholder="name@example.com"
          onKeyDown={authenticateOnEnter}
          onChange={(event) => setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className={`form-floating${isLast ?? " mb-3"}`}>
        <input
          type="password"
          className="form-control bottom"
          id="passwordInput"
          placeholder="Password"
          onKeyDown={authenticateOnEnter}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};

export default AuthenticationFields;
