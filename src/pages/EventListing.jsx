import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

const EventListing = () => {
  const [selectedType, setSelectedType] = useState("Both");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error } = useFetch(
    "https://meetup-backend-pied.vercel.app/"
  );

  let events = [];

  if (data && data.length > 0) {
    const selectedTypeEvents =
      selectedType === "Both"
        ? data
        : data.filter((event) => event.type === selectedType);
    const searchQueryEvents =
      searchQuery === ""
        ? selectedTypeEvents
        : selectedTypeEvents.filter(
            (event) =>
              event.title.toLowerCase().includes(searchQuery) ||
              event.tags.join(" ").includes(searchQuery)
          );
    events = searchQueryEvents;
  }

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
                <span className="visually-hidden">Loading events...</span>
              </div>
            </div>
          )}
          {error && <p className="text-center p-3 fs-2 fw-bold">Error!</p>}
          {data && data.length > 0 && (
            <div className="d-flex justify-content-between">
              <h1 className="fw-bold">Meetup Events</h1>
              <div className="d-flex">
                <div className="me-3">
                  <select
                    className="form-select border border-0"
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="Both">Any Type</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
                <form role="search">
                  <div className="input-group">
                    <span
                      className="input-group-text border border-0"
                      style={{ backgroundColor: "white" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                      </svg>
                    </span>
                    <input
                      className="form-control border border-0"
                      type="search"
                      placeholder="Search by title and tags"
                      aria-label="Search by title and tags"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="row">
            {events && events.length > 0 ? (
              events.map((event) => <EventCard key={event._id} event={event} />)
            ) : (
              <p className="text-center p-3 fs-2 fw-bold">
                Sorry, there are no events!
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventListing;
