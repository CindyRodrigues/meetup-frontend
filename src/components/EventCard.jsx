import { Link } from "react-router-dom";
import { formatDateTime } from "../utils/formatDateTime";

const EventCard = ({ event }) => {
  return (
    <div className="col-md-4">
      <Link to={`/events/${event._id}`} className="text-decoration-none">
        <div className="card m-3">
          <img
            src={event.thumbnail}
            className="card-img-top"
            alt={event.title}
          />
          <div className="card-img-overlay">
            <span className="text-bg-light rounded p-2">
              {event.type} Event
            </span>
          </div>
          <div className="card-body">
            <h6 className="card-subtitle text-body-secondary">
              {formatDateTime(event.startDateTime).date} &bull;{" "}
              {formatDateTime(event.startDateTime).time} IST
            </h6>
            <h5 className="card-title fw-bold">{event.title}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
