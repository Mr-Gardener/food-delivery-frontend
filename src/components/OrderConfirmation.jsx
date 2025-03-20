import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, ListGroup } from 'react-bootstrap';

function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state?.order?.order;

    console.log("Received order details:", orderDetails);

    if (!orderDetails) {
        return (
            <Container className="mt-4 text-center">
                <Card className="p-4 shadow-sm">
                    <h4 className="text-danger">No order details found.</h4>
                    <Button onClick={() => navigate('/')} variant="primary" className="mt-3">Back to Home</Button>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-lg p-4">
                        <Card.Body>
                            <h2 className="text-center text-success">Order Confirmation</h2>
                            <p className="text-center">Thank you for your order!</p>
                            <hr />

                            <h5><strong>Order ID:</strong> {orderDetails._id}</h5>
                            
                            <h4 className="mt-4">Order Summary</h4>
                            <ListGroup variant="flush">
                                {orderDetails.items?.length > 0 ? (
                                    orderDetails.items.map((item, index) => (
                                        <ListGroup.Item key={index} className="d-flex justify-content-between">
                                            <span>{item.quantity} x {item.item}</span>
                                            <span className="text-success">${item.price ? item.price.toFixed(2) : '0.00'}</span>
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>No items found in the order.</ListGroup.Item>
                                )}
                            </ListGroup>

                            <h4 className="mt-3"><strong>Total Price:</strong> ${orderDetails.totalPrice ? orderDetails.totalPrice.toFixed(2) : '0.00'}</h4>

                            <div className="d-grid gap-2 mt-4">
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
