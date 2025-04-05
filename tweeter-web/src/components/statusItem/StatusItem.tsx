import {
  type AuthToken,
  FakeData,
  type Status,
  type User,
} from "tweeter-shared";
import Post from "./Post";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";
import useToastListener from "../toaster/ToastListenerHook";

interface Props {
  status: Status;
}

const StatusItem = ({ status }: Props) => {
  const { displayErrorMessage } = useToastListener();
  const { setDisplayedUser, currentUser, authToken } =
    useContext(UserInfoContext);

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const user = await getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          setDisplayedUser(currentUser!);
        } else {
          setDisplayedUser(user);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  return (
    <div className="row mb-3 mx-0 px-0 border rounded bg-white">
      <div className="col bg-light mx-0 px-0">
        <div className="container px-0">
          <div className="row mx-0 px-0">
            <div className="col-auto p-3">
              <img
                src={status.user.imageUrl}
                className="img-fluid"
                width="80"
                alt="Posting user"
              />
            </div>
            <div className="col">
              <h2>
                <b>
                  {status.user.firstName} {status.user.lastName}
                </b>{" "}
                -{" "}
                <Link
                  to={status.user.alias}
                  onClick={(event) => navigateToUser(event)}
                >
                  {status.user.alias}
                </Link>
              </h2>
              {status.formattedDate}
              <br />
              <Post status={status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusItem;
