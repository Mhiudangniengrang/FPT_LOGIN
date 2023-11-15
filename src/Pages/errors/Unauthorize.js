import { Container } from "react-bootstrap"
import Footer from "../../components/Headers & Footers/Footer"
import Header from "../../components/Headers & Footers/Header"

const Unauthorize = () => {

    return (
        <>
            <Container fluid
                style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
            >
                <Header />
                <Container
                    style={{
                        minHeight: '70vh'
                    }}
                >
                    <div
                        style={{
                            margin: '30vh auto',
                            textAlign: "center"
                        }}
                    >
                        <div className="title" data-content="404">
                            403 - ACCESS DENIED
                        </div>

                        <div className="subtitle">
                            Oops, You don't have permission to access this page.
                        </div>
                        <div className="isi">
                            A web server may return a 403 Forbidden HTTP status code in response to a request from a client for a web page or resource to indicate that the server can be reached and understood the request, but refuses to take any further action. Status code 403 responses are the result of the web server being configured to deny access, for some reason, to the requested resource by the client.
                        </div>

                        <div className="buttons">
                            <a className="button" href="/">Go to homepage</a> and log in again.
                        </div>
                    </div>
                </Container>
                <Footer />
            </Container>
        </>
    )
}

export default Unauthorize