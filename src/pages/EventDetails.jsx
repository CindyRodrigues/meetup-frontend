import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { formatDateTime } from "../utils/formatDateTime";

const EventDetails = () => {
  const eventId = useParams();

  const { data, loading, error } = useFetch(
    `https://meetup-backend-pied.vercel.app/events/${eventId.eventId}`
  );

  return (
    <>
      <Header />
      <main className="bg-body-tertiary">
        <div className="container">
          <hr className="m-0" />
        </div>
        <div className="container py-4">
          {loading && (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">
                  Loading event details...
                </span>
              </div>
            </div>
          )}
          {error && <p className="text-center p-3 fs-2 fw-bold">Error</p>}
          <div className="row py-3">
            {data && (
              <>
                <div className="col-md-7 mb-5">
                  <h2 className="mb-4">{data.title}</h2>
                  <p className="mb-5">
                    Hosted By:
                    <br />
                    <strong>{data.hostedBy}</strong>
                  </p>
                  <img
                    src={data.thumbnail}
                    alt={data.title}
                    className="img-fluid w-100"
                  />
                  <h4 className="my-4">Details:</h4>
                  <p style={{ textAlign: "justify" }}>{data.description}</p>
                  <h4>Additional Information:</h4>
                  {data.additionalInformation.dressCode && (
                    <p>
                      <strong>Dress Code:</strong>{" "}
                      {data.additionalInformation.dressCode}
                    </p>
                  )}
                  {data.additionalInformation.ageRestrictions && (
                    <p>
                      <strong>Age Restrictions:</strong>{" "}
                      {data.additionalInformation.ageRestrictions}
                    </p>
                  )}
                  <h4>Event Tags:</h4>
                  <br />
                  {data.tags.length > 0 &&
                    data.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="py-2 px-3 text-bg-danger rounded me-4"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <div className="col-md-4 offset-md-1">
                  <div className="card border-0 mb-5">
                    <div className="card-body">
                      <div className="row mb-4 align-items-center">
                        <div className="col-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-clock"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                          </svg>
                        </div>
                        <div className="col-11">
                          {formatDateTime(data.startDateTime).date +
                            " at " +
                            formatDateTime(data.startDateTime).time}{" "}
                          to
                          <br />
                          {formatDateTime(data.endDateTime).date +
                            " at " +
                            formatDateTime(data.endDateTime).time}
                        </div>
                      </div>
                      <div className="row mb-4 align-items-center">
                        <div className="col-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-geo-alt"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                          </svg>
                        </div>
                        <div className="col-11">{data.venue}</div>
                      </div>
                      <div className="row mb-4 align-items-center">
                        <div className="col-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-currency-rupee"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                          </svg>
                        </div>
                        <div className="col-11">
                          {data.price === 0 ? "Free" : data.price}
                        </div>
                      </div>
                    </div>
                  </div>
                  <h4 className="mb-4">Speakers: ({data.speakers.length})</h4>
                  <div className="row">
                    {data.speakers.length > 0 &&
                      data.speakers.map((speaker, index) => (
                        <div key={index} className="col-md-6">
                          <div className="card border-0 mb-3 shadow">
                            <div className="card-body text-center">
                              <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="img-fluid rounded-circle"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                }}
                              />
                              <p className="card-text">
                                <strong>{speaker.name}</strong>
                                <br />
                                {speaker.designation}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventDetails;
