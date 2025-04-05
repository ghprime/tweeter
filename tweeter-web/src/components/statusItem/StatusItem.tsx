import { type Status } from "tweeter-shared";
import Post from "./Post";
import { Link } from "react-router-dom";
import useNavigateToUser from "../navigationHook/NavigationHook";

interface Props {
  status: Status;
}

const StatusItem = ({ status }: Props) => {
  const { navigateToUser } = useNavigateToUser();

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
