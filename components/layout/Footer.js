import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <Container fluid className="footer fixed-bottom" style={{backgroundColor: '#f8f9fa'}}>
      <Row>
        <Col className="text-center py-3">
          Footer
        </Col>
      </Row>
    </Container>
  )
}
