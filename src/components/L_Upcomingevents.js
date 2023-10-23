import { Container, Button, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
const L_Upcomingevents = (props) => {
  const {
    recordsPerPage,
    handleRecordsPerPageChange,
    previousDate,
    nextDate,
    records,
    currentDate,
  } = props;

  return (
    <div>
      <Card className="my-2 w-25  ">
        <Card.Header>
          <h3 className="text-lg">
            <FontAwesomeIcon className=" mx-2" size ="1x"icon={faCalendarDays} />
            Events
          </h3>
        </Card.Header>
      </Card>
      <Container>
        <div className="custom-dashed-line my-3"></div>{" "}
        {/* Add a custom dashed line */}
        <h4>Upcoming events</h4>
        <div className="custom-dashed-line my-3"></div>{" "}
        {/* Add another custom dashed line */}
      </Container>
      <Card className="text-center my-5">
        <Card.Body>
          <div className="d-flex align-items-center">
            Show{" "}
            <Form.Select
              className="w-25"
              aria-label="Default select example"
              as="select"
              size="sm"
              onChange={handleRecordsPerPageChange}
              value={recordsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Form.Select>{" "}
            entries
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="secondary" onClick={previousDate}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>{" "}
            <h5>{currentDate.format("dddd, DD/MM/YYYY")}</h5>
            <Button variant="secondary" onClick={nextDate}>
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>

          <table className="table text-center">
            <thead>
              <tr>
                <th>No</th>
                <th>Student</th>
                <th>Date</th>
                <th>Time Start</th>
                <th>Slot</th>
                <th>Room</th>
                <th>Subject</th>
                <th>Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, i) => (
                <tr key={i}>
                  <td>{record.no}</td>
                  <td>{record.student}</td>
                  <td>{record.date}</td>
                  <td>{record.timestart}</td>
                  <td>{record.slot}</td>
                  <td>{record.room}</td>
                  <td>{record.subject}</td>
                  <td>{record.duration}</td>
                  <td>
                    {" "}
                    {record.status === "Accepted"}
                    <div className="text-success">Accepted</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ... (your pagination code) */}
        </Card.Body>
      </Card>
    </div>
  );
};
export default L_Upcomingevents;
