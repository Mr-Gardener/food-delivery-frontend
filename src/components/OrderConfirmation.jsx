import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state?.order;

    if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
        return (
            <Container className="mt-4 text-center">
                <div className="alert alert-warning">No order details found.</div>
                <Button onClick={() => navigate('/')} variant="primary" className="mt-3">Back to Home</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                        <Card.Body className="text-center">
                            <h1 className="mb-3">Order Confirmation</h1>
                            <h3 className="text-success">Thank you for your order!</h3>
                            <p className="fw-bold">Your order ID: <span className="text-primary">{orderDetails._id}</span></p>

                            <h4 className="mt-4">Order Summary:</h4>
                            <ListGroup variant="flush" className="text-start">
                                {orderDetails.items.map((item, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between">
                                        <span>{item.quantity} x {item.item}</span>
                                        <span className="fw-bold">${item.price ? item.price.toFixed(2) : '0.00'}</span>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <h4 className="mt-3 fw-bold">Total Price: <span className="text-success">${orderDetails.totalPrice ? orderDetails.totalPrice.toFixed(2) : '0.00'}</span></h4>
                            
                            <div className="mt-4 d-grid gap-2">
                                <Button onClick={() => navigate('/profile')} variant="success">View Order History</Button>
                                <Button onClick={() => navigate('/')} variant="secondary">Back to Home</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default OrderConfirmation;
